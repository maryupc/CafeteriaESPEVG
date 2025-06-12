from typing import List, Optional
from databases import Database
from app.models.comandes import comandes
from app.schemas.comandes import ComandaCreate, ComandaUpdate
from datetime import date

async def get_comandes(db: Database) -> List[dict]:
    query = comandes.select().order_by(comandes.c.c_date.desc())
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

async def create_comanda(db: Database, comanda: ComandaCreate) -> None:
    query = comandes.insert().values(
        id=comanda.id,
        c_date=comanda.c_date,
        c_time=comanda.c_time,
        total_price=comanda.total_price,
        payment_method=comanda.payment_method,
        member_id=comanda.member_id,
    )
    await db.execute(query)

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

