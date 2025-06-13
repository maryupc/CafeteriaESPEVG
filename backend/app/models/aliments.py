import sqlalchemy
from ..database import metadata

aliment = sqlalchemy.Table(
    "aliment",
    metadata,
    sqlalchemy.Column("name", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("brand", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("nutrition_info", sqlalchemy.Text, nullable=True),
    sqlalchemy.Column("price", sqlalchemy.Numeric(6, 2), nullable=True),
    sqlalchemy.Column("stock", sqlalchemy.Integer, nullable=True),
    sqlalchemy.PrimaryKeyConstraint("name", "brand", name="aliment_pkey"),
)
