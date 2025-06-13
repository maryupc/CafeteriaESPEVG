import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { _commanda } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';


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

export type ComandaProps = {
  id: string;
  tipus: string;
  preu: number;
};

const opciones = [
  { id: '001', label: "Artículo 1" },
  { id: '002', label: "Artículo 2" },
  { id: '003', label: "Artículo 3" },
  // etc.
];

export function CreateComanda() {
    const router = useRouter();
  const [value, setValue] = useState('Estudiant');
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<{ id: string; quantitat: string }[]>([
  { id: '', quantitat: '' },
]);
  // Este estado contiene el nombre que se mostrará en el input
  const [selectedName, setSelectedName] = useState('ID Estudiant');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // Cambiar el nombre mostrado en el input según el radio button
    if (newValue === 'Estudiant') setSelectedName('ID Estudiant');
    else if (newValue === 'Professor') setSelectedName('ID Professor o correu');
    else setSelectedName('Usuari Anònim');
  
    setItems([{ id: '', quantitat: '' }]); // reset items

  };

  const handleChangeItem = (index: number, field: 'id' | 'quantitat', newValue: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = newValue;
    setItems(updatedItems);
  };
    const handleAddItem = () => {
    setItems([...items, { id: '', quantitat: '' }]);
  };
    const handleSignIn = useCallback(() => {
        router.push('/');
    }, [router]);

  return (
    <DashboardContent>

      <Typography variant="h4" sx={{ mb: 5 }}>
        Crear Comanda
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6">Selecciona el tipus d&apos;usuari:</Typography>
      <RadioGroup row value={value} onChange={handleRoleChange}>
        <FormControlLabel value="Estudiant" control={<Radio />} label="Estudiant" />
        <FormControlLabel value="Professor" control={<Radio />} label="Professor" />
        <FormControlLabel value="Anònim" control={<Radio />} label="Anònim" />
      </RadioGroup>

        {/* Mostrar campo de nombre solo si NO es Anònim */}
        {value !== 'Anònim' && (
        <TextField
          label={selectedName}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ width: 300 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      )}


      {(value === 'Anònim' || (value !== 'Anònim' && inputValue.trim() !== '')) &&
        items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
            <Autocomplete
              options={opciones}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              value={opciones.find(opt => opt.id === item.id) || null}
              onChange={(event, newValue) => {
                handleChangeItem(index, 'id', newValue ? newValue.id : '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ID de l'article"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
            <TextField
              label="Quantitat"
              type="number"
              value={item.quantitat}
              onChange={(e) => handleChangeItem(index, 'quantitat', e.target.value)}
              sx={{ width: 300 }}
              inputProps={{ min: 1 }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
      ))}




      {(value === 'Anònim' || (value !== 'Anònim' && inputValue.trim() !== '')) && (
        <Button
          variant="contained"
          color="inherit"
          onClick={handleAddItem}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Més Items
        </Button>
      )}

      <Button variant="contained" onClick={handleSignIn}>
        Enviar comanda
      </Button>
    </Box>
  
    </DashboardContent>
  );
}
