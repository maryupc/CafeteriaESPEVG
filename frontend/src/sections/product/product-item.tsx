import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export type ProductItemProps = {
  name: string;
  brand: string;
  price: number;
  nutrition_info: string;
  coverUrl: string;
  Quantitat: number;
  stock: number | null;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  // const renderStatus = (
  //   <Label
  //   >
      
  //   </Label>
  // );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
          {product.stock}
        </Link>

        <Typography variant="body2" color="text.secondary">
        Stock: {product.stock ?? 'Sense estoc'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Es necessita: {product.Quantitat}
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
}
