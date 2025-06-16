from pydantic import BaseModel

class MenuBase(BaseModel):
    id: int

class MenuCreate(MenuBase):
    pass

class MenuUpdate(MenuBase):
    pass

class Menu(MenuBase):
    id: int

    class Config:
        orm_mode = True

