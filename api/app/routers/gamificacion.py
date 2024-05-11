from fastapi import HTTPException, APIRouter

#importar utilidades para la base de datos mongo
from bson import ObjectId
from .utils import convertir_id_a_str

from app.modelos.modelo_usuarios import Titulo, Logro

#importar dependencias para validar el token
from fastapi import Depends
from app.dependencias.dependencia_autenticacion import obtener_usuario_actual
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from typing import Annotated
from app.modelos.modelo_autenticacion import User

dependencia_autenticacion = Annotated[User, Depends(obtener_usuario_actual)] # para usar: usuario_conectado: dependencia_autenticacion
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api/gamificacion", tags=["Gamificación"])

# endpoint para insertar titulos a un usuario
@router.post("/insertar/titulos")
async def insertar_titulos(titulos: list[Titulo], usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Inserta titulos a un usuario. Si el usuario ya tiene titulos, se agregan solo los titulos que no tenga. Si el usuario no tiene titulos, se insertan todos los titulos enviados.

    Parámetros:
    - titulos (list[Titulo]): Lista de objetos JSON con los datos de los titulos a insertar (cada titulo debe tener los campos "nombre" y "fecha", que son obligatorios).

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Titulos insertados correctamente. Si todos los titulos enviados ya existen o se envia una lista vacia, se devuelve un mensaje de advertencia, pero no se considera un error
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 400: Solicitud invalida - No se pueden insertar titulos con nombres repetidos
    - 422: Entidad no procesable - No se pudo procesar la solicitud debido a un error en los datos enviados. Se devuelve si alguno de los titulos no tiene los campos obligatorios "nombre" y "fecha", si no se cumple con el formato de fecha (YYYY-MM-DD) o si no se envia una lista valida.
    """
    # validar que los titulos no esten repetidos
    nombres_titulos = [titulo.nombre for titulo in titulos]
    nombres_titulos_sin_repetir = set(nombres_titulos)
    if len(nombres_titulos) != len(nombres_titulos_sin_repetir):
        raise HTTPException(status_code=400, detail="No se pueden insertar titulos con nombres repetidos")

    coleccion_usuarios = bdd["usuarios"]

    #obtener el usuario conectado
    titulos_usuario = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"_id": 0, "titulos": 1})

    if titulos_usuario:
        # si el usuario ya tiene titulos, se actualizan
        # hay que solo insertar los titulos que no tenga
        print("lista de titulos en bdd: ", [titulo["nombre"] for titulo in titulos_usuario["titulos"]])
        titulos_eliminar = []
        for i in range(len(titulos)):
            print("i: ", i)
            if titulos[i].nombre in [titulo["nombre"] for titulo in titulos_usuario["titulos"]]:
                # agregar a lista de titulos a eliminar
                titulos_eliminar.append(titulos[i])

        # eliminar los titulos que ya tiene el usuario
        for titulo_eliminar in titulos_eliminar:
            titulos.remove(titulo_eliminar)

        # validar si hay titulos para insertar
        if len(titulos) == 0:
            return {"mensaje": "No hay titulos para insertar"}
        # insertar los titulos restantes
        else:
            for i in range(len(titulos)):
                coleccion_usuarios.update_one({"username": usuario_conectado.username}, {"$push": {"titulos": titulos[i].model_dump()}})
            return {"mensaje": "Titulos insertados correctamente"}

    else: # si el usuario no tiene titulos, se insertan todos los titulos enviados
        for i in range(len(titulos)):
            titulos[i] = titulos[i].model_dump()
        coleccion_usuarios.update_one({"username": usuario_conectado.username}, {"$set": {"titulos": titulos}})
        return {"mensaje": "Titulos insertados correctamente"}


# endpoint para insertar logros a un usuario
@router.post("/insertar/logros")
async def insertar_logros(logros: list[Logro], usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Inserta logros a un usuario. Si el usuario ya tiene logros, se agregan solo los logros que no tenga. Si el usuario no tiene logros, se insertan todos los logros enviados.

    Parámetros:
    - logros (list[Logro]): Lista de objetos JSON con los datos de los logros a insertar (cada logro debe tener los campos "nombre" y "fecha", que son obligatorios).

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: logros insertados correctamente. Si todos los logros enviados ya existen o se envia una lista vacia, se devuelve un mensaje de advertencia, pero no se considera un error
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 400: Solicitud invalida - No se pueden insertar logros con nombres repetidos
    - 422: Entidad no procesable - No se pudo procesar la solicitud debido a un error en los datos enviados. Se devuelve si alguno de los logros no tiene los campos obligatorios "nombre" y "fecha", si no se cumple con el formato de fecha (YYYY-MM-DD) o si no se envia una lista valida.
    """
    # validar que los logros no esten repetidos
    nombres_logros = [logro.nombre for logro in logros]
    nombres_logros_sin_repetir = set(nombres_logros)
    if len(nombres_logros) != len(nombres_logros_sin_repetir):
        raise HTTPException(status_code=400, detail="No se pueden insertar logros con nombres repetidos")

    coleccion_usuarios = bdd["usuarios"]

    #obtener el usuario conectado
    logros_usuario = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"_id": 0, "logros": 1})

    if logros_usuario:
        # si el usuario ya tiene logros, se actualizan
        # hay que solo insertar los logros que no tenga
        logros_eliminar = []
        for i in range(len(logros)):
            print("i: ", i)
            if logros[i].nombre in [logro["nombre"] for logro in logros_usuario["logros"]]:
                # agregar a lista de logros a eliminar
                logros_eliminar.append(logros[i])

        # eliminar los logros que ya tiene el usuario
        for logro_eliminar in logros_eliminar:
            logros.remove(logro_eliminar)

        # validar si hay logros para insertar
        if len(logros) == 0:
            return {"mensaje": "No hay logros para insertar"}
        # insertar los titulos restantes
        else:
            for i in range(len(logros)):
                coleccion_usuarios.update_one({"username": usuario_conectado.username}, {"$push": {"logros": logros[i].model_dump()}})
            return {"mensaje": "Logros insertados correctamente"}

    else: # si el usuario no tiene logros, se insertan todos los logros enviados
        for i in range(len(logros)):
            logros[i] = logros[i].model_dump()
        coleccion_usuarios.update_one({"username": usuario_conectado.username}, {"$set": {"logros": logros}})
        return {"mensaje": "Logros insertados correctamente"}
