from app.services.masterlang_services import process_insert, process_edit , process_getlanguage, process_delete, process_form
from fastapi import APIRouter, Depends
from app.database.dbconfig import get_db
from pydantic import BaseModel
from sqlalchemy.orm import Session

router = APIRouter()

class InsertData(BaseModel):
    languagenm: str
    isactive: bool
    created: str
    langcode: str

class EditData(BaseModel):
    languageid: int
    languagenm: str
    isactive: bool
    created: str
    langcode: str

@router.post('/table/language')
def tableUser(
    db: Session = Depends(get_db)
):
    return process_getlanguage(db)

@router.post("/insert/language")
def insertLang(
    data: InsertData,
    db: Session = Depends(get_db)
):
    return process_insert(db, data.languagenm, data.isactive, data.created, data.langcode)

@router.post("/edit/language")
def editLang(
    data: EditData,
    db: Session = Depends(get_db)
):
    return process_edit(db, data.languageid, data.languagenm, data.isactive, data.languageid, data.langcode)

@router.get("/forms/{languageid}")
def formLang(
    languageid: int, db: Session = Depends(get_db)
):
    return process_form(db, languageid)

@router.delete("/language/{languageid}")
def deleteLang(
    languageid: int, db: Session = Depends(get_db)
):
    return process_delete(db, languageid)