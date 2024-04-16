from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone
from .modelo_colecciones import Libro, Figura, Arma, Carta, Videojuego
from typing import List
from app.configuracion import ConfiguracionModeloConstraints


class ColeccionUsuario(BaseModel):
    videojuegos: List[Videojuego]
    cartas: List[Carta]
    armas: List[Arma]
    figuras: List[Figura]
    libros: List[Libro]


class UsuarioRegistro(BaseModel):
    username: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_username.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_username.value,
                          pattern=ConfiguracionModeloConstraints.username_regex.value)

    password: str = Field(..., min_length=ConfiguracionModeloConstraints.largo_minimo_password.value,
                          max_length=ConfiguracionModeloConstraints.largo_maximo_password.value,
                          pattern=ConfiguracionModeloConstraints.password_regex.value)
    email: EmailStr
    fecha_registro: datetime = Field(default_factory=lambda: datetime.now(tz=timezone.utc))

