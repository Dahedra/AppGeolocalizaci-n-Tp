from typing import List
from sqlalchemy.orm.session import Session
from crud.paises_crud import paisesCrud
from fastapi import APIRouter, Depends, HTTPException
from db import get_session
from Modelos.paises_model import nuevoPais, paisApi

paises_router = APIRouter(prefix='/paises', tags=['Paises'])
crud = paisesCrud()

@paises_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return crud.get_all(s)

@paises_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    pais = crud.get_by_id(id, s)
    if pais is None:
        raise HTTPException(status_code = 404, detail = "País no encontrado")
    return pais

@paises_router.post('/', response_model = paisApi)
def post(datos: nuevoPais, s: Session = Depends(get_session)):
    pais = crud.set(datos, s)
    return pais

@paises_router.delete('/{id}')
def delete(id, s: Session = Depends(get_session)):
    result = crud.delete(id, s)
    if not result:
        raise HTTPException(status_code=404, detail = "El país no existe.")
    else:
        raise HTTPException(status_code=200)

@paises_router.put('/{id}', response_model = paisApi)
def update(id, datos: nuevoPais, s: Session = Depends(get_session)):
    pais = crud.update(id, datos, s)
    if not pais:
        raise HTTPException(status_code=404, detail = "El país no existe.")
    else:
        return pais
