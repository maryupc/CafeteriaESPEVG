# app/crud/productes.py

from databases import Database
from app.models.productes import productes

async def delete_producte(db: Database, id: int) -> int:
    query = productes.delete().where(productes.c.id == id)
    return await db.execute(query)

async def producte_exists(db: Database, producte_id: int) -> bool:
    query = productes.select().where(productes.c.id == producte_id)
    result = await db.fetch_one(query)
    return result is not None
