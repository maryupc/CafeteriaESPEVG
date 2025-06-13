from pydantic import BaseModel
from typing import List
from datetime import date

class ItemQuantity(BaseModel):
    id_item: int
    quantity: int

class QuantitatItemsBase(BaseModel):
    id_comanda: int
    c_date: date

class QuantitatItemsCreate(QuantitatItemsBase):
    items: List[ItemQuantity]

class QuantitatItemUpdate(BaseModel):
    quantity: int

class QuantitatItemRead(QuantitatItemsBase, ItemQuantity):
    pass

    class Config:
        orm_mode = True

