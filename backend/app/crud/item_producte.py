from typing import List, Optional
from databases import Database
from app.models.productes import productes
from app.models.items import items
from app.schemas.item_producte import ItemProducteCreate, ItemProducteUpdate
import sqlalchemy

def _item_producte_join():
    return (
        sqlalchemy.select(
            productes.c.id,
            items.c.price,
            productes.c.name,
            productes.c.barcode,
        )
        .select_from(productes.join(items, productes.c.id == items.c.id))
    )

async def get_item_productes(db: Database) -> List[dict]:
    query = _item_producte_join().order_by(productes.c.name.asc())
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

async def get_item_producte(db: Database, id: int) -> Optional[dict]:
    query = _item_producte_join().where(productes.c.id == id)
    result = await db.fetch_one(query)
    return dict(result) if result else None

async def create_item_producte(db: Database, item_producte: ItemProducteCreate) -> None:
    query_item = items.insert().values(
        id=item_producte.id,
        price=item_producte.price,
    )
    query_producte = productes.insert().values(
        id=item_producte.id,
        name=item_producte.name,
        barcode=item_producte.barcode,
    )
    async with db.transaction():
        await db.execute(query_item)
        await db.execute(query_producte)

async def update_item_producte(db: Database, id: int, item_producte: ItemProducteUpdate) -> int:
    query_item = items.update().where(items.c.id == id).values(
        price=item_producte.price
    )
    query_producte = productes.update().where(productes.c.id == id).values(
        name=item_producte.name,
        barcode=item_producte.barcode
    )
    async with db.transaction():
        await db.execute(query_item)
        return await db.execute(query_producte)

async def delete_item_producte(db: Database, id: int) -> int:
    query_producte = productes.delete().where(productes.c.id == id)
    query_item = items.delete().where(items.c.id == id)
    async with db.transaction():
        await db.execute(query_producte)
        return await db.execute(query_item)

