from sqlalchemy import Integer, String, Column, DateTime, Boolean, ForeignKey
from app.database.dbconfig import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class History(Base):
    __tablename__ = "trhistory"
    historyid = Column(Integer, primary_key=True, index=True)
    language_input = Column(String(50))
    language_result = Column(String(50))
    userid = Column(String(50))
    historynm = Column(String(50))
    ocr_text = Column(String(50))
    translated_text = Column(String(50))
    createddate = Column(DateTime(timezone=True))
    createdby = Column(String(50))
    updateddate = Column(DateTime(timezone=True))
    updatedby = Column(String(50))