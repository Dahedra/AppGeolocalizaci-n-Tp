from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from Modelos.ciudades_model import Ciudad, nuevaCiudad

class ciudadesCrud():
    def get_all(self, session: Session):
        return session.execute(select(Ciudad)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        return session.execute(select(Ciudad).where(Ciudad.id == id)).scalar()

    def delete(self, id: int, session: Session):
        instance = session.get(Ciudad, id)
        if instance is None:
            return False
        try:
            session.delete(instance)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail="No se pudo eliminar el la ciudad.")
        return True

    def update(self, id, datos: nuevaCiudad, session: Session):
        instance = session.get(Ciudad, id)
        if instance is None:
            return False

        try:
            if datos.nombre != "string" and datos.nombre != "":
                instance.nombre = datos.nombre
            if datos.descripcion != "string" and datos.descripcion != "":
                instance.descripcion = datos.descripcion
            if datos.provinciaid != 0:
                instance.provinciaid = datos.provinciaid
            if datos.paisid != 0:
                instance.paisid = datos.paisid
            session.commit()
        except:
            raise HTTPException(status_code=400, detail="Error al actualizar.")
        return instance