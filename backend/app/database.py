import databases
import sqlalchemy
from .config import DATABASE_URL

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData(schema="practica")

engine = sqlalchemy.create_engine(DATABASE_URL.replace("+asyncpg", ""))

