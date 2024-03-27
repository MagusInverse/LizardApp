from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import HTTPException, APIRouter, Request, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import bcrypt

#importar modelos
from app.modelos.modelo_usuarios import UsuarioRegistro
from app.modelos.modelo_autenticacion import Token, TokenData, User

#Constantes para JWT
from app.dependencias.dependencia_bdd import obtener_bdd
from app.configuracion import ConfiguracionOauth2
ALGORITMO_ENCRIPTADO = ConfiguracionOauth2.ALGORITMO_ENCRIPTADO.value
CLAVE_SECRETA = ConfiguracionOauth2.CLAVE_SECRETA.value
TOKEN_EXPIRACION_MINUTOS = ConfiguracionOauth2.TOKEN_EXPIRACION_MINUTOS.value

#importar dependencia de base de datos
from pymongo.mongo_client import MongoClient
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api/autenticacion", tags=["Autenticación y registro de usuarios"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/autenticacion/token")

# Verifica si el usuario y contraseña son correctos y devuelve el nombre de usuario si es correcto
def validar_usuario(username: str, password: str, bdd: MongoClient):
    #obtener usuario de la base de datos
    usuario_encontrado = None
    coleccion_usuarios = bdd["usuarios"]

    #validar si el usuario existe
    usuario = coleccion_usuarios.find_one({ "username": username })
    if usuario is None:
        return False # usuario no encontrado
    usuario_encontrado = { "username":usuario["username"], "hashed_password":usuario["hashed_password"] }

    #validar si la contraseña es correcta
    if bcrypt.checkpw(password.encode('utf-8'), usuario_encontrado["hashed_password"].encode('utf-8')):
        return username
    else: # contraseña incorrecta
        return False

# Crear un JWT para ser devuelto al usuario en la ruta de login
def crear_jwt(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, CLAVE_SECRETA, algorithm=ALGORITMO_ENCRIPTADO)
    return encoded_jwt

# Ruta para obtener un token de autenticación (login)
@router.post("/token")
async def login(bdd: dependencia_bdd, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
	"""
    Este endpoint se utiliza para que el usuario pueda obtener un token de autenticación y acceder a los endpoints protegidos
	"""

	usuario = validar_usuario(form_data.username, form_data.password, bdd)
	if not usuario:
		raise HTTPException(
            status_code=401,
            detail="nombre de usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
	token_expiracion = timedelta(minutes=TOKEN_EXPIRACION_MINUTOS)
	token = crear_jwt(
        data={"sub": usuario}, expires_delta=token_expiracion
    )
	return Token(access_token=token, token_type="bearer")

# endpoint para registrar un usuario
@router.post("/registro")
async def registrar_usuario(bdd: dependencia_bdd, user: UsuarioRegistro):
    """
    Este endpoint se utiliza para registrar un usuario en la base de datos
    """

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    coleccion_usuarios = bdd["usuarios"]

    # validate user if exists
    usuario_encontrado = coleccion_usuarios.find_one({ "username": user.username })
    if usuario_encontrado:
        raise HTTPException(status_code=409, detail="El usuario ya existe en la base de datos")
    coleccion_usuarios.insert_one(
            {"username": user.username,
             "hashed_password": hashed_password.decode('utf-8'),
             "email": user.email,
             "coleccion": user.coleccion.model_dump(),
             "fecha_registro": user.fecha_registro
             })

    usuario_check = coleccion_usuarios.find_one({"username": user.username})
    if usuario_check:
        return str(usuario_check["_id"])
    else:
        raise HTTPException(status_code=500, detail="Error al registrar usuario")
