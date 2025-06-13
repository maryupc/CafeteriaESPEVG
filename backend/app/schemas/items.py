from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class ItemWithTypeName(BaseModel):
    id: int
    price: Decimal
    type: str
    name: Optional[str] = None  # only for productes

    class Config:
        orm_mode = True

