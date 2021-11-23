from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db import Base
from pydantic import BaseModel

class Pais(Base):
    __tablename__ = 'paises'

    id = Column(Integer, primary_key=True) 
    nombre = Column(String(50), nullable=False)
    canthab = Column(Integer)
    provincias = relationship('Provincia')
    ciudades = relationship('Ciudad')

class nuevoPais(BaseModel):
    nombre: str
    canthab: int

    class Config:
        orm_mode = True

class paisApi(nuevoPais):
    id: int