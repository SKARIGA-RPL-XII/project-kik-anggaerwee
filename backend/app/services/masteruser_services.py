from sqlalchemy.orm import Session
from app.models.user import User
import hashlib
import datetime

def process_getuser(db):
    try:
        user = db.query(User).all()
        data = []
        for u in user:
            data.append({
                "userid": u.userid,
                "username": u.usernm,
                "email": u.email,
                "password": u.password,
                "role": u.role,
                "createddate": u.createddate,
                "createdby": u.createdby,
                "updateddate": u.updateddate,
                "updatedby": u.updatedby,
            })

        return {"status":"success", "data": data}
    except Exception as e:
        db.rollback()
        return {"status":"Error", "message": str(e)}

def process_form(db, userid):
    try:
        if not userid:
            return{"status":"Error", "message":"User not found"}
        
        user = db.query(User).filter(User.userid == userid).first()
        data = []
        data.append({
            "userid": user.userid,
            "usernm": user.usernm,
            "email": user.email,
            "password": user.password,
            "role": user.role,
        })
        return {"status":"success", "data":data}
    except Exception as e:
        return {"status":"Error","message": str(e)}

def process_insert(db, username, email, password, role, created):
    try:
        if not username or not email or not password or not role or not created:
            return {"status":"Error", "message":"All fields are required."}
        
        existing_users = db.query(User).filter(User.email == email).first()
        if existing_users:
            return {"status":"Error", "message":"Email allready exist"}
        
        password_hash = hashlib.md5(password.encode('utf-8')).hexdigest()
        now = datetime.datetime.now()

        datas = User(
            usernm= username,
            email= email,
            password= password_hash,
            role = role,
            createddate = now,
            updateddate = now,
            createdby= created,
            updatedby= created
        )

        db.add(datas)
        db.commit()
        db.refresh(datas)
        return {"status":"success","message":"Add data user Succesfully"}
    except Exception as e:
        db.rollback()
        return {"status":"success","message":str(e)}

def process_edit(db, userid, username, email, password, role, created):
    try:
        if not userid:
            return {"status":"Error","message":"Userid not found"}

        if not username or not email or not password:
            return {"status":"Error","message":"All fields are required."}
        
        user = db.query(User).filter(User.userid == userid).first()
        existing_users = db.query(User).filter(User.email == email).first()
        if existing_users:
            return {"status":"Error","message":"Email allready exist"}
        
        now = datetime.datetime.now()

        user.email = email
        user.usernm = username
        user.updateddate = now
        user.role = role
        user.updatedby = created
        db.commit()
        db.refresh(user)
        return {"status":"success","message":"Edit data user Successfully"}
    except Exception as e:
        db.rollback()
        return {"status":"Error","message": str(e)}
    
def process_delete(db, userid):
    try:
        user = db.query(User).filter(User.userid == userid).first()

        if not user:
            return {"stataus":"Error","message":"userid tidak terdaftar"}

        db.delete(user)
        db.commit()

        return {
            "status": "success",
            "message": "User deleted successfully"
        }
    except Exception as e:
        db.rollback()
        return {"status":"Error","message": str(e)}
