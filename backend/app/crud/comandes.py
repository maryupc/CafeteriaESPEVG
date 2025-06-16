from typing import List, Optional
from databases import Database
from app.crud.aliments import update_aliment_stock
from app.crud.quantitat_aliments import get_aliments_by_producte
from app.models.comandes import comandes
from app.schemas.comandes import ComandaCreate, ComandaUpdate
from app.models.quantitat_items import quantitatitems
from app.models.clients import clients
from app.schemas.quantitat_items import QuantitatItemsCreate
from datetime import date
import sqlalchemy
from sqlalchemy import select, func, distinct, case

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

        query_max_id = select(func.max(comandes.c.id)).where(comandes.c.c_date == today)
        last_id_row = await db.fetch_one(query_max_id)
        last_id = last_id_row[0] if last_id_row and last_id_row[0] is not None else 0
        new_id = last_id + 1

        query_insert_comanda = comandes.insert().values(
            id=new_id,
            member_id=comanda_data.member_id,
            c_date=comanda_data.c_date,
            c_time=comanda_data.c_time,
            total_price=comanda_data.total_price,
            payment_method=comanda_data.payment_method,
        )
        await db.execute(query_insert_comanda)

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

        for item in quantitat_data.items:
            aliments = await get_aliments_by_producte(db,item.id_item)
            for aliment in aliments:
                new_stock = aliment["stock"] - aliment["quantity"] * item.quantity
                await update_aliment_stock(db,aliment["name"],aliment["brand"],new_stock)

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

async def get_summary_today(db: Database):
    today = date.today()

    join_stmt = comandes.outerjoin(clients, comandes.c.member_id == clients.c.member_id)

    summary_query = (
        select(
            func.sum(comandes.c.total_price).label("total_revenue"),
            func.count(comandes.c.id).label("total_comandes"),
            func.count(func.distinct(comandes.c.member_id)).label("registered_members"),

            func.count(
                distinct(
                    case(
                        (clients.c.is_student.is_(True), clients.c.member_id),
                        else_=None
                    )
                )
            ).label("total_students"),

            func.count(
                distinct(
                    case(
                        (clients.c.is_student.is_(False), clients.c.member_id),
                        else_=None
                    )
                )
            ).label("total_professors"),

            func.count(
                case(
                    (comandes.c.member_id.is_(None),comandes.c.id),
                    else_=None
                )
            ).label("total_unspecified")
        )
        .select_from(join_stmt)
        .where(comandes.c.c_date == today)
    )    
    result = await db.fetch_one(summary_query)

    if result is None:
        return {
            "total_revenue": 0,
            "total_comandes": 0,
            "registered_members": 0,
            "total_students": 0,
            "total_professors": 0,
            "total_unspecified": 0,
        }

    return {
        "total_revenue": result["total_revenue"] or 0,
        "total_comandes": result["total_comandes"] or 0,
        "registered_members": result["registered_members"] or 0,
        "total_students": result["total_students"] or 0,
        "total_professors": result["total_professors"] or 0,
        "total_unspecified": result["total_unspecified"] or 0,
    }

