from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.user import User
from app.schemas.consultation import ConsultationSubmit, ConsultationResult, RecommendationItem
from app.schemas.medicine import MedicineCard
from app.services.consultation_engine import get_questions, run_consultation

router = APIRouter(prefix="/consultation", tags=["Consultation"])


@router.get("/questions/{category}")
def get_consultation_questions(category: str):
    valid = ["herbal", "kimia", "vitamin", "suplemen"]
    if category not in valid:
        raise HTTPException(status_code=400, detail=f"Kategori harus salah satu dari: {valid}")
    return {"category": category, "questions": get_questions(category)}


@router.post("/submit", response_model=ConsultationResult)
def submit_consultation(payload: ConsultationSubmit, db: Session = Depends(get_db)):
    valid = ["herbal", "kimia", "vitamin", "suplemen"]
    if payload.category not in valid:
        raise HTTPException(status_code=400, detail="Kategori tidak valid.")

    # Resolve user_id from google_id
    user_db_id = None
    if payload.user_id:
        user = db.query(User).filter(User.google_id == payload.user_id).first()
        if user:
            user_db_id = user.id

    result = run_consultation(
        db=db,
        category=payload.category,
        answers=payload.answers,
        user_id=user_db_id,
    )

    if not result["recommendations"]:
        raise HTTPException(
            status_code=422,
            detail="Tidak ada rekomendasi yang cocok dengan kondisi Anda. Coba ubah beberapa jawaban."
        )

    recommendations = [
        RecommendationItem(
            medicine=MedicineCard.model_validate(r["medicine"]),
            score=r["score"],
            match_percent=r["match_percent"],
            matched_tags=r["matched_tags"],
        )
        for r in result["recommendations"]
    ]

    return ConsultationResult(
        session_id=result["session_id"],
        category=result["category"],
        recommendations=recommendations,
        created_at=result["created_at"],
    )
