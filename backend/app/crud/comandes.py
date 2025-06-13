from typing import List, Optional
from databases import Database
from app.models.comandes import comandes
from app.schemas.comandes import ComandaCreate, ComandaUpdate
from app.models.quantitat_items import quantitatitems
from app.schemas.quantitat_items import QuantitatItemsCreate
from datetime import date
import sqlalchemy
from sqlalchemy import select, func

async def get_comandes(db: Database) -> List[dict]:
    today = date.today()
    query = sqlalchemy.select(
        comandes.c.id,
        comandes.c.member_id,
        comandes.c.c_date,
        comandes.c.c_time,
        comandes.c.total_price,
        comandes.c.payment_method
    ).where(
        comandes.c.c_date <= today
    ).order_by(
        comandes.c.c_date.desc(),
        comandes.c.c_time.desc()
    ).limit(20000)
    rows =  await db.fetch_all(query)
    return [dict(row) for row in rows]

async def get_comandes_by_date(db: Database, c_date: date) -> List[dict]:
    query = comandes.select().where(
        comandes.c.c_date == c_date
    ).order_by(
        comandes.c.c_time.desc()
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

async def get_comanda(db: Database, id: int, c_date) -> Optional[dict]:
    query = comandes.select().where(
        (comandes.c.id == id) & (comandes.c.c_date == c_date)
    )
    result = await db.fetch_one(query)
    return dict(result) if result else None

async def create_comanda(db: Database, comanda_data: ComandaCreate, quantitat_data: QuantitatItemsCreate):
    async with db.transaction():
        today = comanda_data.c_date

        # Get the max id for the day (or 0 if none)
        query_max_id = select(func.max(comandes.c.id)).where(comandes.c.c_date == today)
        last_id_row = await db.fetch_one(query_max_id)
        last_id = last_id_row[0] if last_id_row and last_id_row[0] is not None else 0
        new_id = last_id + 1

        # Insert new comanda with the new_id
        query_insert_comanda = comandes.insert().values(
            id=new_id,
            member_id=comanda_data.member_id,
            c_date=comanda_data.c_date,
            c_time=comanda_data.c_time,
            total_price=comanda_data.total_price,
            payment_method=comanda_data.payment_method,
        )
        await db.execute(query_insert_comanda)

        # Insert all quantitatitems with the new_id and date
        items_to_insert = [
            {
                "id_comanda": new_id,
                "c_date": quantitat_data.c_date,
                "id_item": item.id_item,
                "quantity": item.quantity,
            }
            for item in quantitat_data.items
        ]
        await db.execute_many(quantitatitems.insert(), items_to_insert)

        return new_id

async def update_comanda(db: Database, id: int, c_date, comanda: ComandaUpdate) -> int:
    query = comandes.update().where(
        (comandes.c.id == id) & (comandes.c.c_date == c_date)
    ).values(
        c_time=comanda.c_time,
        total_price=comanda.total_price,
        payment_method=comanda.payment_method,
        member_id=comanda.member_id,
    )
    return await db.execute(query)

async def delete_comanda(db: Database, id: int, c_date) -> int:
    query = comandes.delete().where(
        (comandes.c.id == id) & (comandes.c.c_date == c_date)
    )
    return await db.execute(query)

