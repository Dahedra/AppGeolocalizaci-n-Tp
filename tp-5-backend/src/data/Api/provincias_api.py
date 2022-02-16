from sqlalchemy.orm.session import Session
from crud.provincias_crud import provinciasCrud
from fastapi import APIRouter, Depends, HTTPException
from db import get_session
from Modelos.provincias_model import provinciaApi, nuevaProvincia

provincias_router = APIRouter(prefix='/provincias', tags=['Provincias'])
crud = provinciasCrud()

@provincias_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return crud.get_all(s)

@provincias_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    provincia = crud.get_by_id(id, s)
    if provincia is None:
        raise HTTPException(status_code = 404, detail = "Provincia no encontrada")

    return provincia

@provincias_router.delete('/{id}')
def delete(id, s: Session = Depends(get_session)):
    result = crud.delete(id, s)
    if not result:
        raise HTTPException(status_code=404, detail = "La provincia no existe.")
    else:
        raise HTTPException(status_code=200)

@provincias_router.put('/{id}', response_model = provinciaApi)
def update(id, datos: nuevaProvincia, s: Session = Depends(get_session)):
    provincia = crud.update(id, datos, s)
    if not provincia:
        raise HTTPException(status_code=404, detail = "La provincia no existe.")
    else:
        return provincia