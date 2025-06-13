from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import database
from app.routes import comandes, item_producte, quantitat_items, items

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await database.connect()
    yield
    # shutdown
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(comandes.router, prefix="/comandes", tags=["comandes"])
app.include_router(item_producte.router, prefix="/item_productes", tags=["ItemProductes"])
app.include_router(quantitat_items.router, prefix="/quantitatitems", tags=["quantitatitems"])
app.include_router(items.router, prefix="/items", tags=["items"])
