from fastapi import APIRouter, Depends
from app.database.dbconfig import get_db
from sqlalchemy.orm import Session
from app.services.auth_services import process_register, process_login
from pydantic import BaseModel

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    return process_register(db , data.username, data.email, data.password)

@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    return process_login(db, data.email, data.password)
