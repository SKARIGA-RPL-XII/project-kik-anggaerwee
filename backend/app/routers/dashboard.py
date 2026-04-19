from fastapi import APIRouter, Depends, HTTPException, status, Request, UploadFile, File
from pydantic import BaseModel
from app.services.dashboard_services import totalusers, totalroleuser, totalroleadmin, totallanguages, totallangactive, totallanginactive, totalhistory, monitor_lang_output, monitor_lang_input
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

@router.post('/monitoring/languages_input')
def countlanguageinput(
    request: LabelRequest,
    db: Session = Depends(get_db)
    ):
    return monitor_lang_input(db, request.label)

@router.post('/monitoring/languages_result')
def countlanguageoutput(
    request: LabelRequest,
    db: Session = Depends(get_db)
    ):
    return monitor_lang_output(db, request.label)

from sqlalchemy import func

@router.get('/monitoring/language-summary')
def language_summary(db: Session = Depends(get_db)):
    try:
        input_counts = db.query(
            History.language_input,
            func.count(History.historyid)
        ).group_by(History.language_input).all()

        result_counts = db.query(
            History.language_result,
            func.count(History.historyid)
        ).group_by(History.language_result).all()

        return {
            "status": "success",
            "input": dict(input_counts),
            "result": dict(result_counts)
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}