from fastapi import APIRouter, Depends, HTTPException, status, Request, UploadFile, File
from pydantic import BaseModel
from app.services.dashboard_services import totalusers, totalroleuser, totalroleadmin, totallanguages, totallangactive, totallanginactive, totalhistory, monitor_lang
from app.database.dbconfig import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class LabelRequest(BaseModel):
    label: str

@router.post('/count/users')
def countuser(db: Session = Depends(get_db)):
    return totalusers(db)
    
@router.post('/count/roleuser')
def countroleuser(db: Session = Depends(get_db)):
    return totalroleuser(db)

@router.post('/count/roleadmin')
def countroleadmin(db: Session = Depends(get_db)):
    return totalroleadmin(db)

@router.post('/count/language')
def countlang(db: Session = Depends(get_db)):
    return totallanguages(db)

@router.post('/count/activelang')
def countlangactive(db: Session = Depends(get_db)):
    return totallangactive(db)

@router.post('/count/inactiveLang')
def countlanginactive(db: Session = Depends(get_db)):
    return totallanginactive(db)

@router.post('/count/history')
def counthistory(db: Session = Depends(get_db)):
    return totalhistory(db)

@router.post('/monitoring/languages')
def counthistory(
    request: LabelRequest,
    db: Session = Depends(get_db)
    ):
    return monitor_lang(db, request.label)