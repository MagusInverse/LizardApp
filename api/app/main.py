from fastapi import FastAPI
from .routers import autenticacion, crud_categorias, crud_items
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:8100"],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

#incluir los endpoints de los routers
app.include_router(autenticacion.router) # endpoints para autenticacion y registro de usuarios
app.include_router(crud_items.router) # endpoints para CRUD de items
app.include_router(crud_categorias.router) # endpoints para CRUD de categorias

@app.get("/")
def estado_api():
	"""
    Este endpoint se utiliza para saber si la api esta corriendo en producción o desarrollo
	"""
	if os.environ.get("PRODUCTION") == "True":
		return {"Estado": "Producción"}
	else:
 		return {"Estado": "Desarrollo"}
