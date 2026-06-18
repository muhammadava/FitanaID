import json
import redis as redis_lib
from typing import Optional, Any
from app.config import settings

_redis = None

def get_redis():
    global _redis
    if _redis is None:
        _redis = redis_lib.from_url(settings.redis_url, decode_responses=True)
    return _redis

def cache_get(key: str) -> Optional[Any]:
    try:
        r = get_redis()
        val = r.get(key)
        return json.loads(val) if val else None
    except Exception:
        return None

def cache_set(key: str, value: Any, ttl: int = 300):
    try:
        r = get_redis()
        r.setex(key, ttl, json.dumps(value, default=str))
    except Exception:
        pass

def cache_delete(key: str):
    try:
        get_redis().delete(key)
    except Exception:
        pass
