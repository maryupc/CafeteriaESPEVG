from databases import Database
from app.models.menus import menus
from sqlalchemy import select

async def menu_exists(db: Database, id_menu: int) -> bool:
    query = select(menus.c.id).where(menus.c.id == id_menu)
    result = await db.fetch_one(query)
    return result is not None

