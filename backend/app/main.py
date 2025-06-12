from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import database  # your database instance
from app.routes import comandes

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await database.connect()
    yield
    # shutdown
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.include_router(comandes.router, prefix="/comandes", tags=["comandes"])

