from sqlalchemy.orm.session import Session
from crud.ciudades_crud import ciudadesCrud
from fastapi import APIRouter, Depends, HTTPException
from db import get_session
from Modelos.ciudades_model import nuevaCiudad, ciudadApi

ciudades_router = APIRouter(prefix='/ciudades', tags=['Ciudades'])
crud = ciudadesCrud()

@ciudades_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return crud.get_all(s)

@ciudades_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    ciudad = crud.get_by_id(id, s)
    if ciudad is None:
        raise HTTPException(status_code = 404, detail = "Ciudad no encontrada")

    return ciudad

@ciudades_router.delete('/{id}')
def delete(id, s: Session = Depends(get_session)):
    result = crud.delete(id, s)
    if not result:
        raise HTTPException(status_code=404, detail = "La provincia no existe.")
    else:
        raise HTTPException(status_code=200)

@ciudades_router.put('/{id}', response_model = ciudadApi)
def update(id, datos: nuevaCiudad, s: Session = Depends(get_session)):
    ciudad = crud.update(id, datos, s)
    if not ciudad:
        raise HTTPException(status_code=404, detail = "La provincia no existe.")
    else:
        return ciudad