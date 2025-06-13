import sqlalchemy
from ..database import metadata

quantitatitems = sqlalchemy.Table(
    "quantitatitems",
    metadata,
    sqlalchemy.Column("id_comanda", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("c_date", sqlalchemy.Date, nullable=False),
    sqlalchemy.Column("id_item", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("quantity", sqlalchemy.Integer, nullable=False),
    sqlalchemy.PrimaryKeyConstraint("id_comanda", "c_date", "id_item", name="quantitatitems_pkey"),
)

