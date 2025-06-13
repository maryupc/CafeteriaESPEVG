from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.quantitat_items import QuantitatItemsCreate, QuantitatItemRead
from app.schemas.item_producte import ItemProducte
from app.crud.quantitat_items import assign_items_to_comanda, get_quantitatitems_by_comanda, get_products_by_comanda
from app.database import database
from datetime import date

router = APIRouter()

@router.get("/{id_comanda}/{c_date}", response_model=List[QuantitatItemRead])
async def read_quantitatitems(id_comanda: int, c_date: date):
    items = await get_quantitatitems_by_comanda(database, id_comanda, c_date)
    if not items:
        raise HTTPException(status_code=404, detail="Items not found for given comanda and date")
    return items

@router.post("/", status_code=status.HTTP_201_CREATED)
async def assign_items(data: QuantitatItemsCreate):
    try:
        await assign_items_to_comanda(database, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to assign items: {str(e)}")
    return {"message": "Items assigned successfully"}

@router.get("/products_assigned_by/comanda/{id_comanda}/{c_date}", response_model=List[ItemProducte])
async def read_products_assigned_by_comanda(id_comanda: int, c_date: date):
    products = await get_products_by_comanda(database, id_comanda, c_date)
    return products

