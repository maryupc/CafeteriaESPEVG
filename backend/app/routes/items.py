from fastapi import APIRouter, HTTPException
from typing import List
from app.database import database
from app.crud.items import delete_item, get_all_items_with_type_and_name, update_price
from app.schemas.items import ItemUpdatePrice, ItemWithTypeName

router = APIRouter()

@router.get("/", response_model=List[ItemWithTypeName])
async def read_all_items():
    return await get_all_items_with_type_and_name(database)

@router.put("/{item_id}/update_price")
async def update_item_price(item_id: int, new_price: ItemUpdatePrice):
    await update_price(database, item_id, new_price)
    return {"message": "Producte actualitzat correctament!"}

@router.delete("/{item_id}", status_code=204)
async def delete_item_by_id(item_id: int):
    rows_deleted = await delete_item(database, item_id)
    if rows_deleted == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return None
