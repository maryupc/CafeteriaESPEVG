from pydantic import BaseModel
from typing import Optional

class ClientBase(BaseModel):
    member_id: int
    is_student: Optional[bool] = True

class ClientCreate(ClientBase):
    pass

class ClientUpdate(ClientBase):
    pass

class Client(ClientBase):
    class Config:
        orm_mode = True

