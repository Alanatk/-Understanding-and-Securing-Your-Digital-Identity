from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, api
from .database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Digital Identity API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Digital Identity API"}
