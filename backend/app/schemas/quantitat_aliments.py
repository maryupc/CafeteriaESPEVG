from pydantic import BaseModel, conint
from typing import Annotated, List

PositiveInt = Annotated[int, conint(gt=0)]

class QuantitatAlimentBase(BaseModel):
    name: str
    brand: str
    quantity: PositiveInt

class QuantitatAlimentCreateList(BaseModel):
    aliments: List[QuantitatAlimentBase]

class QuantitatAlimentUpdate(BaseModel):
    quantity: PositiveInt

