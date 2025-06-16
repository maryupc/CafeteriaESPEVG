from pydantic import BaseModel

class MenuProducteBase(BaseModel):
    id_menú: int
    id_producte: int

class MenuProducteCreate(MenuProducteBase):
    pass

class MenuProducte(MenuProducteBase):
    class Config:
        orm_mode = True

