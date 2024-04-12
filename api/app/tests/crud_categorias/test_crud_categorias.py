import pytest

from fastapi.testclient import TestClient

from app.main import app

#importar funciones de utilidades
from ..utils import eliminar_usuario_si_existe


@pytest.fixture(scope="session", autouse=True)
def ejecutar_antes_y_despues_de_todos_los_tests():
    #registrar usuario de prueba
    client = TestClient(app)

    response = client.post("api/autenticacion/registro", json={"username": "usuario_prueba", "password": "duoc123456", "email": "example@example.cl"})

    yield
    #eliminar usuario de prueba
    eliminar_usuario_si_existe("usuario_prueba")


def test_obtener_coleccion_usuario_no_autenticado():
    # Simular que un usuario no está autenticado y obtener los items
    # Debe devolver un código de estado 401, no autorizado
    client = TestClient(app)
    response = client.get("/api/categorias/obtener/items")
    assert response.status_code == 401

def test_obtener_coleccion_usuario_autenticado():
    client = TestClient(app)

    #autenticar usuario con credenciales válidas
    response = client.post("/api/autenticacion/token", data={"username": "usuario_prueba", "password": "duoc123456"})
    oauth_token = response.json().get('access_token')
    # mandar token en la cabecera
    headers = {
        "Authorization": f"Bearer {oauth_token}"
    }
    response = client.get("/api/categorias/obtener/items", headers=headers)
    assert response.status_code == 200
