from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class GoogleAuthRequest(BaseModel):
    google_id: str
    email: EmailStr
    display_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UsernameSetRequest(BaseModel):
    username: str

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    display_name: Optional[str]
    username: Optional[str]
    profile_picture: Optional[str]
    is_pro: bool
    created_at: datetime
    class Config: from_attributes = True

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    database: str
    redis: str
