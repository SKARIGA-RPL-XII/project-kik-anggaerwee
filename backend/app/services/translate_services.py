from app.models.language import Language
from googletrans import Translator

async def translate_process(text: str, model: str):
    try:
        translator = Translator()

        detection = await translator.detect(text)
        translated = await translator.translate(text, dest=model)

        return {
            "status": "success",
            "output": translated.text,
            "detect": detection.lang
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def getlanguages(db):
    try:
        languages = db.query(Language).all()
        data = []
        for l in languages:
            data.append({
                "id" : l.languageid,
                "value" : l.langcode,
                "label" : l.languagenm
            })

        return {"status":"success","data":data}
    except Exception as e:
        db.rollback()
        return {"status":"success","data":str(e)}