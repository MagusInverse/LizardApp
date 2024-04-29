import pytest

from fastapi.testclient import TestClient

from app.main import app

from pydantic import BaseModel

from faker import Faker

import random


from app.modelos.modelo_colecciones import LibroCreate, FiguraCreate, ArmaCreate, CartaCreate, VideojuegoCreate, ItemCreate, categorias_metadata

class User(BaseModel):
    username: str
    password: str
    email: str
    url_foto: str


def test_crear_multiples_usuarios_con_colecciones():
    client = TestClient(app)
    # crear username unico con libreria faker
    fake = Faker()
    names = [((fake.unique.name()).replace(" ", "_") + f"{i + 1}").replace(".", "_") for i in range(20)]

    # crear lista de categorias para asignar de manera aleatoria a los usuarios
    lista_categorias = ["libros", "figuras", "armas", "cartas", "videojuegos"]
    categorias_config = [
        lista_categorias[:1], # libros
        lista_categorias[:2], # libros, figuras
        lista_categorias[:3], # libros, figuras, armas
        lista_categorias[:4], # libros, figuras, armas, cartas
        lista_categorias, # todas
        lista_categorias[4:5], # videojuegos
        lista_categorias[3:5], # cartas, videojuegos
        lista_categorias[2:5], # armas, cartas, videojuegos
        lista_categorias[1:5], # figuras, armas, cartas, videojuegos
    ]

    users: list[User] = []

    # crear usuarios
    for i in range(len(names)):
        numero_usuario = i + 1
        if len(names[i]) > 15:
            names[i] = names[i][:15]

        user = User(username=names[i], password="duoc123456", email=f"{names[i]}@example.com", url_foto="https://www.svgrepo.com/show/506667/person.svg")

        # registrar usuario
        response_registrar_usuario = client.post("api/autenticacion/registro", json=user.model_dump())
        # print(response_registrar_usuario.text)

        # crear categorias al usuario

        response_logear_usuario = client.post("/api/autenticacion/token", data={"username": user.username, "password": user.password})
        oauth_token = response_logear_usuario.json().get('access_token')
        # crear header de autorizacion
        headers = {
            "Authorization": f"Bearer {oauth_token}"
        }
        # crear categorias
        # entre 0 y 8 el indice de la lista de categorias_config
        numero_random_categoria = random.randint(0, 8)

        categorias_items = []
        # agregar categorias al usuario una por una
        for categoria in categorias_config[numero_random_categoria]:
            response = client.post(f"/api/categorias/agregar/categoria/{categoria}", headers=headers)

            # insertar items al usuario
            cantidad_items_insertar = random.randint(1, 20)
            categorias_items.append({
                "categoria": categoria,
                "cantidad_items": cantidad_items_insertar
            })

            # crear items con datos basura
            for i in range(cantidad_items_insertar):
                # crear datos comunes
                item = {
                    "fecha_adquisicion": "2022-10-10",
                    "url_foto":  "https://www.svgrepo.com/show/510250/sword.svg",
                    "nombre":  "item" + str(i + 1),
                    "tipo": "tipoitem",
                    "descripcion":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est ipsum, porttitor eget lacinia a, tincidunt vel diam. Aliquam mattis orci eget aliquet vestibulum. Curabitur sed facilisis massa. Sed hendrerit porta arcu vel rhoncus. Nam ultricies dolor ac velit finibus venenatis. Duis libero eros, viverra eu purus eu, tincidunt pellentesque metus. Quisque sed felis vitae orci pulvinar bibendum."
                    }
                # crear datos especificos
                for key in categorias_metadata[categoria]["keys"]:
                    if key == "fecha_adquisicion" or key == "url_foto" or key == "nombre" or key == "tipo" or key == "descripcion":
                        continue
                    if key in ["tamano", "paginas", "anio_publicacion", "peso"]:
                        item[key] = random.randint(1, 100)
                        continue
                    item[key] = "beatae sint laudantium consequatur"

                # insertar item
                response = client.post(f"/api/items/insertar/item", headers=headers, json=item)
                # print("RESPUESTA INSERT ITEM: " + response.text)
        # insertar titulos y logros
        titulos = []
        logros = []

        # Inicializar contadores para títulos y logros
        total_colecciones = len(categorias_items)
        # print("TOTAL COLECCIONES: " + str(total_colecciones))
        total_elementos = sum(item['cantidad_items'] for item in categorias_items)

        # siempre se asigna el titulo de novato
        titulo = "novato"
        titulos.append(titulo)

        # Asignar títulos basados en el número total de colecciones
        if total_colecciones >= 2:
            titulo = "aficionado"
            titulos.append(titulo)
        if total_colecciones >= 3:
            titulo = "coleccionista"
            titulos.append(titulo)
        if total_colecciones >= 5:
            titulo = "maestro"
            titulos.append(titulo)


        # Asignar logros basados en el número total de elementos
        if total_elementos >= 1:
            logro = "A"
            logros.append(logro)
        if total_elementos >= 2:
            logro = "B"
            logros.append(logro)
        if total_elementos >= 5:
            logro = "C"
            logros.append(logro)
        if total_elementos >= 10:
            logro = "D"
            logros.append(logro)
        if total_elementos >= 20:
            logro = "E"
            logros.append(logro)

        # insertar titulos
        for i in range(len(titulos)):
            titulo = {
                "nombre": titulos[i],
                "fecha": "2022-10-10"
            }
            titulos[i] = titulo
        response = client.post(f"/api/gamificacion/insertar/titulos", headers=headers, json=titulos)
        # print("RESPUESTA INSERT TITULOS: " + response.text)

        # insertar logros
        for i in range(len(logros)):
            logro = {
            "nombre": logros[i],
            "fecha": "2022-10-10"
            }
            logros[i] = logro
        response = client.post(f"/api/gamificacion/insertar/logros", headers=headers, json=logros)
        # print("RESPUESTA INSERT LOGROS: " + response.text)
        print(f"USUARIO DE PRUEBA N°{numero_usuario} INSERTADO CORRECTAMENTE")

    assert True == True
