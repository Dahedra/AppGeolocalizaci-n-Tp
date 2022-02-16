import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
from os.path import dirname,abspath
direccion = dirname(dirname(abspath(__file__ + "\data")))
sys.path.append(direccion)
print(direccion)

from Api.paises_api import paises_router
from Api.provincias_api import provincias_router
from Api.ciudades_api import ciudades_router
from Modelos.ciudades_model import Ciudad
from Modelos.provincias_model import Provincia
from Modelos.paises_model import Pais
import db

app = FastAPI()

app.include_router(paises_router)
app.include_router(provincias_router)
app.include_router(ciudades_router)

#db.drop_all() 
#db.create_all()

origins =  [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == '__main__':
    uvicorn.run('dataApp:app', reload=True)