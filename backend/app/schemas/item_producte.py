from pydantic import BaseModel, condecimal, constr
from typing import Optional
from typing import Annotated
from decimal import Decimal

ConstrainedDecimal = Annotated[Decimal, condecimal(max_digits=8, decimal_places=2)]
ConstrainedStr200 = Annotated[str, constr(max_length=200)]

class ItemProducteBase(BaseModel):
    id: int
    price: ConstrainedDecimal
    name: ConstrainedStr200
    barcode: int

class ItemProducteCreate(ItemProducteBase):
    pass

class ItemProducteUpdate(BaseModel):
    name: Optional[ConstrainedStr200] = None
    price: Optional[ConstrainedDecimal] = None

class ItemProducte(ItemProducteBase):
    id: int

    class Config:
        orm_mode = True

