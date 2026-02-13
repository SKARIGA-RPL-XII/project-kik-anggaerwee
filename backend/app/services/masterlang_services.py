from sqlalchemy.orm import Session
from app.models.language import Language
import hashlib
import datetime

def process_getlanguage(db):
    try:
        language = db.query(Language).all()
        data = []
        for l in language:
            data.append({
                "languageid": l.languageid,
                "languagenm": l.languagenm,
                "isactive": l.isactive,
                "langcode": l.langcode,
                "createddate": l.createddate,
                "createdby": l.createdby,
                "updateddate": l.updateddate,
                "updatedby": l.updatedby,
            })

        return {"status":"success", "data": data}
    except Exception as e:
        db.rollback()
        return {"status":"Error", "message": str(e)}

def process_form(db, languageid):
    try:
        if not languageid:
            return{"status":"Error", "message":"language not found"}
        
        language = db.query(Language).filter(Language.languageid == languageid).first()
        data = []
        data.append({
            "languageid": language.languageid,
            "languagenm": language.languagenm,
            "isactive": language.isactive,
            "langcode": language.langcode,
        })
        return {"status":"success", "data":data}
    except Exception as e:
        return {"status":"Error","message": str(e)}

def process_insert(db, languagenm, isactive, created, langcode):
    try:
        if not languagenm or not created or not langcode:
            return {"status":"Error", "message":"All fields are required."}
        
        existing_language = db.query(Language).filter(Language.languagenm == languagenm).first()
        if existing_language:
            return {"status":"Error", "message":"Language allready exist"}
        
        now = datetime.datetime.now()

        datas = Language(
            languagenm= languagenm,
            isactive= isactive,
            createddate = now,
            updateddate = now,
            createdby= created,
            updatedby= created,
            langcode = langcode
        )

        db.add(datas)
        db.commit()
        db.refresh(datas)
        return {"status":"success","message":"Add data language Succesfully"}
    except Exception as e:
        db.rollback()
        return {"status":"success","message":str(e)}

def process_edit(db, languageid, languagenm, isactive, created, langcode):
    try:
        if not languageid:
            return {"status":"Error","message":"Userid not found"}

        if languageid is None or languagenm is None or isactive is None or created is None:
            return {"status":"Error","message":"All fields are required."}
        
        language = db.query(Language).filter(Language.languageid == languageid).first()
        existing_lang = db.query(Language).filter(Language.languagenm == languagenm).first()
        if existing_lang:
            return {"status":"Error","message":"Language allready exist"}
        
        now = datetime.datetime.now()

        language.languagenm = languagenm
        language.isactive = isactive
        language.updateddate = now
        language.updatedby = created
        language.langcode = langcode
        db.commit()
        db.refresh(language)
        return {"status":"success","message":"Edit data language Successfully"}
    except Exception as e:
        db.rollback()
        return {"status":"Error","message": str(e)}
    
def process_delete(db, languageid):
    try:
        language = db.query(Language).filter(Language.languageid == languageid).first()

        if not language:
            return {"stataus":"Error","message":"language not found"}

        db.delete(language)
        db.commit()

        return {
            "status": "success",
            "message": "Language deleted successfully"
        }
    except Exception as e:
        db.rollback()
        return {"status":"Error","message": str(e)}
