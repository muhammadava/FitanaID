import uuid
from sqlalchemy import Column, String, Text, Boolean, Integer, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base

class Medicine(Base):
    __tablename__ = "medicines"
    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name        = Column(String(255), nullable=False, index=True)
    slug        = Column(String(255), unique=True, nullable=False, index=True)
    category    = Column(String(50),  nullable=False, index=True)   # herbal|kimia|vitamin|suplemen
    sub_category= Column(String(100), nullable=True,  index=True)
    brand_name  = Column(String(255), nullable=True)
    generic_name= Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    uses        = Column(JSONB, default=list)    # indikasi
    side_effects= Column(JSONB, default=list)
    dosage      = Column(Text, nullable=True)
    form        = Column(String(100), nullable=True)   # tablet/kapsul/sirup/serbuk
    contraindications = Column(JSONB, default=list)
    drug_interactions = Column(JSONB, default=list)
    drug_class  = Column(String(100), nullable=True)   # bebas/bebas terbatas/keras
    price_min   = Column(Integer, nullable=True)
    price_max   = Column(Integer, nullable=True)
    tags        = Column(JSONB, default=list)
    relevance_score = Column(JSONB, default=dict)   # {"tag": weight, ...}
    is_pro      = Column(Boolean, default=False)
    is_active   = Column(Boolean, default=True)
    image_url   = Column(Text, nullable=True)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())
