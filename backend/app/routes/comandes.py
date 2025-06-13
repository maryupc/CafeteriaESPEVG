from fastapi import APIRouter, HTTPException, status, Query
from typing import List
from datetime import date
from app.schemas.comandes import Comanda, ComandaCreate, ComandaUpdate
from app.schemas.quantitat_items import QuantitatItemsCreate
from app.crud.comandes import get_comandes, get_comanda, create_comanda, update_comanda, delete_comanda, get_comandes_by_date
from app.database import database

router = APIRouter()
@router.get("/", response_model=List[Comanda])
async def read_comandes():
    return await get_comandes(database)

@router.get("/by_date", response_model=List[dict])
async def read_comandes_by_date(c_date: date = Query(..., description="Date to filter comandes")):
    return await get_comandes_by_date(database, c_date)

@router.get("/{id}/{c_date}", response_model=Comanda)
async def read_comanda(id: int, c_date: date):
    comanda = await get_comanda(database, id, c_date)
    if not comanda:
        raise HTTPException(status_code=404, detail="Comanda not found")
    return comanda

@router.post("/", response_model=Comanda, status_code=status.HTTP_201_CREATED)
async def create_new_comanda(
    comanda: ComandaCreate,
    quantitat_data: QuantitatItemsCreate
):
    new_id = await create_comanda(database, comanda, quantitat_data)
    return Comanda(id=new_id, **comanda.model_dump())

@router.put("/{id}/{c_date}", response_model=Comanda)
async def update_existing_comanda(id: int, c_date: date, comanda: ComandaUpdate):
    existing = await get_comanda(database, id, c_date)
    if not existing:
        raise HTTPException(status_code=404, detail="Comanda not found")
    await update_comanda(database, id, c_date, comanda)
    return {**comanda.model_dump(), "id": id, "c_date": c_date}

@router.delete("/{id}/{c_date}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_comanda(id: int, c_date: date):
    existing = await get_comanda(database, id, c_date)
    if not existing:
        raise HTTPException(status_code=404, detail="Comanda not found")
    await delete_comanda(database, id, c_date)

