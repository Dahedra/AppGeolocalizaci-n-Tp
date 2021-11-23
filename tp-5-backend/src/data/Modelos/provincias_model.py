from pydantic.main import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from db import Base

class Provincia(Base):
    __tablename__ = 'provincias'

    id = Column(Integer, primary_key=True) 
    paisid = Column(ForeignKey('paises.id'), nullable=False)
    nombre = Column(String(50), nullable=False)
    descripcion = Column(String(120))

class nuevaProvincia(BaseModel):
    nombre: str
    descripcion: str

    class Config:
        orm_mode = True

class provinciaApi(nuevaProvincia):
    id: int