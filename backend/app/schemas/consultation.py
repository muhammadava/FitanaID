from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid
from app.schemas.medicine import MedicineCard

class ConsultationSubmit(BaseModel):
    category: str
    answers: Dict[str, str]
    user_id: Optional[str] = None   # google_id

class RecommendationItem(BaseModel):
    medicine: MedicineCard
    score: float
    match_percent: int
    matched_tags: List[str]

class ConsultationResult(BaseModel):
    session_id: uuid.UUID
    category: str
    recommendations: List[RecommendationItem]
    created_at: datetime

class ConsultationHistoryItem(BaseModel):
    id: uuid.UUID
    category: str
    created_at: datetime
    result_count: int
    top_medicine_name: Optional[str]
    class Config: from_attributes = True

class SaveMedicineRequest(BaseModel):
    medicine_id: str
    user_id: str   # google_id

class HealthNoteUpsert(BaseModel):
    content: str
    user_id: str   # google_id
