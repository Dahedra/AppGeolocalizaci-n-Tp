from pydantic.main import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from db import Base

class Ciudad(Base):
    __tablename__ = 'ciudades'

    id = Column(Integer, primary_key=True)
    paisid = Column(ForeignKey('paises.id'), nullable=False)
    provinciaid = Column(ForeignKey('provincias.id'), nullable=False)
    nombre = Column(String(50), nullable=False)
    descripcion = Column(String(120))

class nuevaCiudad(BaseModel):
    nombre: str
    descripcion: str

    class Config:
        orm_mode = True

class ciudadApi(nuevaCiudad):
    id: int