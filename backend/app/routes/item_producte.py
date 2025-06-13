from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.item_producte import ItemProducte, ItemProducteCreate, ItemProducteUpdate
from app.crud.item_producte import (
    get_item_productes,
    get_item_producte,
    create_item_producte,
    update_item_producte,
    delete_item_producte,
)
from app.database import database

router = APIRouter()

@router.get("/", response_model=List[ItemProducte])
async def read_item_productes():
    return await get_item_productes(database)

@router.get("/{id}", response_model=ItemProducte)
async def read_item_producte(id: int):
    item_producte = await get_item_producte(database, id)
    if not item_producte:
        raise HTTPException(status_code=404, detail="ItemProducte not found")
    return item_producte

@router.post("/", response_model=ItemProducte, status_code=status.HTTP_201_CREATED)
async def create_new_item_producte(item_producte: ItemProducteCreate):
    existing = await get_item_producte(database, item_producte.id)
    if existing:
        raise HTTPException(status_code=400, detail="ItemProducte already exists")
    await create_item_producte(database, item_producte)
    return item_producte

@router.put("/{id}", response_model=ItemProducte)
async def update_existing_item_producte(id: int, item_producte: ItemProducteUpdate):
    existing = await get_item_producte(database, id)
    if not existing:
        raise HTTPException(status_code=404, detail="ItemProducte not found")
    await update_item_producte(database, id, item_producte)
    return {**item_producte.dict(), "id": id}

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_item_producte(id: int):
    existing = await get_item_producte(database, id)
    if not existing:
        raise HTTPException(status_code=404, detail="ItemProducte not found")
    await delete_item_producte(database, id)

