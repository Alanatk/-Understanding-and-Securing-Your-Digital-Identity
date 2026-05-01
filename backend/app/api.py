from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import schemas, models, security
from .database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_username = db.query(models.User).filter(models.User.username == user.username).first()
    if db_username:
        raise HTTPException(status_code=400, detail="Username already registered")
        
    hashed_password = security.get_password_hash(user.password)
    new_user = models.User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(security.get_current_user)):
    return current_user

import random
import time

@router.post("/scan-footprint")
def scan_footprint(email: str, current_user: models.User = Depends(security.get_current_user)):
    # Simulate a time-consuming scan of the dark web and public data brokers
    time.sleep(1) # Fake delay
    
    # Generate mock breaches based on the user's email length or hash to be somewhat consistent
    breaches = []
    has_breaches = random.choice([True, False, True]) # 2/3 chance of having breaches
    
    if has_breaches:
        potential_sources = ["Apollo", "LinkedIn Scrape 2021", "Canva", "MySpace", "Adobe", "Dubsmash"]
        num_breaches = random.randint(1, 3)
        sources = random.sample(potential_sources, num_breaches)
        for src in sources:
            breaches.append({
                "source": src,
                "data_compromised": random.sample(["Email", "Passwords", "Usernames", "IP Addresses"], k=random.randint(1,3)),
                "date": f"20{random.randint(15,23)}-0{random.randint(1,9)}-1{random.randint(0,9)}"
            })
            
    return {
        "status": "completed",
        "email_scanned": email,
        "breaches_found": len(breaches),
        "breach_details": breaches,
        "risk_level": "High" if len(breaches) > 1 else "Medium" if len(breaches) == 1 else "Low",
        "recommendations": [
            "Change your password immediately if any breached data included 'Passwords'.",
            "Enable Multi-Factor Authentication on all sensitive accounts.",
            "Monitor your credit report for suspicious activity."
        ] if breaches else ["Great job! Keep using unique passwords and MFA."]
    }
