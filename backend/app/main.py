from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.api import router

app = FastAPI(
    title="OCR Translate API",
    version="1.0.0"
)

# CORS (agar bisa diakses React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ganti domain saat production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "FastAPI is running"}
