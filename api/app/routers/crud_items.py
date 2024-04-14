from fastapi import HTTPException, APIRouter

#importar utilidades para la base de datos mongo
from bson import ObjectId

#importar utilidades personalizadas
from .utils import obtener_metadatos_item

#importar dependencias para validar el token
from fastapi import Depends
from app.dependencias.dependencia_autenticacion import obtener_usuario_actual
from app.dependencias.dependencia_bdd import obtener_bdd
from pymongo.mongo_client import MongoClient
from typing import Annotated
from app.modelos.modelo_autenticacion import User

dependencia_autenticacion = Annotated[User, Depends(obtener_usuario_actual)] # para usar: usuario_conectado: dependencia_autenticacion
dependencia_bdd = Annotated[MongoClient, Depends(obtener_bdd)] # para usar: bdd: dependencia_bdd

router = APIRouter(prefix="/api/items", tags=["CRUD de items"])

@router.get("/obtener/item/{categoria}/{id_item}", status_code=200)
async def obtener_item_por_categoria_id(categoria: str, id_item: str, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Obtiene la información de un item de una categoria en específico para la colección de un usuario autenticado, utilizando el id del item como identificador.

    Parámetros:
    - categoria (str): La categoria a la que pertenece el item que se desea obtener de la base de datos. Se pasa como parte de la URL de la solicitud GET.
    - id_item (str): El id del item (que corresponde al _id en la bdd) que se desea obtener de la base de datos. Se pasa como parte de la URL de la solicitud GET.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el item ha sido obtenido correctamente.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando el item de la categoria con el id especificado no existe en la colección del usuario.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # Buscar el item del usuario con el id proporcionado
    usuario_y_item = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            f"{categoria}._id": ObjectId(id_item)
        },
        {f"{categoria}.$": 1}
    )

    # Si el item existe, retornar su información
    if usuario_y_item and categoria in usuario_y_item:
        usuario_y_item = usuario_y_item[categoria]
        # eliminar _id
        for item in usuario_y_item:
            item.pop('_id', None)

        # retornar como objeto JSON, no como array,
        return (usuario_y_item[0])
    else:
        raise HTTPException(status_code=404, detail=f"El item de la categoria '{categoria}' con id '{id_item}' no existe en la colección")


@router.delete("/eliminar/item/{categoria}/{id_item}", status_code=200)
async def eliminar_item_por_categoria_id(categoria: str, id_item: str, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Elimina un item de una categoria en específico para la colección de un usuario autenticado, utilizando el id del item como identificador.

    Parámetros:
    - categoria (str): La categoria a la que pertenece el item que se desea eliminar de la base de datos. Se pasa como parte de la URL de la solicitud DELETE.
    - id_item (str): El id del item (que corresponde al _id en la bdd) que se desea eliminar de la base de datos. Se pasa como parte de la URL de la solicitud DELETE.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el item ha sido eliminado correctamente.
    - 400: Error de solicitud incorrecta - Se devuelve cuando el intento de eliminar el item falla debido a un error en la operación de base de datos.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando no se encuentra el item en la colección del usuario.
    - 500: Error interno del servidor - Se devuelve cuando el servidor encuentra un error inesperado al intentar procesar la solicitud, es posible que sea causado porque el id no sea valido según el formato de un ObjectID de MongoDB.
    """

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    # Buscar al item del usuario con el id y categoria proporcionado
    item_buscado = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            f"{categoria}._id": ObjectId(id_item)
        },
        {f"{categoria}.$": 1}
    )

    # Si el item existe, eliminarlo
    if item_buscado:
        resultado = coleccion_colecciones.update_one(
            {"_id": ObjectId(id_colecciones)},
            {"$pull": {f"{categoria}": {"_id": ObjectId(id_item)}}}
        )
        if resultado.modified_count:
            return {"mensaje": f"El item de la categoria '{categoria}' con id '{id_item}' ha sido eliminado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail=f"El item de la categoria '{categoria}' con id '{id_item}' no pudo ser eliminado")
    else:
        # Si el item no existe, retornar un mensaje de error
        raise HTTPException(status_code=404, detail=f"El item de la categoria '{categoria}' con id '{id_item}' no existe en la colección")


@router.put("/actualizar/item/", status_code=200)
async def actualizar_item(item: dict, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Actualiza la información de un item específico en la colección del usuario autenticado.

    Este endpoint es capaz de entender a qué categoria pertenece el item y actualizarlo en la base de datos gracias al analisis de metadatos del item que se desea actualizar.

    Parámetros:
    - item (json): El objeto item se debe enviar en formato JSON en el cuerpo de la solicitud PUT. Que debe incluir todos los atributos espeficos del modelo de datos de la categoria a actualizar. Solo se actualizaran los atributos que hayan tenido cambios. No se modificaran los atributos no modificables tales como el "_id" o el "isbn" (igualmente deben ser enviados en el json para validar el modelo). Hay casos en los que no es necesario enviar el "_id" del item a actualizar, pero es recomendable enviarlo siempre para evitar complicaciones de codigo por parte del front-end, simplemente enviar todos los atributos del item en todas las solicitudes es lo más recomendable.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el item ha sido actualizado correctamente.
    - 400: Retorna un objeto JSON con el mensaje de que no se encontraron cambios en los atributos a actualizar.
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 404: No encontrado - Se devuelve cuando el item con el atributo validador (por ejemplo el id o el isbn) no existe en la colección del usuario.
    - 422: Entidad no procesable - Se devuelve cuando los atributos del item no cumplen con el modelo de datos de la API o el atributo validador de la existencia del item en la base de datos no fué enviado por parte del cliente (por ejemplo, no se envió el id).
    """
    # obtener los metadatos del item
    objeto_valido, nombre_categoria, atributo_validador_existencia, contiene_id, atributos_no_modificables, clase_categoria = obtener_metadatos_item(item)

    if not objeto_valido:
        raise HTTPException(status_code=422, detail=f"El item no cumple con los atributos de ningun modelo de datos de las categorias, asegurese de que el item tenga los atributos correctos para la categoria a la que pertece")
    # para poder actualizar el item, se debe enviar el _id o el atributo que valida la existencia
    if atributo_validador_existencia not in item.keys(): # se puede dar cuando el atributo validador es el _id y no se envia el _id
        raise HTTPException(status_code=422, detail=f"El item enviado no contiene el atributo '{atributo_validador_existencia}' que valida la existencia del item que se desea actualizar para la categoria '{nombre_categoria}'")

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    atributo_validador = None
    if atributo_validador_existencia == "_id":
        atributo_validador = ObjectId(item["_id"])
    else:
        atributo_validador = item[atributo_validador_existencia]

    # Buscar item con el id proporcionado
    item_buscado = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            f"{nombre_categoria}.{atributo_validador_existencia}": atributo_validador
        },
        {f"{nombre_categoria}.$": 1}
    )

    # Si el item existe, actualizarlo
    if item_buscado:
        # Construir un único objeto de actualización
        actualizacion = {f"{nombre_categoria}.$.{k}": v for k, v in item.items() if (k not in atributos_no_modificables)}

        # Realizar una única operación de actualización
        resultado = coleccion_colecciones.update_one(
            {"_id": ObjectId(id_colecciones), f"{nombre_categoria}.{atributo_validador_existencia}": atributo_validador},
            {"$set": actualizacion}
        )

        if resultado.modified_count:
            return {"mensaje": f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' ha sido actualizado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail=f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' no fue actualizado porque no se encontraron cambios en los atributos modificables")
    else:
        # Si el libro no existe, retornar un mensaje de error
        raise HTTPException(status_code=404, detail=f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' no existe en la colección")

@router.post("/insertar/item/", status_code=200)
async def insertar_item(item: dict, usuario_conectado: dependencia_autenticacion, bdd: dependencia_bdd):
    """
    Inserta un item específico en la colección del usuario autenticado.

    Este endpoint es capaz de entender a qué categoria pertenece el item y actualizarlo en la base de datos gracias al analisis de metadatos del item que se desea actualizar.

    Este endpoint no insertará items duplicados en la base de datos, se considera un item duplicado si el atributo (primary key) validador de la existencia del item ya existe en la colección del usuario.

    Parámetros:
    - item (json): El objeto item se debe enviar en formato JSON en el cuerpo de la solicitud POST. Que debe incluir todos los atributos espeficos del modelo de datos de la categoria del item a insertar. El item debe incluir si o si el atributo que valida la existencia del item en la base de datos (por ejemplo el "_id" o el "isbn"). No se insertaran items duplicados en la base de datos.

    Encabezados requeridos:
    - Authorization (str): Token de acceso del tipo "Bearer" requerido para autenticar la solicitud. Debe ser incluido en el encabezado de la solicitud como "Authorization: Bearer \<token\>".

    Respuestas:
    - 200: Retorna un objeto JSON con el mensaje de éxito, indicando que el item ha sido insertado correctamente.
    - 400: Retorna un objeto JSON con el mensaje de que no se pudo insertar el item (poco común, motivos desconocidos).
    - 401: No autorizado - Autenticación fallida o no proporcionada. Se devuelve cuando el usuario no está autenticado o si el token de autenticación es inválido.
    - 409: Conflicto - Se devuelve cuando el item con el atributo validador (por ejemplo el _id o el isbn) ya existe en la colección del usuario, por lo que el item no se insertará.
    - 422: Entidad no procesable - Se devuelve cuando los atributos del item no cumplen con el modelo de datos de la API o el atributo validador de la existencia del item en la base de datos no fué enviado por parte del cliente (por ejemplo, no se envió el _id).
    """
    # obtener los metadatos del item
    objeto_valido, nombre_categoria, atributo_validador_existencia, contiene_id, atributos_no_modificables, clase_categoria = obtener_metadatos_item(item)

    if not objeto_valido:
        raise HTTPException(status_code=422, detail=f"El item no cumple con los atributos de ningun modelo de datos de las categorias, asegurese de que el item tenga los atributos correctos para la categoria a la que pertece")
    # para poder insertar el item, se debe enviar el _id o el atributo que valida la existencia
    if atributo_validador_existencia not in item.keys(): # se puede dar cuando el atributo validador es el _id y no se envia el _id
        raise HTTPException(status_code=422, detail=f"El item enviado no contiene el atributo '{atributo_validador_existencia}' que valida la existencia del item que se desea insertar para la categoria '{nombre_categoria}'")

    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el id de las colecciones del usuario conectado
    respuesta = coleccion_usuarios.find_one({"username": usuario_conectado.username}, {"coleccion": 1})
    id_colecciones = respuesta['coleccion'].id

    atributo_validador = None
    if atributo_validador_existencia == "_id":
        atributo_validador = ObjectId(item["_id"])
    else:
        atributo_validador = item[atributo_validador_existencia]

    # Buscar item con el id proporcionado
    item_buscado = coleccion_colecciones.find_one(
        {
            "_id": ObjectId(id_colecciones),
            f"{nombre_categoria}.{atributo_validador_existencia}": atributo_validador
        },
        {f"{nombre_categoria}.$": 1}
    )

    # Si el item existe, no insertarlo
    if item_buscado:
        raise HTTPException(status_code=409, detail=f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' ya existe en la colección")
    else:
        item = clase_categoria(**item) # convertir el diccionario a un objeto de la clase correspondiente y que se genere un _id
        resultado = coleccion_colecciones.update_one({ "_id": ObjectId(id_colecciones) }, { "$push": { f"{nombre_categoria}": item.model_dump(by_alias=True) } })

        if resultado.modified_count:
            return {"mensaje": f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' ha sido agregado exitosamente"}
        else:
            raise HTTPException(status_code=400, detail=f"El item con {atributo_validador_existencia} '{atributo_validador}' de la categoria '{nombre_categoria}' no pudo ser agregado")
