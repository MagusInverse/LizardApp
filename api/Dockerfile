# Python 3.9 es compatible con; FastAPI, DetaSpace
# Se usa la imagen de python 3.9 slim para reducir el tamaño de la imagen (alpine podria dar problemas con dependencias)
# Si la versión slim no funciona, usar la versión completa

FROM python:3.9-slim-bullseye
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app

