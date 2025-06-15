from typing import List, Optional
from databases import Database
from app.models.clients import clients
from app.schemas.clients import ClientUpdate, ClientCreate

async def get_clients(db: Database) -> List[dict]:
    query = clients.select().order_by(clients.c.member_id)
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

async def get_client(db: Database, member_id: int) -> Optional[dict]:
    query = clients.select().where(clients.c.member_id == member_id)
    result = await db.fetch_one(query)
    return dict(result) if result else None

async def create_client(db: Database, client_data: ClientCreate) -> int:
    query = clients.insert().values(
        member_id=client_data.member_id,
        is_student=client_data.is_student
    )
    await db.execute(query)
    return client_data.member_id

async def update_client(db: Database, member_id: int, client_data: ClientUpdate) -> int:
    query = clients.update().where(clients.c.member_id == member_id).values(
        is_student=client_data.is_student
    )
    return await db.execute(query)

async def delete_client(db: Database, member_id: int) -> int:
    query = clients.delete().where(clients.c.member_id == member_id)
    return await db.execute(query)

