from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('postgresql+psycopg2://postgres:MyMFaccountP4s357@localhost:5432/Geolocalizacion-DB', echo=True)

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_all():
    Base.metadata.create_all(bind=engine)


def drop_all():
    Base.metadata.drop_all(bind=engine)

def get_session():
    session = LocalSession()
    try:
        yield session
    finally:
        session.close()
