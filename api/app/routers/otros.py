from fastapi import HTTPException, APIRouter

#importar utilidades para la base de datos mongo
from bson import ObjectId
from .utils import convertir_id_a_str

from app.modelos.modelo_colecciones import categorias_metadata

#importar dependencias para validar el token
from fastapi import Depends
from app.dependencias.dependencia_autenticacion import obtener_usuario_actual
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from typing import Annotated
from app.modelos.modelo_autenticacion import User

dependencia_autenticacion = Annotated[User, Depends(obtener_usuario_actual)] # para usar: usuario_conectado: dependencia_autenticacion
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api", tags=["Otros"])

# endpoint para obtener información del usuario conectado
@router.get("/obtener/info/usuario")
async def obtener_info_usuario(usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Obtiene la información del usuario conectado, incluyendo su username, url_foto, email, fecha_registro, títulos y logros obtenidos, y la cantidad de items que tiene en cada una de las categorías.

    Si el usuario no tiene títulos o logros, los campos 'titulos' y 'logros' serán arrays vacíos. Si el usuario no tiene colecciones, el campo 'coleccion' será un objeto vacío.

    Parámetros:
    - No hay parámetros.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con los datos del usuario conectado.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"_id": 0})

    #obtener datos del usuario
    username = respuesta["username"]
    url_foto = respuesta["url_foto"]
    email = respuesta["email"]
    fecha_registro = respuesta["fecha_registro"]
    hora_registro = respuesta["hora_registro"]
    coleccion = {}
    titulos = respuesta["titulos"] if "titulos" in respuesta else []
    logros = respuesta["logros"] if "logros" in respuesta else []

    #obtener listado de categorias y cantidad de items por categoria (si existen colecciones)

    if "coleccion" in respuesta:
        id_colecciones = respuesta["coleccion"].id

        todas_las_categorias = coleccion_colecciones.find_one({"_id": ObjectId(id_colecciones)}, {"_id": 0})
        todas_las_categorias = convertir_id_a_str(todas_las_categorias)
        for i in range(len(todas_las_categorias.keys())):
            coleccion[list(todas_las_categorias.keys())[i]] = len(todas_las_categorias[list(todas_las_categorias.keys())[i]])

    return {
            "username": username,
            "url_foto": url_foto,
            "email": email,
            "fecha_registro": fecha_registro,
            "hora_registro": hora_registro,
            "titulos": titulos,
            "logros": logros,
            "coleccion": coleccion,
            }
