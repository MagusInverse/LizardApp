import os
from enum import Enum

# Configuraciones para el manejo de tokens JWT
class ConfiguracionOauth2(Enum):
    CLAVE_SECRETA = "SUPER-SECRET-KEY-FOR-OAUTH2" if os.environ.get(
        "SECRET_KEY_OAUTH2") is None else os.environ.get("SECRET_KEY_OAUTH2")
    ALGORITMO_ENCRIPTADO = "HS256"
    TOKEN_EXPIRACION_MINUTOS = 0 if os.environ.get(
        "PRODUCTION") == "True" else 60
    TOKEN_EXPIRACION_DIAS = 7 if os.environ.get(
        "PRODUCTION") == "True" else 0

# Configuraciones para la base de datos
class ConfiguracionBDD(Enum):
    MONGO_USERNAME = os.environ.get("MONGO_USERNAME") or "admin"
    MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD") or "myPassword123"
    MONGO_CLUSTER = os.environ.get("MONGO_CLUSTER") or None

# Constraints para los modelos de la base de datos
class ConfiguracionModeloConstraints(Enum):
    # passwords constraints
    largo_maximo_password = 128
    largo_minimo_password = 8
    password_regex = r"^[a-zA-Z0-9_!@#$%^&*]*$"

    # username constraints
    largo_maximo_username = 15
    largo_minimo_username = 6
    username_regex = r"^[a-zA-Z0-9_]*$"
