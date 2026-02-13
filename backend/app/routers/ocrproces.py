from fastapi import APIRouter, Depends, HTTPException, status, Request, UploadFile, File
from pydantic import BaseModel
from app.services.ocr_services import ocr_process

router = APIRouter()

@router.post('/uploadfile')
def upload(
    file: UploadFile = File(...)
):
    return ocr_process(file)