from fastapi import HTTPException, APIRouter, Request
import bcrypt # para encriptar la contraseña
import os

#importar utilidades para la base de datos mongo
from bson import ObjectId
from bson.json_util import dumps
import json

#importar dependencias para validar el token
from fastapi import Depends
from app.dependencias.dependencia_autenticacion import obtener_usuario_actual
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from typing import Annotated
from app.modelos.modelo_autenticacion import User

dependencia_autenticacion = Annotated[User, Depends(obtener_usuario_actual)] # para usar: usuario_conectado: dependencia_autenticacion
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api/crud", tags=["CRUD de colecciones"])

#endpoint de hola mundo, saluda al usuario conectado
#para acceder a este endpoint se debe enviar un token de autenticacion en el header de la peticion
@router.get("/hola/usuario/actual", status_code=200)
async def hola_mundo(usuario_conectado: dependencia_autenticacion):
    """
    Este endpoint saluda al usuario conectado (es solo un hola mundo)

    Se utiliza solo para probar que la autenticación este funcionando, no tiene ninguna funcionalidad para el usuario
    """
    return {"mensaje": f"¡Hola {usuario_conectado.username}!"}

