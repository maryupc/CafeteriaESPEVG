from fastapi import APIRouter, HTTPException, status
from typing import List

from ..database import database
from app.schemas.aliments import AlimentWithQuantity
from app.schemas.quantitat_aliments import QuantitatAlimentUpdate, QuantitatAlimentCreateList
from app.crud.quantitat_aliments import get_aliments_by_producte,update_quantitat_aliment,insert_many_quantitat_aliments

router = APIRouter()

@router.get("/{producte_id}", response_model=List[AlimentWithQuantity])
async def read_aliments_by_producte(producte_id: int):
    aliments = await get_aliments_by_producte(database, producte_id)
    if not aliments:
        raise HTTPException(status_code=404, detail="No aliments found for this producte")
    return aliments

@router.put("/{id_producte}/{name}/{brand}", status_code=status.HTTP_200_OK)
async def update_aliment_quantity(
    id_producte: int,
    name: str,
    brand: str,
    update_data: QuantitatAlimentUpdate
):
    await update_quantitat_aliment(database, id_producte, name, brand, update_data.quantity)
    return {"message": "Quantity updated successfully"}

@router.post("/insert_many/{id_producte}", status_code=status.HTTP_201_CREATED)
async def insert_many_aliments(id_producte: int, data: QuantitatAlimentCreateList):
    await insert_many_quantitat_aliments(database, id_producte, data.aliments)
    return {"message": f"{len(data.aliments)} aliments inserted for producte {id_producte}."}

