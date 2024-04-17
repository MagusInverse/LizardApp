import pytest

from fastapi.testclient import TestClient

from app.main import app

from pydantic import BaseModel

# importar funciones de utilidades
from ..utils import eliminar_usuario_si_existe

# importar datos de prueba
from app.tests.autenticacion.datos_pruebas import datos_prueba_test_registrar_usuario_valido


class User(BaseModel):
    username: str
    password: str
    email: str
    url_foto: str


@pytest.mark.parametrize("username, password, email", datos_prueba_test_registrar_usuario_valido)
def test_registrar_usuario_valido(username, password, email):
    client = TestClient(app)
    body = User(username=username, password=password,
                email=email, url_foto="www.example.com").model_dump()

    response = client.post("api/autenticacion/registro", json=body)
    print(response.text)  # debug
    assert response.status_code == 200
    eliminar_usuario_si_existe(body["username"])  # para mantener la base de datos limpia
