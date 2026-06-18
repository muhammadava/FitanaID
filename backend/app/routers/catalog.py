from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
import math

from app.database import get_db
from app.models.medicine import Medicine
from app.schemas.medicine import MedicineCard, MedicineDetail, MedicineListResponse
from app.services.cache import cache_get, cache_set

router = APIRouter(prefix="/catalog", tags=["Catalog"])


@router.get("/medicines", response_model=MedicineListResponse)
def list_medicines(
    q: Optional[str] = Query(None, description="Kata kunci pencarian"),
    category: Optional[str] = Query(None, description="herbal|kimia|vitamin|suplemen"),
    sub_category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=48),
    db: Session = Depends(get_db),
):
    cache_key = f"catalog:{q}:{category}:{sub_category}:{page}:{limit}"
    cached = cache_get(cache_key)
    if cached:
        return cached

    query = db.query(Medicine).filter(Medicine.is_active == True)

    if category:
        query = query.filter(Medicine.category == category.lower())
    if sub_category:
        query = query.filter(Medicine.sub_category.ilike(f"%{sub_category}%"))
    if q:
        query = query.filter(
            or_(
                Medicine.name.ilike(f"%{q}%"),
                Medicine.generic_name.ilike(f"%{q}%"),
                Medicine.brand_name.ilike(f"%{q}%"),
                Medicine.sub_category.ilike(f"%{q}%"),
            )
        )

    total = query.count()
    pages = math.ceil(total / limit)
    items = query.offset((page - 1) * limit).limit(limit).all()

    result = {
        "items": [MedicineCard.model_validate(m).model_dump() for m in items],
        "total": total,
        "page": page,
        "pages": pages,
        "has_next": page < pages,
        "has_prev": page > 1,
    }
    cache_set(cache_key, result, ttl=180)
    return result


@router.get("/medicines/{slug}", response_model=MedicineDetail)
def get_medicine(slug: str, db: Session = Depends(get_db)):
    cached = cache_get(f"medicine:{slug}")
    if cached:
        return cached

    med = db.query(Medicine).filter(Medicine.slug == slug, Medicine.is_active == True).first()
    if not med:
        raise HTTPException(status_code=404, detail="Produk tidak ditemukan.")

    result = MedicineDetail.model_validate(med).model_dump()
    cache_set(f"medicine:{slug}", result, ttl=600)
    return result


@router.get("/categories")
def get_categories():
    return {
        "categories": [
            {"value": "herbal",   "label": "Obat Herbal",    "icon": "🌿"},
            {"value": "kimia",    "label": "Obat Kimia",     "icon": "💊"},
            {"value": "vitamin",  "label": "Vitamin",        "icon": "🫐"},
            {"value": "suplemen", "label": "Suplemen",       "icon": "⚡"},
        ]
    }
