import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fetchProducts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

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

  const [price, setPrice] = useState(producte?.price ?? 0);
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value) || 0);
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Preu producte:</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={producte.price}
          onChange={(e) => setPrice(e.target.value)} // necesitas un estado para esto
          sx={{ width: 100 }}
        />
      </Box>

      <Typography variant="h6">
        Aquest producte conté els següents aliments:
      </Typography>
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
