from fastapi import APIRouter
from sqlalchemy import text
import redis as redis_client

from app.database import SessionLocal
from app.config import settings
from app.schemas.user import HealthResponse

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
def health_check():
    """Endpoint untuk verifikasi semua service aktif."""
    db_status = "disconnected"
    redis_status = "disconnected"

    # Cek PostgreSQL
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        db.close()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    # Cek Redis
    try:
        r = redis_client.from_url(settings.redis_url)
        r.ping()
        redis_status = "connected"
    except Exception as e:
        redis_status = f"error: {str(e)}"

    return {
        "status": "ok",
        "service": "FitanaID API",
        "version": "1.0.1",
        "database": db_status,
        "redis": redis_status,
    }
