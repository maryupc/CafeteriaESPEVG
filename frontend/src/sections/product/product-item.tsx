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
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2">Es necessita: {product.Quantitat}</Typography>
            <Typography variant="h6">{renderPrice}</Typography>
          </Box>
        </Stack>
      </Card>
    );
}
