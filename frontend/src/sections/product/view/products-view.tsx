import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fetchProducts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';

import type { ProductItemProps } from '../product-item';

// ----------------------------------------------------------------------

export type ItemProps = {
  id: string;
  price: number;
  type: string;
  name: string | null;
};

export function ProductsView() {

  const location = useLocation();

  const producte = location.state;

  const [price, setPrice] = useState(producte.price.toString());
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value) || 0);
  };
    

  const handleUpdatePrice = async () => {
    try {
      const response = await fetch(`http://localhost:8000/items/${producte.id}/update_price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: parseFloat(price) }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Precio actualizado:', data);
      alert('Precio actualizado');
    } catch (error) {
      console.error('Error al actualizar el precio:', error);
      // Muestra un mensaje de error si lo deseas
    }
  };


  useEffect(() => {
      const loadComandes = async () => {
      const data = await fetchProducts(producte.id);
        setProducts(data);
        setLoading(false);
      };
  
      loadComandes();
    }, []);


  if (!producte) {
    return <Typography variant="h6">No s’ha seleccionat cap producte.</Typography>;
  }



  return (
    <DashboardContent>

    <Typography variant="h4" sx={{ mb: 3 }}>
      Producte seleccionat: {producte.name ?? producte.id}
    </Typography>

    <Box
      sx={{
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap', // permite que en pantallas pequeñas se adapte
        justifyContent: 'space-between',
      }}
    >
        <Typography variant="h6">
        Aquest producte conté els següents aliments:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">Preu producte:</Typography>
        <TextField
          type="number"  // 🔹 Solo números
          variant="outlined"
          inputProps={{ step: "0.01" }}
          size="small"
          value={price}
          onChange={(e) => setPrice(e.target.value)}  // 🔸 Sigue siendo string
          sx={{ width: 100 }}
        />
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleUpdatePrice}
        >
          Modificar preu producte
        </Button>
      </Box>

    </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} id={producte.id}/>
          </Grid>
        ))}
      </Grid>

    </DashboardContent>
  );
}
