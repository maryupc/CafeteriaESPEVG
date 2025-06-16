import sqlalchemy
from app.database import metadata

menu_producte = sqlalchemy.Table(
    "menu_producte",
    metadata,
    sqlalchemy.Column("id_menú", sqlalchemy.BigInteger, nullable=False),
    sqlalchemy.Column("id_producte", sqlalchemy.BigInteger, nullable=False),
    sqlalchemy.ForeignKeyConstraint(["id_menú"], ["menus.id"], onupdate="CASCADE", ondelete="CASCADE"),
    sqlalchemy.ForeignKeyConstraint(["id_producte"], ["productes.id"], onupdate="CASCADE", ondelete="CASCADE"),
    sqlalchemy.PrimaryKeyConstraint("id_menú", "id_producte", name="menu_producte_pkey")
)
