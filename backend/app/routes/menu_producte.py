from fastapi import APIRouter, HTTPException
from typing import List
from app.database import database
from app.crud.menu_producte import get_aliments_by_menu, get_productes_by_menu
from app.schemas.producte import ProducteBase
from app.crud.menus import menu_exists

router = APIRouter()

@router.get("/{id_menu}/productes", response_model=List[ProducteBase])
async def read_productes_by_menu(id_menu: int):
    if not await menu_exists(database, id_menu):
        raise HTTPException(status_code=404, detail="Menu not found")
    
    result = await get_productes_by_menu(database, id_menu)
    return [dict(row) for row in result]

@router.get("/{id_menu}/aliments", response_model=List[dict])
async def read_aliments_by_menu(id_menu: int):
    aliments = await get_aliments_by_menu(database, id_menu)
    if not aliments:
        raise HTTPException(status_code=404, detail="No aliments found for the given menu")
    return aliments
