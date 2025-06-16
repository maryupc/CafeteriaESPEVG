from app.models.productes import productes
from app.models.menu_producte import menu_producte
from app.models.quantitat_aliments import quantitat_aliments
from app.models.aliments import aliment
from databases import Database
from sqlalchemy import select

async def get_productes_by_menu(db: Database, id_menu: int):
    query = (
        select(productes)
        .select_from(menu_producte.join(productes, menu_producte.c.id_producte == productes.c.id))
        .where(menu_producte.c.id_menú == id_menu)
    )
    return await db.fetch_all(query)

async def get_aliments_by_menu(db: Database, id_menu: int):
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
            menu_producte
            .join(productes, menu_producte.c.id_producte == productes.c.id)
            .join(quantitat_aliments, quantitat_aliments.c.id_producte == productes.c.id)
            .join(
                aliment,
                (quantitat_aliments.c.name == aliment.c.name) &
                (quantitat_aliments.c.brand == aliment.c.brand)
            )
        )
        .where(menu_producte.c.id_menú == id_menu)
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]
