import sqlalchemy
from ..database import metadata

clients = sqlalchemy.Table(
    "clients",
    metadata,
    sqlalchemy.Column("member_id", sqlalchemy.BigInteger, primary_key=True),
    sqlalchemy.Column("is_student", sqlalchemy.Boolean, nullable=False, server_default=sqlalchemy.sql.expression.true()),
)

