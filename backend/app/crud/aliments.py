from databases import Database
from app.models.aliments import aliment

async def update_aliment_stock(db: Database, name: str, brand: str, stock: int):
    query = (
        aliment.update()
        .where((aliment.c.name == name) & (aliment.c.brand == brand))
        .values(stock=stock)
        .returning(aliment)
    )
    result = await db.fetch_one(query)
    return result

