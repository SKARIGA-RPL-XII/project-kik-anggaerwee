from app.services.masteruser_services import process_insert, process_edit , process_getuser, process_delete, process_form
from fastapi import APIRouter, Depends
from app.database.dbconfig import get_db
from pydantic import BaseModel
from sqlalchemy.orm import Session

router = APIRouter()

class UserRequest(BaseModel):
    userid: int

class InsertData(BaseModel):
    username: str
    email: str
    password: str
    role :str
    created: str

class EditData(BaseModel):
    userid: int
    username: str
    email: str
    password: str
    role :str
    created: str

@router.post('/table/user')
def tableUser(
    db: Session = Depends(get_db)
):
    return  process_getuser(db)

@router.post("/insert/user")
def insertUser(
    data: InsertData,
    db: Session = Depends(get_db)
):
    return process_insert(db, data.username, data.email, data.password, data.role, data.created)

@router.post("/edit/user")
def editUser(
    data: EditData,
    db: Session = Depends(get_db)
):
    return process_edit(db, data.userid, data.username, data.email, data.password, data.role, data.created)

@router.get("/form/{userid}")
def formUser(
    userid: int, db: Session = Depends(get_db)
):
    return process_form(db, userid)

@router.delete("/users/{userid}")
def deleteUser(
    userid: int, db: Session = Depends(get_db)
):
    return process_delete(db, userid)