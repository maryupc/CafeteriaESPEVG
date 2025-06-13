import { useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export type ProductItemProps = {
  name: string;
  brand: string;
  nutrition_info: string;
  price: number;
  Quantitat: number;
  stock: number | null;
};

  


export function ProductItem({
  product,
  id,
}: {
  product: ProductItemProps;
  id: string;
}) {
const [quantityStr, setQuantity] = useState(String(product.Quantitat));

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  // Permitir vacío o solo números enteros
  if (val === '' || /^[0-9]+$/.test(val)) {
    setQuantity(val);
  }
};

const updateQuantitat = async (id: number, name: string, brand: string, quantity: number) => {
  try {
    const encodedBrand = encodeURIComponent(brand); // necesario por los espacios

    const res = await fetch(
      `http://127.0.0.1:8000/quantitat_aliments/${id}/${name}/${encodedBrand}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      }
    );

    if (!res.ok) throw new Error('Error al actualizar cantidad');

    const result = await res.json();
    console.log('Actualizado correctamente:', result);
    alert('Cantidad modificada correctamente');
  } catch (err) {
    console.error(err);
    alert('Error al modificar cantidad');
  }
};


  const renderPrice = (
    <Typography variant="subtitle1">
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

    return (
      <Card sx={{ maxWidth: 300 }}>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" noWrap>
            {product.name}
          </Typography>

          {product.nutrition_info && (
            <Typography variant="body2" color="text.secondary">
              {product.nutrition_info}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock ?? 'Sense estoc'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Es necessita: </Typography>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={quantityStr}
                      inputProps={{ min: 0 }}
                      onChange={handleChange}
                      sx={{ width: 100 }}
                    />
              </Box>
            
              <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() =>
                updateQuantitat(Number(id), product.name, product.brand, Number(quantityStr))
              }
              >
              Modificar Quantitat
            </Button>
          </Box>
        </Stack>
      </Card>
    );
}
