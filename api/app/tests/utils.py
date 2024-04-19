from app.dependencias.dependencia_bdd import obtener_bdd
from bson import ObjectId

def eliminar_usuario_si_existe(username: str):
    bdd = obtener_bdd()
    # validar si el usuario existe
    user = bdd.usuarios.find_one({"username": username})
    if user:
        # obtener el id de las colecciones del usuario conectado para eliminarla
        respuesta = bdd.usuarios.find_one({"username": username}, {"coleccion": 1})
        id_colecciones = respuesta['coleccion'].id

        # eliminar la colección del usuario
        bdd.colecciones.delete_one({"_id": ObjectId(id_colecciones)})
        bdd.usuarios.delete_one({"username": username})
        return True

    return False
