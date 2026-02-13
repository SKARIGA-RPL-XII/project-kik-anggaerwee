from sqlalchemy.orm import Session
from app.models.history import History
from datetime import datetime, timedelta
import random
import datetime

def process_gethistory(db):
    try:
        history = db.query(History).all()
        data = []
        for h in history:
            data.append({
                "historyid": h.historyid,
                "language_input": h.language_input,
                "language_result": h.language_result,
                "userid": h.userid,
                "ocr_text": h.ocr_text,
                "translated_text": h.translated_text,
                "createddate": h.createddate,
                "createdby": h.createdby,
                "updateddate": h.updateddate,
                "updatedby": h.updatedby,
            })

        return {"status":"success","data":data}
    except Exception as e:
        db.rollback()
        return {"status":"success","message":str(e)}

def proces_insert(db, language_input, language_result, userid, ocrtext, translated, created):
    try:
        if not ocrtext or not translated or not created:
            return {"status":"error","message":"all fields are required"}

        now = datetime.datetime.now()
        random_number = random.randint(100, 999) 
        generatenm = "TRS", random_number

        datas = History(
            language_input= language_input,
            language_result= language_result,
            userid= userid,
            historynm= generatenm,
            ocr_text= ocrtext,
            translated_text= translated,
            createddate = now,
            updateddate = now,
            createdby= created,
            updatedby= created,
        )

        db.add(datas)
        db.commit()
        db.refresh(datas)
        return {"status":"success","message":"Add data history Succesfully"}
    except Exception as e:
        db.rollback()
        return {"status":"success","message":str(e)}

def process_listhistory(db, userid, createddate=None):
    try:
        if not userid:
            return {"status": "error", "message": "userid not found"}

        query = db.query(History).filter(History.userid == userid)

        if createddate:
            selected_date = datetime.strptime(createddate, "%Y-%m-%d")
            next_day = selected_date + timedelta(days=1)

            query = query.filter(
                History.createddate >= selected_date,
                History.createddate < next_day
            )

        result = query.all()

        if not result:
            return {"status": "success", "data": []}

        data = []
        for row in result:
            data.append({
                "historyid": row.historyid,
                "userid": row.userid,
                "language_input": row.language_input,
                "language_result": row.language_result,
                "ocr_text": row.ocr_text,
                "translated_text": row.translated_text,
                "createddate": row.createddate,
            })

        return {"status": "success", "data": data}

    except Exception as e:
        return {"status": "error", "message": str(e)}

def process_deletehistory(db, historyid):
    try:
        history = db.query(History).filter(History.historyid == historyid).first()

        if not history:
            return {"stataus":"Error","message":"history not found"}

        db.delete(history)
        db.commit()

        return {
            "status": "success",
            "message": "History deleted successfully"
        }
    except Exception as e:
        db.rollback()
        return {"status":"Error","message": str(e)}
