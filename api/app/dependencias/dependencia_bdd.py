import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from app.configuracion import ConfiguracionBDD

# Dependencia para obtener conexión a la base de datos
def obtener_bdd():
    mongo_db = None
    if os.environ.get("PRODUCTION") == "True":
        uri = f"mongodb+srv://{ConfiguracionBDD.MONGO_USERNAME.value}:{ConfiguracionBDD.MONGO_PASSWORD.value}@{ConfiguracionBDD.MONGO_CLUSTER.value}/?retryWrites=true&w=majority"
        mongo_db = MongoClient(uri, server_api=ServerApi('1')).ColeccionistaCluster

    else:
        mongo_client = MongoClient("mongodb://db-lizard:27017/",
                                   username=ConfiguracionBDD.MONGO_USERNAME.value,
                                   password=ConfiguracionBDD.MONGO_PASSWORD.value)

        # Get the database
        mongo_db = mongo_client["db-lizard"]

    return mongo_db
