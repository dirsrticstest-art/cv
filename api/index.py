import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./leads.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String)
    company = Column(String, nullable=True)
    message = Column(Text)
    budget = Column(Float, nullable=True)
    category = Column(String)
    score = Column(Float)
    priority = Column(String)
    next_action = Column(String)
    ai_provider = Column(String, default="demo")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Lead Qualification API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LeadCreate(BaseModel):
    name: str
    email: str
    company: str | None = None
    message: str
    budget: float | None = None

class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    company: str | None
    message: str
    budget: float | None
    category: str
    score: float
    priority: str
    next_action: str
    ai_provider: str

    class Config:
        from_attributes = True

def qualify_lead_demo(message: str, budget: float | None) -> dict:
    msg = message.lower()
    if any(w in msg for w in ["urgent", "asap", "now", "immediately"]):
        return {"category": "hot", "score": 0.95, "priority": "P1", "next_action": "Schedule immediate call"}
    if any(w in msg for w in ["enterprise", "company", "business", "team"]):
        return {"category": "qualified", "score": 0.85, "priority": "P1", "next_action": "Send enterprise proposal"}
    if budget and budget > 5000:
        return {"category": "qualified", "score": 0.80, "priority": "P2", "next_action": "Follow up within 24h"}
    if any(w in msg for w in ["price", "cost", "how much", "pricing"]):
        return {"category": "nurturing", "score": 0.55, "priority": "P3", "next_action": "Send pricing brochure"}
    return {"category": "new", "score": 0.40, "priority": "P4", "next_action": "Add to email sequence"}

@app.get("/health")
def health():
    return {"status": "ok", "ai_provider": "demo", "version": "2.0.0"}

@app.post("/api/v1/leads", response_model=LeadResponse, status_code=201)
def create_lead(payload: LeadCreate):
    qualification = qualify_lead_demo(payload.message, payload.budget)
    db = SessionLocal()
    try:
        lead = Lead(
            name=payload.name, email=payload.email, company=payload.company,
            message=payload.message, budget=payload.budget,
            category=qualification["category"], score=qualification["score"],
            priority=qualification["priority"], next_action=qualification["next_action"],
        )
        db.add(lead)
        db.commit()
        db.refresh(lead)
        return lead
    finally:
        db.close()

@app.get("/api/v1/leads", response_model=list[LeadResponse])
def list_leads():
    db = SessionLocal()
    try:
        return db.query(Lead).order_by(Lead.id.desc()).all()
    finally:
        db.close()

@app.get("/api/v1/leads/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int):
    db = SessionLocal()
    try:
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        return lead
    finally:
        db.close()
