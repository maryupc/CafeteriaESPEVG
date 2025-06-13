import sqlalchemy
from ..database import metadata

menus = sqlalchemy.Table(
    "menus",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, nullable=False),
    sqlalchemy.PrimaryKeyConstraint("id", name="menus_pkey"),
    sqlalchemy.ForeignKeyConstraint(
        ["id"], ["items.id"], ondelete="CASCADE"
    ),
)

