import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { ProductItem } from '../product-item';

import type { ProductItemProps } from '../product-item';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

export type ItemProps = {
  id: string;
  price: number;
  type: string;
  name: string | null;
};

export function ProductsView() {

  const location = useLocation();
  const name = location.state?.name;

  const producte = location.state;

  const [price, setPrice] = useState(producte?.price ?? 0);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value) || 0);
  };

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
        {_products.map((product) => (
          <Grid key={product.name} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>

    </DashboardContent>
  );
}
