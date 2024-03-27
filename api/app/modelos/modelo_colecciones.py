from pydantic import BaseModel

class Libro(BaseModel):
    titulo: str
    autor: str
    editorial: str
    genero: str
    idioma: str
    edicion: str
    isbn: str
    paginas: int
    fecha_adquisicion: str

class Figura(BaseModel):
    nombre: str
    marca: str
    modelo: str
    fecha_adquisicion: str

class Arma(BaseModel):
    nombre: str
    tipo: str
    calibre: str
    fecha_adquisicion: str

class Carta(BaseModel):
    nombre: str
    tipo: str
    fecha_adquisicion: str

class Videojuego(BaseModel):
    nombre: str
    plataforma: str
    genero: str
    fecha_adquisicion: str
