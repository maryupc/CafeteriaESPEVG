from fastapi import APIRouter
from typing import List
from app.database import database
from app.crud.items import get_all_items_with_type_and_name  # adjust import path
from app.schemas.items import ItemWithTypeName  # you can define a schema for the response

router = APIRouter()

@router.get("/", response_model=List[ItemWithTypeName])
async def read_all_items():
    return await get_all_items_with_type_and_name(database)
