from app.models.user import User
import hashlib
import datetime

def get_userprofil(db, userid,):
    try: 
        user = db.query(User).filter(User.userid == userid).first()

        data = {
            "usernm": user.usernm,
            "email": user.email,
            "updateddate": user.updateddate
        }

        return {"status":"success", "data":data}
    except Exception as e:
        db.rollback()
        return {"status":"Error", "message": str(e)}

def process_updateprofil(db, userid, username, email):
    try:
        if not username or not email:
            return {"status":"Error", "message":"All fields are required."}
        
        user = db.query(User).filter(User.userid == userid).first()
        
        existing_email = db.query(User).filter(User.email == email).first()
        if existing_email:
            return {"status":"Error", "message":"Email allready exist"}
        
        now = datetime.datetime.now()
        
        user.email = email
        user.usernm = username
        user.updateddate = now
        db.commit()
        db.refresh(user)
        return {"status":"success", "message":"Edit profil successfully"}
    except Exception as e:
        db.rollback()
        return {"status":"Error", "message": str(e)}
    
def process_editpassword(db, new_password, current_password, confirm_password, userid):
    try:
            if not new_password or not current_password or not confirm_password:
                return {"status":"Error", "message":"All fields are required."}
            
            user = db.query(User).filter(User.userid == userid).first()
            if not user:
                return {"status":"Error","message":"User not found"}
                
            current_password = current_password.strip()
            confirm_password = confirm_password.strip()
            new_password = new_password.strip()
            now = datetime.datetime.now()

            current_password_hash = hashlib.md5(current_password.encode('utf-8')).hexdigest()
            confirm_password_hash = hashlib.md5(confirm_password.encode('utf-8')).hexdigest()
            new_password_hash = hashlib.md5(new_password.encode('utf-8')).hexdigest()

            stored_password = (user.password or "").strip()
            if current_password_hash != stored_password:
                return {"status":"Error", "message":"The current password is incorrect"}

            if new_password_hash != confirm_password_hash:
                return {"status":"Error", "message":"Confirm password is invalid"}

            user.password = new_password_hash
            user.updateddate = now
            db.commit()
            db.refresh(user)
            return {"status":"success","message":"Edit password Successfully"}
    except Exception as e:
            db.rollback()
            return {"status":"Error","message":str(e)}