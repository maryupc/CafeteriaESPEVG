from fastapi import APIRouter, HTTPException, status, Query
from typing import List
from datetime import date
from app.schemas.comandes import Comanda, ComandaCreate, ComandaUpdate
from app.schemas.quantitat_items import QuantitatItemsCreate, ComandaWithItemsCreate
from app.crud.comandes import get_comandes, get_comanda, create_comanda, update_comanda, delete_comanda, get_comandes_by_date, get_summary_today
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

@router.post("/create", response_model=Comanda, status_code=status.HTTP_201_CREATED)
async def create_new_comanda(data: ComandaWithItemsCreate):
    comanda_data = ComandaCreate(
        id=0,  # Will be set later
        member_id=data.member_id,
        c_date=data.c_date,
        c_time=data.c_time,
        total_price=data.total_price,
        payment_method=data.payment_method,
    )

    quantitat_data = QuantitatItemsCreate(
        id_comanda=0,  # Will be set in the logic
        c_date=data.c_date,
        items=data.items
    )

    new_id = await create_comanda(database, comanda_data, quantitat_data)
    return Comanda(id=new_id, **comanda_data.model_dump(exclude={"id"}))

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

@router.get("/resum")
async def get_today_summary():
    summary = await get_summary_today(database)
    return summary
