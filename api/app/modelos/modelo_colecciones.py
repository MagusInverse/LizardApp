from typing import Annotated, Any, Callable
from bson import ObjectId
from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema

from pydantic import Field
from datetime import date


class ItemCreate(BaseModel):  # poner aqui los atributos comunes (excepto el id, ese va en el modelo "Item")
    fecha_adquisicion: date # formato: YYYY-MM-DD
    url_foto: str
    nombre: str
    tipo: str
    descripcion: str

# modelos para usar de body en las peticiones de inserción ya que no se necesita el _id


class LibroCreate(ItemCreate):
    autor: str
    editorial: str
    genero: str
    edicion: str
    isbn: str
    paginas: int
    anio_publicacion: int


class FiguraCreate(ItemCreate):
    origen: str
    tamano: str
    material: str
    empresa: str


class ArmaCreate(ItemCreate):
    material: str
    tamano: str
    peso: float
    fabricante: str


class CartaCreate(ItemCreate):
    juego: str


class VideojuegoCreate(ItemCreate):
    plataforma: str
    genero: str
    creador: str
    caracteristicas: str

# Modelos para convertir con _id para mongo
# Modelos para usar en endpoints de insercion(para generar _id)
# Crear una nueva clase que herede de la clase Item y de la clase de
# creacion por cada categoria

# Clase para manejar el _id de mongo en los modelos  de pydantic
# Codigo obtenido de https://stackoverflow.com/a/76837550


class _ObjectIdPydanticAnnotation:
    # Based on
    # https://docs.pydantic.dev/latest/usage/types/custom/#handling-third-party-types.

    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        _source_type: Any,
        _handler: Callable[[Any], core_schema.CoreSchema],
    ) -> core_schema.CoreSchema:
        def validate_from_str(input_value: str) -> ObjectId:
            return ObjectId(input_value)

        return core_schema.union_schema(
            [
                # check if it's an instance first before doing any further work
                core_schema.is_instance_schema(ObjectId),
                core_schema.no_info_plain_validator_function(
                    validate_from_str),
            ],
            serialization=core_schema.to_string_ser_schema(),
        )


PydanticObjectId = Annotated[
    ObjectId, _ObjectIdPydanticAnnotation
]


class Item(BaseModel):
    id: PydanticObjectId = Field(default_factory=PydanticObjectId, alias='_id')


class Libro(Item, LibroCreate):
    pass


class Figura(Item, FiguraCreate):
    pass


class Arma(Item, ArmaCreate):
    pass


class Carta(Item, CartaCreate):
    pass


class Videojuego(Item, VideojuegoCreate):
    pass


# metadatos para validar los modelos en los endpoints que lo requieran.
# estos metadatos deben ser actualizados si se cambian los modelos
# estos metadatos brindan información que es utilizada para reconocer propiedades de los objetos enviados en las peticiones
# usado en función app.routers.utils.obtener_metadatos_item

## definir metadatos para las categorias ##
# keys: lista de nombres de atributos del modelo
# no_modificables: lista de nombres de atributos que no se pueden modificar
# validador_existencia(opcional, por defecto es "_id"): nombre del atributo que valida la existencia de un objeto
# clase_categoria: clase de pydantic que representa la categoria (usado para convertir el diccionario a un objeto de la clase correspondiente y que se genere un _id)
categorias_metadata = {
    "libros": {
        "keys": set(
            LibroCreate.schema()['properties'].keys()),
        "no_modificables": ["_id", "isbn"],
        "validador_existencia": "isbn",
        "clase_categoria": Libro
        },
    "videojuegos": {
        "keys": set(
            VideojuegoCreate.schema()['properties'].keys()),
        "no_modificables": ["_id"],
        "clase_categoria": Videojuego
        },
    "cartas": {
        "keys": set(
            CartaCreate.schema()['properties'].keys()),
        "no_modificables": ["_id"],
        "clase_categoria": Carta
        },
    "armas": {
        "keys": set(
            ArmaCreate.schema()['properties'].keys()),
        "no_modificables": ["_id"],
        "clase_categoria": Arma
        },
    "figuras": {
        "keys": set(
            FiguraCreate.schema()['properties'].keys()),
        "no_modificables": ["_id"],
        "clase_categoria": Figura
        },
    }
