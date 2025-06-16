from pydantic import BaseModel
from typing import Optional

class ProducteBase(BaseModel):
    id: int
    name: str
    barcode: int

class ProducteCreate(ProducteBase):
    pass

class ProducteUpdate(BaseModel):
    name: Optional[str] = None
    barcode: Optional[int] = None

class Producte(ProducteBase):
    id: int

    class Config:
        orm_mode = True

