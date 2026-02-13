import os
os.environ["FLAGS_use_mkldnn"] = "0"

import cv2
import numpy as np
from paddleocr import PaddleOCR


def ocr_process(file):
    try:
        ext = os.path.splitext(file.filename)[1].lower()

        if ext not in [".png",".jpg","jpeg"]:
            return {"status":"Error","message":"File harus berformat png, jpg, jpeg"}

        image_bytes = file.file.read()
        n_array = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(n_array, cv2.IMREAD_COLOR)

        if img is None:
            return {"status":"Error","message":"Gambar tidak valid"}

        ocr = PaddleOCR(
        use_doc_orientation_classify=False,
        use_doc_unwarping=False,
        use_textline_orientation=False,
        lang="en"
        )

        result = ocr.ocr(img)

        extracted_text = []
        for line in result[0]:
            extracted_text.append(line[1][0])

        return {
            "status":"success",
            "text":extracted_text,
            "full_text":"".join(extracted_text),
        }

    except Exception as e:
        return {"status":"Error", "message":str(e)}

