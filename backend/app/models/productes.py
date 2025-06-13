import sqlalchemy
from ..database import metadata

productes = sqlalchemy.Table(
    "productes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.BigInteger, sqlalchemy.ForeignKey("practica.items.id", ondelete="CASCADE"), primary_key=True, nullable=False),
    sqlalchemy.Column("name", sqlalchemy.String(200), nullable=False),
    sqlalchemy.Column("barcode", sqlalchemy.BigInteger, nullable=False, unique=True),
)
