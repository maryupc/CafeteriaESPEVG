from fastapi import APIRouter, HTTPException
from typing import List

from ..database import database
from app.schemas.aliments import AlimentWithQuantity
from app.crud.quantitat_aliments import get_aliments_by_producte

router = APIRouter()

@router.get("/{producte_id}", response_model=List[AlimentWithQuantity])
async def read_aliments_by_producte(producte_id: int):
    aliments = await get_aliments_by_producte(database, producte_id)
    if not aliments:
        raise HTTPException(status_code=404, detail="No aliments found for this producte")
    return aliments

