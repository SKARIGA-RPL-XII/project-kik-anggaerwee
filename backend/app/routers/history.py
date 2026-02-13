from fastapi import APIRouter, Depends
from app.database.dbconfig import get_db
from sqlalchemy.orm import Session
from app.services.history_services import proces_insert, process_gethistory, process_listhistory, process_deletehistory
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class InsertData(BaseModel):
    language_input: str
    language_result: str
    userid: int
    ocrtext: str
    translated: str
    created: str

class HistoryRequest(BaseModel):
    userid: int
    createddate: Optional[str] = None


class DeleteRequest(BaseModel):
    historyid: int

class DateRequest(BaseModel):
    date: str

@router.post("/insert/history")
def insert(
    data: InsertData,
    db: Session = Depends(get_db)
):
    return proces_insert(db, data.language_input, data.language_result ,data.userid, data.ocrtext, data.translated, data.created)

@router.post("/table/history")
def get_history(
    db: Session = Depends(get_db)
):
    return process_gethistory(db)

@router.post("/list/history")
def history(
    request: HistoryRequest,
    db: Session = Depends(get_db)
):
    return process_listhistory(db, request.userid, request.createddate)


@router.post("/delete/history")
def delete_history(
    request: DeleteRequest,
    db: Session = Depends(get_db)
):
     return process_deletehistory(db, request.historyid)