from bson import ObjectId

#importar modelos y metadatos
from app.modelos.modelo_colecciones import categorias_metadata

# función para convertir ObjectId en strings de un diccionario de manera recursiva
# para poder serializarlo a JSON y enviarlo como respuesta
def convertir_id_a_str(diccionario: dict):
    """
    Convierte los ObjectId en strings en un diccionario de forma recursiva.
    """
    for key, value in diccionario.items():
        if isinstance(value, dict):
            convertir_id_a_str(value)
        elif isinstance(value, list):
            for item in value:
                convertir_id_a_str(item)
        elif isinstance(value, ObjectId):
            diccionario[key] = str(value)
    return diccionario

def obtener_metadatos_item(item: dict):
    """
    Función para reconocer propiedades de los objetos enviados en las peticiones

    Valida si el objeto enviado en la petición cumple con el modelo de datos (si es un objeto válido)
    Obtiene y retorna información sobre el objeto enviado en la petición (categoria, atributo validador de existencia, etc.)
    """
    # atributos del modelo enviado por el cliente
    item_keys = set(item.keys())

    contiene_id = False
    objeto_valido = False
    nombre_categoria = None
    atributo_validador_existencia = "_id" # por defecto, el atributo que valida la existencia es el id
    atributos_no_modificables = []
    clase_categoria = None # se usara para despues poder convertir el diccionario a un objeto de la clase correspondiente

    # validar que el item tenga el atributo id
    if "_id" in item_keys:
        contiene_id = True
        # eliminar el id de los nombres de atributos para validar con el modelo
        item_keys.remove("_id")

    # validar si el item cumple con el modelo de datos
    for categoria in categorias_metadata.keys():
        if item_keys == categorias_metadata[categoria]["keys"]:
            objeto_valido = True

            # obtener el atributo que valida la existencia
            if "validador_existencia" in categorias_metadata[categoria].keys():
                atributo_validador_existencia = categorias_metadata[categoria]["validador_existencia"]

            # obtener los atributos no modificables
            atributos_no_modificables = categorias_metadata[categoria]["no_modificables"]

            # obtener el nombre de la categoría
            nombre_categoria = categoria

            # obtener la clase de pydantic que representa la categoria
            clase_categoria = categorias_metadata[categoria]["clase_categoria"]
            break
    return objeto_valido, nombre_categoria, atributo_validador_existencia, contiene_id, atributos_no_modificables, clase_categoria
