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


# endpoint para obtener top 10 coleccionistas
@router.get("/obtener/top/10")
async def obtener_top_10(bdd: dependencia_bdd):
    """
    Obtiene una lista de los 10 coleccionistas con la mayor cantidad de items en sus colecciones, ordenados de mayor a menor cantidad de items. Si dos coleccionistas tienen la misma cantidad de items, se ordenan por fecha de registro (de mayor a menor antigüedad). Si el usuario no tiene colecciones o si no tiene al menos 1 item, no será considerado en el top 10.

    Cada usuario en la lista incluye su username, url_foto, fecha_registro, hora_registro, cantidad de títulos y logros obtenidos, nombre del ultimo titulo obtenido, la cantidad total de items coleccionados, y la cantidad de items que tiene en cada una de las categorías.

    Parámetros:
    - No hay parámetros.

    Encabezados requeridos:
    - No hay encabezados requeridos.

    Respuestas:
    - 200: Retorna un objeto JSON con los datos de los 10 coleccionistas con la mayor cantidad de items en sus colecciones.
    - 404: No encontrado - No se encontraron usuarios con colecciones.
    """
    coleccion_usuarios = bdd["usuarios"]
    coleccion_colecciones = bdd["colecciones"]

    #obtener el usuarios con colecciones
    respuesta = (coleccion_usuarios.find({"coleccion": { "$exists": True } }, {"_id": 0, "hashed_password": 0, "email": 0}))

    usuarios = []
    for usuario in respuesta:
        id_colecciones = usuario["coleccion"].id
        usuario.pop("coleccion")
        usuario["coleccion"] = str(id_colecciones)
        usuarios.append(usuario)

    # obtener colecciones de los usuarios
    colecciones = coleccion_colecciones.find({"_id": {"$in": [ObjectId(usuario["coleccion"]) for usuario in usuarios]}})

    for usuario in usuarios:
        for coleccion in colecciones:
            coleccion["_id"] = str(coleccion["_id"])
            if coleccion["_id"] == usuario["coleccion"]:
                usuario["coleccion"] = []

                # obtener cantidad de logros y titulos
                usuario["cantidad_titulos"] = len(usuario["titulos"]) if "titulos" in usuario else 0
                usuario["cantidad_logros"] = len(usuario["logros"]) if "logros" in usuario else 0

                # obtener ultimo titulo obtenido
                usuario["ultimo_titulo"] = usuario["titulos"][-1]["nombre"] if usuario["cantidad_titulos"] > 0 else "novato"

                # obtener cantidad de items por categoria y total de items
                cantidad_items_col = 0
                for i in range(len(list(categorias_metadata.keys()))):
                    try:
                        cantidad = len(coleccion[list(categorias_metadata.keys())[i]])
                        usuario["coleccion"].append({list(categorias_metadata.keys())[i]: cantidad})
                        cantidad_items_col += cantidad # sumar total
                    except:
                        continue
                # asignar cantidad de items a usuario
                usuario["cantidad_items"] = cantidad_items_col

                # eliminar al usuario de la lista de colecciones si no tiene items
                if cantidad_items_col == 0:
                    usuarios.remove(usuario)
                break


    # si no hay usuarios con colecciones, retornar error 404
    if len(usuarios) == 0:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios con colecciones.")

    # convertir ObjectId a strings
    for usuario in usuarios:
        usuario = convertir_id_a_str(usuario)

    # ordenar usuarios de mayor a menor cantidad de items (si tienen la misma cantidad, se ordena por fecha de registro)

    # funcion para ordenar los usuarios por fecha
    def ordenar_por_fecha_hora(L):
        #YYYY-MM-DD
        fecha_split = L["fecha_registro"].split('-')
        hora_split = L["hora_registro"].split(':')
        # ordenar en esta prioridad: total_items, YYYY, MM, DD, HH, MM
        return int(fecha_split[0]), int(fecha_split[1]), int(fecha_split[2]), int(hora_split[0]), int(hora_split[1])

    usuarios = sorted(usuarios, key=ordenar_por_fecha_hora) # menor a mayor fecha de registro (mayor antiguedad a menor antiguedad
    usuarios = sorted(usuarios, key=lambda x: x["cantidad_items"], reverse=True) # mayor a menor cantidad de items
    # solo se devuelven los primeros 10
    if len(usuarios) > 10:
        usuarios = usuarios[:10]

    return usuarios
