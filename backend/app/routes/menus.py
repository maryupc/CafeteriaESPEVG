from fastapi import APIRouter, Depends
from app.database import database

from app.crud.menus import delete_menu

router = APIRouter()

@router.delete("/{menu_id}", status_code=200)
async def api_delete_menu(menu_id: int):
    return await delete_menu(database, menu_id)

