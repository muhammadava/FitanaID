from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, health, catalog, consultation, user

app = FastAPI(
    title="FitanaID API",
    description="REST API platform informasi obat herbal, kimia, vitamin & suplemen FitanaID.",
    version="1.0.1",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router,         prefix="/api/v1")
app.include_router(catalog.router,      prefix="/api/v1")
app.include_router(consultation.router, prefix="/api/v1")
app.include_router(user.router,         prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "FitanaID API v1.0.1", "docs": "/docs", "health": "/health"}
