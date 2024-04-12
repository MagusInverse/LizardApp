from fastapi import HTTPException, APIRouter

#importar utilidades para la base de datos mongo
from bson import ObjectId

#importar modelos
from app.modelos.modelo_colecciones import Libro

#importar dependencias para validar el token
from fastapi import Depends
from app.dependencias.dependencia_autenticacion import obtener_usuario_actual
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from typing import Annotated
from app.modelos.modelo_autenticacion import User

dependencia_autenticacion = Annotated[User, Depends(obtener_usuario_actual)] # para usar: usuario_conectado: dependencia_autenticacion
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api/libros", tags=["CRUD de libros"])

@router.get("/obtener/libro/{isbn}", status_code=200)
async def obtener_libro(isbn: str, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Obtiene la información de un libro específico en la colección de un usuario autenticado, utilizando el ISBN del libro como identificador.

    Parámetros:
    - isbn (str): El ISBN del libro que se desea obtener de la base de datos. Se pasa como parte de la URL de la solicitud GET.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el libro ha sido obtenido correctamente.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando el libro con el ISBN especificado no existe en la colección del usuario.

    Ejemplos de uso:
    ```
    PUT /api/libros/obtener/libro/<isbn>
    Authorization: Bearer <token>
    ```
    Obtiene el libro con el ISBN especificado del usuario autenticado.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # Buscar al libro del usuario con el ISBN proporcionado
    usuario_y_libro = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            "libros.isbn": isbn
        },
        {"libros.$": 1}
    )

    # Si el libro existe, retornar su información
    if usuario_y_libro:
        return usuario_y_libro["libros"][0]
    else:
        # Si el libro no existe, retornar un mensaje de error
        raise HTTPException(status_code=404, detail=f"El libro con ISBN {isbn} no existe en la colección")


@router.put("/actualizar/libro", status_code=200)
async def actualizar_libro(libro: Libro, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Actualiza la información de un libro específico en la colección de un usuario autenticado, utilizando el ISBN del libro como identificador.

    Parámetros:
    - libro (Libro): El objeto libro representado como un modelo Pydantic que recibe los datos actualizados en formato JSON en el cuerpo de la solicitud PUT. Incluye atributos como título, autor, ISBN, etc., que deben ser actualizados en la base de datos.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el libro ha sido actualizado correctamente.
    - 400: Se devuelve cuando no se puede actualizar el libro a pesar de que existe en la base de datos.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando el libro con el ISBN especificado no existe en la colección del usuario.

    Ejemplos de uso:
    ```
    PUT /api/libros/actualizar/libro
    Authorization: Bearer <token>
    ```
    Envia un objeto libro con el ISBN correspondiente para actualizar su información en la base de datos del usuario autenticado.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # Buscar al usuario y al libro con el ISBN proporcionado
    usuario_y_libro = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            "libros.isbn": libro.isbn
        },
        {"libros.$": 1}
    )

    # Si el libro existe, actualizarlo
    if usuario_y_libro:
        resultado = coleccion_colecciones.update_one(
            {"_id": ObjectId(id_colecciones), "libros.isbn": libro.isbn},
            {"$set": {"libros.$": libro.model_dump()}}
        )
        if resultado.modified_count:
            return {"mensaje": f"El libro con ISBN {libro.isbn} ha sido actualizado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail=f"El libro con ISBN {libro.isbn} no pudo ser actualizado")
    else:
        # Si el libro no existe, retornar un mensaje de error
        raise HTTPException(status_code=404, detail=f"El libro con ISBN {libro.isbn} no existe en la colección")


@router.post("/insertar/libro", status_code=200)
async def agregar_libro(libro: Libro, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Agrega un nuevo libro a la colección de un usuario autenticado, utilizando el ISBN del libro como identificador para asegurarse de que no se dupliquen los registros.

    Parámetros:
    - libro (Libro): Objeto libro representado como un modelo Pydantic que recibe los datos en formato JSON en el cuerpo de la solicitud POST. Este modelo incluye campos esenciales como título, autor, ISBN, etc.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el libro ha sido agregado correctamente a la colección del usuario.
    - 400: Se devuelve cuando no se puede agregar el libro por un problema en la solicitud.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 409: Conflicto - Se devuelve cuando el libro ya existe en la colección del usuario, para evitar duplicaciones.

    Ejemplos de uso:
    ```
    POST /api/libros/insertar/libro
    Authorization: Bearer <token>
    ```
    Envía un objeto libro con detalles necesarios para ser agregado a la colección del usuario autenticado si no existe previamente.
    """

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # validar si el libro ya existe para el usuario conectado
    # usar isbn como identificador único
    libro_encontrado = coleccion_colecciones.find_one({ "_id": ObjectId(id_colecciones), "libros": { "$elemMatch": { "isbn": libro.isbn } } })

    # si el libro no existe, agregarlo
    if not libro_encontrado:
        resultado = coleccion_colecciones.update_one({ "_id": ObjectId(id_colecciones) }, { "$push": { "libros": libro.model_dump() } })

        if resultado.modified_count:
            return {"mensaje": f"El libro con ISBN {libro.isbn} ha sido agregado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail="El libro no pudo ser agregado")

    # si existe, retornar un mensaje de error
    raise HTTPException(status_code=409, detail="El libro ya existe en la colección")


@router.delete("/eliminar/libro/{isbn}", status_code=200)
async def eliminar_libro(isbn: str, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Elimina un libro específico de la colección de un usuario autenticado, utilizando el ISBN como identificador del libro a eliminar.

    Parámetros:
    - isbn (str): El ISBN del libro que se desea eliminar de la base de datos. Se pasa como parte de la URL de la solicitud DELETE.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el libro ha sido eliminado correctamente.
    - 400: Error de solicitud incorrecta - Se devuelve cuando el intento de eliminar el libro falla debido a un error en la operación de base de datos.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando no se encuentra el libro con el ISBN especificado en la colección del usuario.

    Ejemplos de uso:
    ```
    DELETE /api/libros/eliminar/libro/<isbn>
    Authorization: Bearer <token>
    ```
    Envía el ISBN del libro que se desea eliminar de la colección del usuario autenticado. Asegura que el libro especificado por el ISBN realmente pertenezca a la colección del usuario y que el usuario tenga los derechos adecuados para realizar esta operación.
    """

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # Buscar al usuario y al libro con el ISBN proporcionado
    usuario_y_libro = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            "libros.isbn": isbn
        },
        {"libros.$": 1}
    )

    # Si el libro existe, eliminarlo
    if usuario_y_libro:
        resultado = coleccion_colecciones.update_one(
            {"_id": ObjectId(id_colecciones)},
            {"$pull": {"libros": {"isbn": isbn}}}
        )
        if resultado.modified_count:
            return {"mensaje": f"El libro con ISBN {isbn} ha sido eliminado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail=f"El libro con ISBN {isbn} no pudo ser eliminado")
    else:
        # Si el libro no existe, retornar un mensaje de error
        raise HTTPException(status_code=404, detail=f"El libro con ISBN {isbn} no existe en la colección")

