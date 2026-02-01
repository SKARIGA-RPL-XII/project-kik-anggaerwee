from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from app.services.user_services import process_updateprofil, get_userprofil, process_editpassword
from app.database.dbconfig import get_db
from pydantic import BaseModel

router = APIRouter()

class UserRequest(BaseModel):
    userid: int

class PassowrdRequest(BaseModel):
    userid: int
    new_password: str
    current_password:str
    confirm_password:str

class EditRequest(BaseModel):
    usernm: str
    email: str
    userid: int

@router.post("/editprofil")
def editprofil(
    data: EditRequest,
    db: Session = Depends(get_db)
):
    return process_updateprofil(db, data.userid, data.usernm, data.email)

@router.post("/get_user")
def getuser(
    data: UserRequest,
    db: Session = Depends(get_db)
):
    return get_userprofil(db, data.userid)

@router.post("/editpassword")
def editpassword(
    data: PassowrdRequest,
    db: Session = Depends(get_db)
):
    return process_editpassword(
    db=db,
    new_password=data.new_password,
    current_password=data.current_password,
    confirm_password=data.confirm_password,
    userid=data.userid
)
