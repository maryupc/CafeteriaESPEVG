from fastapi import APIRouter, HTTPException, status
from app.database import database
from app.crud.productes import delete_producte

router = APIRouter()

@router.delete("/{producte_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_producte(producte_id: int):
    rows_deleted = await delete_producte(database, producte_id)
    if rows_deleted == 0:
        raise HTTPException(status_code=404, detail="Producte not found")
    return {"message": f"Producte with ID {producte_id} has been deleted successfully."}

