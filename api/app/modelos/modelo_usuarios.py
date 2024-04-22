from pydantic import BaseModel, Field, EmailStr
from .modelo_colecciones import Libro, Figura, Arma, Carta, Videojuego
from typing import List
from app.configuracion import ConfiguracionModeloConstraints


class UsuarioRegistro(BaseModel):
    username: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_username.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_username.value,
                          pattern=ConfiguracionModeloConstraints.username_regex.value)

    password: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_password.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_password.value,
                          pattern=ConfiguracionModeloConstraints.password_regex.value)
    email: EmailStr
    url_foto: str

class UsuarioRecuperarContrasena(BaseModel):
    username: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_username.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_username.value,
                          pattern=ConfiguracionModeloConstraints.username_regex.value)
    email: EmailStr
    nueva_password: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_password.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_password.value,
                          pattern=ConfiguracionModeloConstraints.password_regex.value)


class Titulo(BaseModel):
    nombre: str
    fecha: str = Field(..., pattern = r"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$") # formato: YYYY-MM-DD


class Logro(BaseModel):
    nombre: str
    fecha: str = Field(..., pattern = r"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$") # formato: YYYY-MM-DD
