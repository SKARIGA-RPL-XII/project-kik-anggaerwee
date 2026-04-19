from app.models.user import User
from app.models.language import Language
from app.models.history import History
from sqlalchemy import func
from pydantic import BaseModel

def totalusers(db):
    try:
        users = db.query(func.count(User.userid)).scalar()
        return {"status":"success","total_users":users}
    except Exception as e:
        return {"status":"error","message":str(e)}

def totalroleuser(db):
    try:
        user_role = db.query(func.count(User.userid)).filter(User.role == '1').scalar()
        return {"status":"success","totalrole_user": user_role}
    except Exception as e:
        return {"status":"error","message": str(e)}

def totalroleadmin(db):
    try:
        user_role = db.query(func.count(User.userid)).filter(User.role == '2').scalar()
        return {"status":"success","totalrole_admin": user_role}
    except Exception as e:
        return {"status":"error","message": str(e)}

def totallanguages(db):
    try:
        lang_total = db.query(func.count(Language.languageid)).scalar()
        return {"status":"success","total_lang": lang_total}
    except Exception as e:
        return {"status":"error","message": str(e)}

def totallangactive(db):
    try:
        active = db.query(func.count(Language.languageid)).filter(Language.isactive == True).scalar()
        return {"status":"success","total_activelang":active}
    except Exception as e:
        return {"status":"error","message": str(e)}

def totallanginactive(db):
    try:
        inactive = db.query(func.count(Language.languageid)).filter(Language.isactive == False).scalar()
        return {"status":"success","total_inactivelang":inactive}
    except Exception as e:
        return {"status":"error","message": str(e)}

def totalhistory(db):
    try:
        history_total = db.query(func.count(History.historyid)).scalar()
        return {"status":"success","total_history": history_total}
    except Exception as e:
        return {"status":"error","message": str(e)}

def monitor_lang_input(db, langcode):
    try:
        count = db.query(func.count(History.historyid))\
            .filter(History.language_input == langcode)\
            .scalar()

        return {"status": "success", "total": count}

    except Exception as e:
        return {"status": "error", "message": str(e)}


def monitor_lang_output(db, langcode):
    try:
        count = db.query(func.count(History.historyid))\
            .filter(History.language_result == langcode)\
            .scalar()

        return {"status": "success", "total": count}

    except Exception as e:
        return {"status": "error", "message": str(e)}
