from fastapi import APIRouter, Depends, HTTPException, status, Request, UploadFile, File
from pydantic import BaseModel
from app.services.translate_services import translate_process, getlanguages
from pydantic import BaseModel
from app.database.dbconfig import get_db 
from sqlalchemy.orm import Session

router = APIRouter()

class inputTranslate(BaseModel):
    text: str
    model: str

@router.post('/input/translate')
async def upload(data: inputTranslate):
    return await translate_process(data.text, data.model)

@router.post('/get/language')
def language(
    db: Session = Depends(get_db)
):
    return getlanguages(db)