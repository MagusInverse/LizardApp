from datetime import datetime, timedelta, timezone
import pytz
from typing import Annotated

from fastapi import HTTPException, APIRouter, Request, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import bcrypt

#importar modelos
from app.modelos.modelo_usuarios import UsuarioRegistro, UsuarioRecuperarContrasena
from app.modelos.modelo_autenticacion import Token, TokenData, User

#Constantes para JWT
from app.dependencias.dependencia_bdd import obtener_bdd
from app.configuracion import ConfiguracionOauth2
ALGORITMO_ENCRIPTADO = ConfiguracionOauth2.ALGORITMO_ENCRIPTADO.value
CLAVE_SECRETA = ConfiguracionOauth2.CLAVE_SECRETA.value

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
def crear_jwt(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, CLAVE_SECRETA, algorithm=ALGORITMO_ENCRIPTADO)
    return encoded_jwt

# Ruta para obtener un token de autenticación (login)
@router.post("/token")
async def login(bdd: dependencia_bdd, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    """
    Autentica a un usuario y genera un token de acceso tipo JWT.

    Este endpoint recibe las credenciales del usuario (username y password),
    verifica estas credenciales contra una base de datos (bdd) y, si son correctas,
    retorna un token JWT ( desde el front deben guardar este token para hacer solicitudes como usuario autenticado) que el usuario puede utilizar para autenticarse en futuras solicitudes a endpoints protegidos.

    Parámetros:
    - username (str, multipart/form-data): Dato del formulario que contiene el nombre de usuario.
    - password (str, multipart/form-data):  Dato del formulario que contiene la contraseña del usuario.

    Respuestas:
    - 200: Retorna un objeto Token que contiene el token de acceso JWT y el tipo de token
    - 401: Error que se lanza si el nombre de usuario o la contraseña son incorrectos.
      Esta excepción incluye un encabezado 'WWW-Authenticate' con el valor 'Bearer' para indicar
      el esquema de autenticación.
    """

    usuario = validar_usuario(form_data.username, form_data.password, bdd)
    if not usuario:
        raise HTTPException(
                status_code=401,
                detail="nombre de usuario o contraseña incorrectos",
                headers={"WWW-Authenticate": "Bearer"},
                )
    token = crear_jwt(data={"sub": usuario})
    return Token(access_token=token, token_type="bearer")

# endpoint para registrar un usuario
@router.post("/registro")
async def registrar_usuario(bdd: dependencia_bdd, user: UsuarioRegistro):
    """
    Registra un nuevo usuario en la base de datos. Se encarga de verificar que el nombre de usuario
    no esté previamente registrado, cifra la contraseña y almacena los datos del usuario en la base de datos.

    Parámetros:
    - username (str, body): Nombre de usuario del nuevo usuario.
    - password (str, body): Contraseña del nuevo usuario.
    - email (str, body): Correo electrónico del nuevo usuario.
    - url_foto (str, body): URL de la foto de perfil del nuevo usuario.

    Respuestas:
    - 200: Usuario registrado correctamente.
    - 409: Conflicto, el nombre de usuario o correo ya existe en la base de datos.
    - 422: Error en la validación de los datos del usuario, no cumple con las restricciones de longitud o formato.
    - 500: Error interno del servidor, fallo al registrar el usuario.
    """

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    # validar si existe el username
    usuario_encontrado = coleccion_usuarios.find_one({ "username": user.username })
    if usuario_encontrado:
        raise HTTPException(status_code=409, detail="El username ya existe en la base de datos")

    # validar si existe el email
    usuario_encontrado = coleccion_usuarios.find_one({ "email": user.email })
    if usuario_encontrado:
        raise HTTPException(status_code=409, detail="El correo ya existe en la base de datos")

    coleccion_usuarios.insert_one(
            {"username": user.username,
             "hashed_password": hashed_password.decode('utf-8'),
             "email": user.email,
             "url_foto": user.url_foto,
             "fecha_registro": datetime.now(pytz.timezone('Chile/Continental')).strftime('%Y-%m-%d'),
             "hora_registro": datetime.now(pytz.timezone('Chile/Continental')).strftime('%H:%M')
             })

    usuario_check = coleccion_usuarios.find_one({"username": user.username})
    if usuario_check:
        return {"mensaje": "Usuario registrado exitosamente"}
    else:
        raise HTTPException(status_code=500, detail="Error al registrar usuario")


# endpoint para recuperar contraseña
@router.post("/actualizar/contrasena")
async def actualizar_contrasena_por_username_email(user_recuperar_pass: UsuarioRecuperarContrasena, bdd: dependencia_bdd):
    """
    Actualiza la contraseña de un usuario en la base de datos. Se encarga de verificar que el nombre de usuario
    coincida con el email para validar la identidad, cifra la contraseña y actualiza la nueva contraseña del usuario en la base de datos.

    Parámetros:
    - username (str, body): Nombre del usuario.
    - email (str, body): Correo electrónico del usuario.
    - nueva_password (str, body): La nueva contraseña del usuario.

    Respuestas:
    - 200: Contraseña actualizada correctamente.
    - 404: Usuario no encontrado o email incorrecto.
    - 500: Error interno del servidor, fallo al actualizar la contraseña.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    # validar que el usuario sea quien dice ser
    usuario_encontrado = coleccion_usuarios.find_one({ "username": user_recuperar_pass.username, "email": user_recuperar_pass.email })
    # si el usuario existe, actualizar contraseña
    if usuario_encontrado:
        #actualizar contraseña
        hashed_password = bcrypt.hashpw(user_recuperar_pass.nueva_password.encode('utf-8'), bcrypt.gensalt())
        respuesta = coleccion_usuarios.update_one(
            {"username": user_recuperar_pass.username},
            {"$set": {"hashed_password": hashed_password.decode('utf-8')}}
            )
        if  respuesta.modified_count == 1:
            return {"mensaje": "Contraseña actualizada correctamente"}
        else :
            raise HTTPException(status_code=500)

    raise HTTPException(status_code=404, detail="Usuario no existe o email incorrecto")


# endpoint para validar usuario antes de recuperar contraseña
@router.get("/validar/usuario/{username}/{email}")
async def validar_usuario_por_username_email(username: str, email: str, bdd: dependencia_bdd):
    """
    Valida la identidad del usuario con su username y email. Se encarga de verificar que el nombre de usuario
    coincida con el email para validar la identidad antes de actualizar la contraseña.

    Parámetros:
    - username (str, body): Nombre del usuario.
    - email (str, body): Correo electrónico del usuario.

    Respuestas:
    - 200: Mensaje de validación exitosa, el usuario es quien dice ser.
    - 404: Usuario no encontrado o email incorrecto, no se puede validar la identidad.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    # validar que el usuario sea quien dice ser
    usuario_encontrado = coleccion_usuarios.find_one({ "username": username, "email": email })
    # si el usuario existe, retornar mensaje de validación exitosa
    if usuario_encontrado:
        return {"mensaje": "Usuario valido para recuperar contraseña"}

    raise HTTPException(status_code=404, detail="Usuario no existe o email incorrecto, no es valido para recuperar contraseña")
