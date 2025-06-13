from typing import List
from databases import Database
from app.models.quantitat_items import quantitatitems
from app.models.items import items
from app.models.productes import productes
from app.schemas.quantitat_items import QuantitatItemsCreate
from databases import Database
from datetime import date
import sqlalchemy

async def get_quantitatitems_by_comanda(db: Database, id_comanda: int, c_date) -> List[dict]:
    query = quantitatitems.select().where(
        (quantitatitems.c.id_comanda == id_comanda) & (quantitatitems.c.c_date == c_date)
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

async def assign_items_to_comanda(db: Database, data: QuantitatItemsCreate) -> None:
    async with db.transaction():
        delete_query = quantitatitems.delete().where(
            (quantitatitems.c.id_comanda == data.id_comanda) &
            (quantitatitems.c.c_date == data.c_date)
        )
        await db.execute(delete_query)

        for item in data.items:
            insert_query = quantitatitems.insert().values(
                id_comanda=data.id_comanda,
                c_date=data.c_date,
                id_item=item.id_item,
                quantity=item.quantity,
            )
            await db.execute(insert_query)

async def get_products_by_comanda(db: Database, id_comanda: int, c_date: date) -> List[dict]:
    query = (
        sqlalchemy.select(
            productes.c.id,
            productes.c.name,
            productes.c.barcode,
            items.c.price,
        )
        .select_from(
            quantitatitems.join(productes, quantitatitems.c.id_item == productes.c.id)
            .join(items, productes.c.id == items.c.id)
        )
        .where(
            (quantitatitems.c.id_comanda == id_comanda) &
            (quantitatitems.c.c_date == c_date)
        )
        .order_by(productes.c.name)
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

