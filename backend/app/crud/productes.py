# app/crud/productes.py

from databases import Database
from app.models.productes import productes

async def delete_producte(db: Database, id: int) -> int:
    query = productes.delete().where(productes.c.id == id)
    return await db.execute(query)
