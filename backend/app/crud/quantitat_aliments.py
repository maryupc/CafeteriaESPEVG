from sqlalchemy import select
from databases import Database

from app.models.aliments import aliment
from app.models.quantitat_aliments import quantitat_aliments

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
    return await db.fetch_all(query)

