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

router = APIRouter(prefix="/api/categorias", tags=["CRUD de categorias"])

# endpoint para agregar una nueva categoría a la colección del usuario (vacía, sin ítems)
@router.post("/agregar/categoria/{nombre_categoria}")
async def agregar_categoria(nombre_categoria: str, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Agrega una nueva categoria para el usuario autenticado. Solo se pueden agregar las categorías definidas en el modelo de datos.

    Si el usuario aún no tiene colecciones (documento "colecciones" en la base de datos), se le crea y asigna como referencia una colección y se le añade la nueva categoría que desea crear.

    Parámetros:
    - nombre_categoria (str): Especifica el nombre de la categoría a agregar en la colección del usuario. Debe ser una categoría ya definida en el modelo de datos; "videojuegos", "cartas", "armas", "figuras" o "libros".

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Categoría agregada exitosamente al usuario.
    - 400: Solicitud incorrecta - La categoría especificada no es valida, asegurarse de ingresar una categoría ya definida en el modelo de datos.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 409: Conflicto - La categoría ya existe en la colección del usuario, no se pueden agregar categorías duplicadas.
    """
    # solo permitir categorias ya implementadas
    if nombre_categoria not in list(categorias_metadata.keys()):
        raise HTTPException(status_code=400, detail="La categoría no está implementada en el modelo de datos")
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})

    try:
        id_colecciones = respuesta['coleccion'].id
    except:
        # si el usuario no tiene colecciones, hay que crearle el documento y asignarle la referencia en el usuario
        resultado = coleccion_colecciones.insert_one({f"{nombre_categoria}": []})

        #obtener el id de la colección creada
        id_coleccion = resultado.inserted_id
        #actualizar el documento del usuario con la referencia a la colección creada
        coleccion_usuarios.update_one(
                {"username": usuario_conectado.username},
                {"$set": {"coleccion": {"$ref": "colecciones", "$id": id_coleccion}}}
                 )
        return {"mensaje": "categoria agregada exitosamente"}


    todas_las_categorias = coleccion_colecciones.find_one({"_id": ObjectId(id_colecciones)}, {"_id": 0})
    todas_las_categorias_keys = list(convertir_id_a_str(todas_las_categorias).keys())

    #validar si la categoría ya existe
    if nombre_categoria in todas_las_categorias_keys:
        raise HTTPException(status_code=409, detail="La categoría ya existe en la colección")
    else:
        #agregar la nueva categoría a la colección
        coleccion_colecciones.update_one({"_id": ObjectId(id_colecciones)}, {"$set": {f"{nombre_categoria}": []}})
        return {"mensaje": "categoria agregada exitosamente"}

