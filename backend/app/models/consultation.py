import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class ConsultationSession(Base):
    __tablename__ = "consultation_sessions"
    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    category    = Column(String(50), nullable=False)        # herbal|kimia|vitamin|suplemen
    answers     = Column(JSONB, default=dict)               # {q_id: answer_value}
    symptoms    = Column(JSONB, default=list)               # collected symptom tags
    result_ids  = Column(JSONB, default=list)               # list of medicine UUIDs
    result_scores= Column(JSONB, default=dict)              # {medicine_id: score}
    status      = Column(String(20), default="completed")
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    user        = relationship("User", backref="consultations")

class SavedMedicine(Base):
    __tablename__ = "saved_medicines"
    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    medicine_id = Column(UUID(as_uuid=True), ForeignKey("medicines.id", ondelete="CASCADE"), nullable=False)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    user        = relationship("User", backref="saved_medicines")
    medicine    = relationship("Medicine", backref="saved_by")

class HealthNote(Base):
    __tablename__ = "health_notes"
    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id     = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content     = Column(String(2000), nullable=False)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())
    user        = relationship("User", backref="health_notes")
