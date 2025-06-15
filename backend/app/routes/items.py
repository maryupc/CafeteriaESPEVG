from decimal import Decimal
from fastapi import APIRouter
from typing import List
from app.database import database
from app.crud.items import get_all_items_with_type_and_name, update_price  # adjust import path
from app.schemas.items import ItemUpdatePrice, ItemWithTypeName  # you can define a schema for the response

router = APIRouter()

@router.get("/", response_model=List[ItemWithTypeName])
async def read_all_items():
    return await get_all_items_with_type_and_name(database)

@router.put("/{item_id}/update_price")
async def update_item_price(item_id: int, new_price: ItemUpdatePrice):
    await update_price(database, item_id, new_price)
    return {"message": "Producte actualitzat correctament!"}
