from typing import Annotated

from fastapi import HTTPException, Request, Depends
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from app.routers.autenticacion import  oauth2_scheme

#importar modelos
from app.modelos.modelo_autenticacion import TokenData, User

#importar constraints
from app.configuracion import ConfiguracionOauth2, ConfiguracionBDD
ALGORITMO_ENCRIPTADO = ConfiguracionOauth2.ALGORITMO_ENCRIPTADO.value
CLAVE_SECRETA = ConfiguracionOauth2.CLAVE_SECRETA.value

#dependenecia de base de datos
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

# Verificar si el usuario existe en la bdd
def obtener_usuario(username: str, db: MongoClient ):
    coleccion_usuarios = db["usuarios"]

    # verificar si el usuario existe en la base de datos
    usuario = coleccion_usuarios.find_one({"username": username})
    if usuario is None:
        return False # the username does not exist
    return User(username=usuario["username"])

# Verifica si el usuario esta autenticado con el token jwt y devuelve el nombre de usuario si esta autenticado
# Esta es una dependencia para las rutas que requieren autenticacion
async def obtener_usuario_actual(bdd: dependencia_bdd, token: Annotated[str, Depends(oauth2_scheme)]):
    credenciales_excepcion = HTTPException(
        status_code=401,
        detail="No se pudieron validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, CLAVE_SECRETA, algorithms=[ALGORITMO_ENCRIPTADO])
        username: str = payload.get("sub")
        if username is None:
            raise credenciales_excepcion
        token_data = TokenData(username=username)
    except JWTError:
        raise credenciales_excepcion
    user = obtener_usuario(username=token_data.username, db=bdd)
    if user is None:
        raise credenciales_excepcion
    return user
