from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid

class MedicineCard(BaseModel):
    id: uuid.UUID
    name: str
    slug: str
    category: str
    sub_category: Optional[str]
    description: str
    drug_class: Optional[str]
    price_min: Optional[int]
    price_max: Optional[int]
    tags: List[str]
    is_pro: bool
    image_url: Optional[str]
    class Config: from_attributes = True

class MedicineDetail(MedicineCard):
    brand_name: Optional[str]
    generic_name: Optional[str]
    uses: List[str]
    side_effects: List[str]
    dosage: Optional[str]
    form: Optional[str]
    contraindications: List[str]
    drug_interactions: List[str]
    relevance_score: Dict[str, Any]
    created_at: datetime
    class Config: from_attributes = True

class MedicineListResponse(BaseModel):
    items: List[MedicineCard]
    total: int
    page: int
    pages: int
    has_next: bool
    has_prev: bool
