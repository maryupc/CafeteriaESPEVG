from decimal import Decimal
from databases import Database
import sqlalchemy
from app.models.items import items
from app.models.productes import productes
from app.schemas.items import ItemUpdatePrice

async def get_all_items_with_type_and_name(db):
    query = (
        sqlalchemy.select(
            items.c.id,
            items.c.price,
            sqlalchemy.case(
                (productes.c.name.isnot(None), "producte"),
                else_="menu"
            ).label("type"),
            productes.c.name,
        )
        .select_from(items.outerjoin(productes, items.c.id == productes.c.id))
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

async def update_price(db: Database, item_id: int, new_price: ItemUpdatePrice) -> int:
    query = (
        sqlalchemy.update(items)
        .where(items.c.id == item_id)
        .values(price=new_price.price)
    )
    return await db.execute(query)

async def delete_item(db: Database, item_id: int) -> int:
    query = items.delete().where(items.c.id == item_id)
    return await db.execute(query)
