import sqlalchemy
from ..database import metadata

items = sqlalchemy.Table(
    "items",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, nullable=False),
    sqlalchemy.Column("price", sqlalchemy.Numeric(8, 2), nullable=False),
)
