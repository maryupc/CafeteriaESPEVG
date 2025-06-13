import sqlalchemy
from ..database import metadata

quantitat_aliments = sqlalchemy.Table(
    "quantitataliments",
    metadata,
    sqlalchemy.Column("id_producte", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("name", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("brand", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("quantity", sqlalchemy.Integer, nullable=True),
    sqlalchemy.PrimaryKeyConstraint("id_producte", "name", "brand", name="quantitataliments_pkey"),
)

