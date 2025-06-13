from pydantic import BaseModel, condecimal, constr
from typing import Optional, Annotated
from decimal import Decimal

ConstrainedStr100 = Annotated[str, constr(max_length=100)]
ConstrainedDecimal = Annotated[Decimal, condecimal(max_digits=6, decimal_places=2)]

class AlimentBase(BaseModel):
    name: ConstrainedStr100
    brand: ConstrainedStr100
    nutrition_info: Optional[str] = None
    price: Optional[ConstrainedDecimal] = None
    stock: Optional[int] = None

class AlimentWithQuantity(AlimentBase):
    quantity: int

class AlimentCreate(AlimentBase):
    pass

class AlimentUpdate(BaseModel):
    nutrition_info: Optional[str] = None
    price: Optional[ConstrainedDecimal] = None
    stock: Optional[int] = None

class Aliment(AlimentBase):
    class Config:
        orm_mode = True
