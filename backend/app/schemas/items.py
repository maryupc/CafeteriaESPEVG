from pydantic import BaseModel
from typing import Optional
from decimal import Decimal


class ItemBase(BaseModel):
    id: int
    price: Decimal

class ItemWithTypeName(ItemBase):
    type: str
    name: Optional[str] = None

    class Config:
        orm_mode = True

class ItemUpdatePrice(BaseModel):
    price: Decimal
