from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import re

from app.database import get_db
from app.models.user import User
from app.schemas.user import GoogleAuthRequest, UsernameSetRequest, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/google", response_model=UserResponse)
def google_auth(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    """
    Terima data dari NextAuth setelah user login via Google.
    Buat user baru jika belum ada, kembalikan data user.
    """
    # Cek apakah user sudah ada
    user = db.query(User).filter(User.google_id == payload.google_id).first()

    if not user:
        # Registrasi baru
        user = User(
            google_id=payload.google_id,
            email=payload.email,
            display_name=payload.display_name,
            profile_picture=payload.profile_picture,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user


@router.post("/username", response_model=UserResponse)
def set_username(
    payload: UsernameSetRequest,
    google_id: str,  # Nanti pakai JWT, untuk sekarang pakai param
    db: Session = Depends(get_db),
):
    """Set username kustom untuk user yang baru registrasi."""
    username = payload.username.strip().lower()

    # Validasi format username
    if not re.match(r"^[a-z0-9_]{4,20}$", username):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Username harus 4-20 karakter, hanya huruf kecil, angka, dan underscore.",
        )

    # Cek apakah username sudah dipakai
    existing = db.query(User).filter(User.username == username).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username sudah digunakan.",
        )

    user = db.query(User).filter(User.google_id == google_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User tidak ditemukan.")

    user.username = username
    db.commit()
    db.refresh(user)

    return user
