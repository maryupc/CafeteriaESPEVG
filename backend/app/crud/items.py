import sqlalchemy
from app.models.items import items
from app.models.productes import productes

async def get_all_items_with_type_and_name(db):
    query = (
        sqlalchemy.select(
            items.c.id,
            items.c.price,
            sqlalchemy.case(
                (productes.c.name.isnot(None), "producte"),
                else_="menu"
            ).label("type"),
            productes.c.name,
        )
        .select_from(items.outerjoin(productes, items.c.id == productes.c.id))
    )
    rows = await db.fetch_all(query)
    return [dict(row) for row in rows]

