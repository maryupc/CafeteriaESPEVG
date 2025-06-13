from pydantic import BaseModel
from typing import List, Optional
from datetime import date, time
from decimal import Decimal

class ItemQuantity(BaseModel):
    id_item: int
    quantity: int

class QuantitatItemsBase(BaseModel):
    id_comanda: int
    c_date: date

class QuantitatItemsCreate(QuantitatItemsBase):
    items: List[ItemQuantity]

class ComandaWithItemsCreate(BaseModel):
    member_id: Optional[int] = None
    c_date: date
    c_time: time
    total_price: Decimal
    payment_method: str
    items: List[ItemQuantity]

class QuantitatItemUpdate(BaseModel):
    quantity: int

class QuantitatItemRead(QuantitatItemsBase, ItemQuantity):
    pass

    class Config:
        orm_mode = True

