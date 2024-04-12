from fastapi import HTTPException, APIRouter

#importar utilidades para la base de datos mongo
from bson import ObjectId

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

@router.get("/obtener/items", status_code=200)
async def obtener_items_coleccion(usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd, categoria: str = "all"):
    """
    Obtiene todos los ítems de una categoría específica o la colección completa de ítems para el usuario autenticado.

    Parámetros:
    - categoria (str, opcional): Especifica la categoría de ítems a retornar. Por defecto es "all", que indica que se deben retornar todas las categorías.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con los ítems solicitados.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: Retorna un error si la categoría especificada no existe en la colección del usuario.

    Ejemplos de uso:
    ```
    GET /api/categorias/obtener/items?categoria=libros
    Authorization: Bearer <token>
    ```

    Devuelve los ítems de la categoría "libros" para el usuario autenticado.

    ```
    GET /api/categorias/obtener/items
    Authorization: Bearer <token>
    ```

    Devuelve todos los ítems de todas las categorias para el usuario autenticado.
    """

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    if categoria == "all":
        return coleccion_colecciones.find_one({"_id": ObjectId(id_colecciones)}, {"_id": 0})

    else: # retornar solo la categoria especificada
        categoria_especifica = coleccion_colecciones.find_one({"_id": ObjectId(id_colecciones)}, {f"{categoria}": 1, "_id": 0})

        if f"{categoria}" in categoria_especifica:
            return categoria_especifica
        else:
            raise HTTPException(status_code=404, detail=f"La categoría {categoria} no existe en la colección")
