import sqlalchemy
from ..database import metadata

comandes = sqlalchemy.Table(
    "comandes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("c_date", sqlalchemy.Date, nullable=False),
    sqlalchemy.Column("c_time", sqlalchemy.Time, nullable=False),
    sqlalchemy.Column("total_price", sqlalchemy.Numeric(8, 2), nullable=False),
    sqlalchemy.Column("payment_method", sqlalchemy.String(20), nullable=False),
    sqlalchemy.Column("member_id", sqlalchemy.BigInteger, nullable=True),
    sqlalchemy.PrimaryKeyConstraint("id", "c_date", name="comandes_pkey"),
)

