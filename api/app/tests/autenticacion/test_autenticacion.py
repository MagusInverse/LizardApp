import pytest

from fastapi.testclient import TestClient

from app.main import app

from pydantic import BaseModel

# conexion a la base de datos
from app.dependencias.dependencia_bdd import obtener_bdd

# importar datos de prueba
from app.tests.autenticacion.datos_pruebas import datos_prueba_test_registrar_usuario_valido


class User(BaseModel):
    username: str
    password: str
    email: str


def eliminar_usuario_si_existe(username: str):
    bdd = obtener_bdd()
    # validar si el usuario existe
    user = bdd.usuarios.find_one({"username": username})
    if user:
        bdd.usuarios.delete_one({"username": username})
        return True

    return False


@pytest.mark.parametrize("username, password, email", datos_prueba_test_registrar_usuario_valido)
def test_registrar_usuario_valido(username, password, email):
    client = TestClient(app)
    body = User(username=username, password=password,
                email=email).model_dump()
    eliminar_usuario_si_existe(body["username"])  # para evitar conflictos

    response = client.post("api/autenticacion/registro", json=body)
    print(response.text)  # debug
    assert response.status_code == 200
