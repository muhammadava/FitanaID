from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, health

app = FastAPI(
    title="FitanaID API",
    description="REST API untuk platform informasi obat herbal, kimia, vitamin & suplemen FitanaID.",
    version="1.0.1",
    docs_url="/docs",        # Swagger UI
    redoc_url="/redoc",      # ReDoc UI
)

# ─── CORS Middleware ───────────────────────────────────────────────────────────
# Izinkan frontend Next.js (localhost:3000) mengakses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ──────────────────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(auth.router, prefix="/api/v1")

# ─── Root ─────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "message": "FitanaID API berjalan.",
        "docs": "/docs",
        "health": "/health",
    }
