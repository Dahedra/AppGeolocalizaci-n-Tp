from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from Modelos.provincias_model import Provincia, nuevaProvincia

class provinciasCrud():
    def get_all(self, session: Session):
        return session.execute(select(Provincia)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        return session.execute(select(Provincia).where(Provincia.id == id)).scalar()

    def update(self, id, datos: nuevaProvincia, session: Session):
        instance = session.get(Provincia, id)
        if instance is None:
            return False

        try:
            if datos.nombre != "string" and datos.nombre != "":
                instance.nombre = datos.nombre
            if datos.descripcion != "string" and datos.descripcion != "":
                instance.descripcion = datos.descripcion
            if datos.paisid != 0:
                instance.paisid = datos.paisid
            session.commit()
        except:
            raise HTTPException(status_code=400, detail="Error al actualizar.")
        return instance