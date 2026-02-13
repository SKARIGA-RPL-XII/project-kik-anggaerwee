from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, user, masteruser, masterlang, ocrproces, translate, history, dashboard
import app.models  # ← WAJIB


app = FastAPI(
    title="OCR Translate API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Authentikasi"])
app.include_router(user.router, tags=["Profil"])
app.include_router(masteruser.router, tags=["Master User"])
app.include_router(masterlang.router, tags=["Master Language"])
app.include_router(ocrproces.router, tags=["OCR System"])
app.include_router(translate.router, tags=["Translate System"])
app.include_router(history.router, tags=["History System"])
app.include_router(dashboard.router, tags=["Dashboard System"])

@app.get("/")
def root():
    return {"message": "FastAPI is running"}
