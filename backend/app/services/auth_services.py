from sqlalchemy.orm import Session
from app.models.user import User
from app.services.jwtconfig import generate_token
import hashlib
import datetime

def process_register(
    db : Session,
    username: str,
    email: str,
    password: str
):
    try:
        if not username or not email or not password:
            return {"status": "Error", "message":"All fields are required."}
    
        existing_users = db.query(User).filter(User.email == email).first()
        if existing_users:
            return {"status":"Error", "message":"Email allready exist"}

        password_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        now = datetime.datetime.now()

        users = User(
            usernm= username,
            email= email,
            password= password_hash,
            role= 1,
            createddate= now,
            updateddate= now,
            createdby= username,
            updatedby= username,
        )
        
        db.add(users)
        db.commit()
        db.refresh(users)
        return {"status":"success", "message":"Register Successfully"}
    except Exception as e:
        db.rollback()
        return {"status":"Error", "message": str(e)}

def process_login(
    db: Session,
    email: str,
    password: str
):
    try:
        if not email or not password:
            return {"status":"Error", "message":"All fields are required."}

        query = db.query(User).where(User.email == email).first()
        if not query:
            return {"status":"Error", "message":"Email belum terdaftar"}

        password_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        
        if query.password != password_hash:
            return {"status":"Error", "message":"Password Salah"}

        token = generate_token({"userid":query.userid, "email": email, "role": query.role, "password": password, "usernm": query.usernm})
        return {"status":"success", "message":"Login Successfully", "access_token": token, "token_type":"bearer", "role":query.role}
    except Exception as e:
        return {"status":"Error", "message": str(e)}

        

