from pydantic import BaseModel, condecimal, constr
from typing import Optional, Annotated
from datetime import date, time
from decimal import Decimal

ConstrainedDecimal = Annotated[Decimal, condecimal(max_digits=8, decimal_places=2)]
ConstrainedStr = Annotated[str, constr(max_length=20)]

class ComandaBase(BaseModel):
    id: int
    member_id: Optional[int] = None
    c_date: date
    c_time: time
    total_price: ConstrainedDecimal
    payment_method: ConstrainedStr

class ComandaCreate(ComandaBase):
    pass

class ComandaUpdate(ComandaBase):
    pass

class Comanda(ComandaBase):
    id: int

    class Config:
        orm_mode = True

