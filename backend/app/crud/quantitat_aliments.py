from sqlalchemy import select, update
from databases import Database
from typing import List
from fastapi import HTTPException
from app.models.aliments import aliment
from app.models.quantitat_aliments import quantitat_aliments
from app.schemas.quantitat_aliments import QuantitatAlimentBase

async def get_aliments_by_producte(db: Database, id_producte: int):
    query = (
        select(
            aliment.c.name,
            aliment.c.brand,
            aliment.c.nutrition_info,
            aliment.c.price,
            aliment.c.stock,
            quantitat_aliments.c.quantity,
        )
        .select_from(
            quantitat_aliments.join(
                aliment,
                onclause=(
                    (quantitat_aliments.c.name == aliment.c.name) &
                    (quantitat_aliments.c.brand == aliment.c.brand)
                )
            )
        )
        .where(quantitat_aliments.c.id_producte == id_producte)
    )
    rows= await db.fetch_all(query)
    return [dict(row) for row in rows]

async def update_quantitat_aliment(
    db: Database,
    id_producte: int,
    name: str,
    brand: str,
    quantity: int
):
    query = (
        update(quantitat_aliments)
        .where(
            quantitat_aliments.c.id_producte == id_producte,
            quantitat_aliments.c.name == name,
            quantitat_aliments.c.brand == brand
        )
        .values(quantity=quantity)
    )
    await db.execute(query)

async def insert_many_quantitat_aliments(
    db: Database, id_producte: int, aliments: List[QuantitatAlimentBase]
):
    values = [
        {
            "id_producte": id_producte,
            "name": aliment.name,
            "brand": aliment.brand,
            "quantity": aliment.quantity,
        }
        for aliment in aliments
    ]

    query = quantitat_aliments.insert()

    try:
        async with db.transaction():
            await db.execute_many(query=query, values=values)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Insertion failed: {str(e)}")
