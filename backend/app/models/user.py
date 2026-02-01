from sqlalchemy import Integer, String, Column, DateTime
from app.database.dbconfig import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__="msuser"
    userid = Column(Integer, primary_key=True, index=True)
    usernm = Column(String(50))
    email = Column(String(50))
    password = Column(String(50))
    role = Column(String(50))
    createddate = Column(DateTime(timezone=True))
    updateddate = Column(DateTime(timezone=True))
    createdby = Column(String(50))
    updatedby = Column(String(50))