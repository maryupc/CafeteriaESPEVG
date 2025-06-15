from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.clients import Client, ClientCreate, ClientUpdate
from app.crud.clients import get_clients, get_client, create_client, update_client, delete_client
from app.database import database

router = APIRouter()

@router.get("/", response_model=List[Client])
async def read_clients():
    return await get_clients(database)

@router.get("/{member_id}", response_model=Client)
async def read_client(member_id: int):
    client = await get_client(database, member_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("/", response_model=Client, status_code=status.HTTP_201_CREATED)
async def create_new_client(client: ClientCreate):
    await create_client(database, client)
    return client

@router.put("/{member_id}", response_model=Client)
async def update_existing_client(member_id: int, client: ClientUpdate):
    existing = await get_client(database, member_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Client not found")
    await update_client(database, member_id, client)
    return {**client.model_dump(), "member_id": member_id}

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_client(member_id: int):
    existing = await get_client(database, member_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Client not found")
    await delete_client(database, member_id)

