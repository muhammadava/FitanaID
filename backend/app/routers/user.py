import re
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional

from app.database import get_db
from app.models.user import User
from app.models.consultation import ConsultationSession, SavedMedicine, HealthNote
from app.models.medicine import Medicine
from app.schemas.user import UserResponse, UsernameSetRequest
from app.schemas.consultation import ConsultationHistoryItem, SaveMedicineRequest, HealthNoteUpsert
from app.schemas.medicine import MedicineCard

router = APIRouter(prefix="/user", tags=["User"])


def get_user_by_google(google_id: str, db: Session) -> User:
    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan.")
    return user


@router.get("/me", response_model=UserResponse)
def get_me(google_id: str, db: Session = Depends(get_db)):
    return get_user_by_google(google_id, db)


@router.post("/username", response_model=UserResponse)
def set_username(payload: UsernameSetRequest, google_id: str, db: Session = Depends(get_db)):
    user = get_user_by_google(google_id, db)
    username = payload.username.strip().lower()

    if not re.match(r"^[a-z0-9_]{4,20}$", username):
        raise HTTPException(status_code=422, detail="Username 4–20 karakter, hanya huruf kecil, angka, underscore.")

    existing = db.query(User).filter(User.username == username).first()
    if existing and existing.id != user.id:
        raise HTTPException(status_code=409, detail="Username sudah digunakan.")

    user.username = username
    db.commit()
    db.refresh(user)
    return user


# ── Saved Medicines ───────────────────────────────────────────────────────────

@router.get("/saved-medicines", response_model=List[MedicineCard])
def get_saved_medicines(google_id: str, db: Session = Depends(get_db)):
    user = get_user_by_google(google_id, db)
    saved = (
        db.query(Medicine)
        .join(SavedMedicine, SavedMedicine.medicine_id == Medicine.id)
        .filter(SavedMedicine.user_id == user.id)
        .order_by(desc(SavedMedicine.created_at))
        .all()
    )
    return saved


@router.post("/saved-medicines")
def save_medicine(payload: SaveMedicineRequest, db: Session = Depends(get_db)):
    user = get_user_by_google(payload.user_id, db)
    existing = db.query(SavedMedicine).filter(
        SavedMedicine.user_id == user.id,
        SavedMedicine.medicine_id == payload.medicine_id,
    ).first()
    if existing:
        return {"message": "Sudah tersimpan."}

    med = db.query(Medicine).filter(Medicine.id == payload.medicine_id).first()
    if not med:
        raise HTTPException(status_code=404, detail="Produk tidak ditemukan.")

    db.add(SavedMedicine(user_id=user.id, medicine_id=med.id))
    db.commit()
    return {"message": "Produk berhasil disimpan."}


@router.delete("/saved-medicines/{medicine_id}")
def unsave_medicine(medicine_id: str, google_id: str, db: Session = Depends(get_db)):
    user = get_user_by_google(google_id, db)
    saved = db.query(SavedMedicine).filter(
        SavedMedicine.user_id == user.id,
        SavedMedicine.medicine_id == medicine_id,
    ).first()
    if not saved:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan.")
    db.delete(saved)
    db.commit()
    return {"message": "Produk dihapus dari simpanan."}


# ── Consultation History ──────────────────────────────────────────────────────

@router.get("/consultations")
def get_consultation_history(google_id: str, db: Session = Depends(get_db)):
    user = get_user_by_google(google_id, db)
    sessions = (
        db.query(ConsultationSession)
        .filter(ConsultationSession.user_id == user.id)
        .order_by(desc(ConsultationSession.created_at))
        .limit(20)
        .all()
    )

    history = []
    for s in sessions:
        top_med = None
        if s.result_ids:
            med = db.query(Medicine).filter(Medicine.id == s.result_ids[0]).first()
            top_med = med.name if med else None
        history.append({
            "id": str(s.id),
            "category": s.category,
            "created_at": s.created_at.isoformat(),
            "result_count": len(s.result_ids or []),
            "top_medicine_name": top_med,
        })
    return history


# ── Health Notes ──────────────────────────────────────────────────────────────

@router.get("/health-note")
def get_health_note(google_id: str, db: Session = Depends(get_db)):
    user = get_user_by_google(google_id, db)
    note = db.query(HealthNote).filter(HealthNote.user_id == user.id).order_by(desc(HealthNote.updated_at)).first()
    return {"content": note.content if note else ""}


@router.post("/health-note")
def upsert_health_note(payload: HealthNoteUpsert, db: Session = Depends(get_db)):
    user = get_user_by_google(payload.user_id, db)
    note = db.query(HealthNote).filter(HealthNote.user_id == user.id).first()
    if note:
        note.content = payload.content[:2000]
    else:
        note = HealthNote(user_id=user.id, content=payload.content[:2000])
        db.add(note)
    db.commit()
    return {"message": "Catatan tersimpan."}
