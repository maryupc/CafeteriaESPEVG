from pydantic import BaseModel, conint
from typing import Annotated, List

ConstrainedInt = Annotated[int, conint(ge=0)]

class QuantitatAlimentBase(BaseModel):
    name: str
    brand: str
    quantity: ConstrainedInt

class QuantitatAlimentCreateList(BaseModel):
    aliments: List[QuantitatAlimentBase]

class QuantitatAlimentUpdate(BaseModel):
    quantity: ConstrainedInt

