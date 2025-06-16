from databases import Database
from fastapi import HTTPException, status
from app.models.menus import menus
from sqlalchemy import select

async def menu_exists(db: Database, id_menu: int) -> bool:
    query = select(menus.c.id).where(menus.c.id == id_menu)
    result = await db.fetch_one(query)
    return result is not None

async def delete_menu(db: Database, menu_id: int):
    query = menus.select().where(menus.c.id == menu_id)
    menu = await db.fetch_one(query)
    if not menu:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu not found")

    # Delete menu
    delete_query = menus.delete().where(menus.c.id == menu_id)
    await db.execute(delete_query)
    return {"message": f"Menu {menu_id} deleted successfully"}
