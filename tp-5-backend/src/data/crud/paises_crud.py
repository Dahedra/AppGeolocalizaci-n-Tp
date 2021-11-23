from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, delete, Column
from Modelos.paises_model import Pais, nuevoPais

class paisesCrud():
    def get_all(self, session: Session):
        return session.execute(select(Pais).order_by(Column('id'))).scalars().all()

    def get_by_id(self, id: int, session: Session):
        return session.execute(select(Pais).where(Pais.id == id)).scalar()

    def set(self, datos: nuevoPais, session: Session):
        instancia_pais = Pais({'nombre': datos.nombre, 'canthab': datos.canthab})
        session.add(instancia_pais)
        session.commit()
        return instancia_pais
    
    def delete(self, id: int, session: Session):
        instance = session.get(Pais, id)
        if instance is None:
            return False
        try:
            session.delete(instance)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail="No se pudo eliminar el país.")
        return True

    def update(self, id, datos: nuevoPais, session: Session):
        instance = session.get(Pais, id)
        if instance is None:
            return False

        try:
            if datos.nombre != "string" and datos.nombre != "":
                instance.nombre = datos.nombre
            if datos.canthab != 0:
                instance.canthab = datos.canthab
            session.commit()

        except:
            raise HTTPException(status_code=400, detail="Error al actualizar.")
        return instance
