from sqlalchemy import Integer, String, Column, DateTime, Boolean
from app.database.dbconfig import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Language(Base):
    __tablename__="mslanguage"
    languageid = Column(Integer, primary_key=True, index=True)
    languagenm = Column(String(50))
    isactive = Column(Boolean)
    createddate = Column(DateTime(timezone=True))
    createdby = Column(String(50))
    updateddate = Column(DateTime(timezone=True))
    updatedby = Column(String(50))
    langcode = Column(String(50))