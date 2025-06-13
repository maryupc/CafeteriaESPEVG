import { useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { fetchItemsFromAPI } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';


// ----------------------------------------------------------------------



export type ItemProps = {
  id: string;
  price: number;
  type: string;
  name: string | null;
};

export type ComandaItem = {
  id: string;       // ID del producto
  quantitat: number;
};

export type ComandaProps = {
  id_usuari: number | null;
  date: string;
  time: string;
  preu_total: number;
  tipus_pagament: string;
  items: ComandaItem[]; // <--- nuevo campo
};




export function CreateComanda() {
  const [itemsread, setItemsread] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItemsFromAPI();
      setItemsread(data);
      setLoading(false);
    };

    loadItems();
  }, []);

  const router = useRouter();
  const [value, setValue] = useState('Estudiant');
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<{ id: string; quantitat: number }[]>([
  { id: '', quantitat: 0 },
]);
  const [comandes, setComandes] = useState<ComandaProps[]>([]);
  const [metodePagament, setMetodePagament] = useState('cash'); // o 'targeta'
  // Este estado contiene el nombre que se mostrará en el input
  const [selectedName, setSelectedName] = useState('ID Estudiant');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // Cambiar el nombre mostrado en el input según el radio button
    if (newValue === 'Estudiant') setSelectedName('ID Estudiant');
    else if (newValue === 'Professor') setSelectedName('ID Professor o correu');
    else setSelectedName('Usuari Anònim');
  
    setItems([{ id: '', quantitat: 0 }]); // reset items

  };

const handleCreate = async () => {
  if (
    (value !== 'Anònim' && inputValue.trim() === '') ||
    items.length === 0 ||
    !metodePagament
  ) {
    alert('Falten dades per completar la comanda.');
    return;
  }

  const newComanda: ComandaProps = {
    id_usuari: value === 'Anònim' ? null : parseInt(inputValue),
    date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }), // HH:mm
    preu_total: total,
    tipus_pagament: metodePagament,
    items: [...items], // [{ id: '1', quantitat: 2 }]
  };

  try {
    const response = await fetch('http://localhost:8000/comandes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: newComanda.id_usuari,
        c_date: newComanda.date,
        c_time: newComanda.time,
        total_price: newComanda.preu_total,
        payment_method: newComanda.tipus_pagament,
        items: newComanda.items.map(item => ({
          id_item: parseInt(item.id),
          quantity: item.quantitat,
        })),
      })
    });

    if (!response.ok) {
      throw new Error('Error al enviar la comanda');
    }

    const result = await response.json();
    console.log('Comanda enviada correctament:', result);
    alert('Comanda enviada correctament!');

    // Guarda local
    setComandes((prev) => [...prev, newComanda]);

    // Limpiar campos
    setInputValue('');
    setItems([{ id: '', quantitat: 1 }]);
    setMetodePagament('');
  } catch (error) {
    console.error(error);
    alert('Hi ha hagut un error en enviar la comanda.');
  }
};


const handleChangeItem = (
  index: number,
  field: 'id' | 'quantitat',
  newValue: string
) => {
  const updatedItems = [...items];

  if (field === 'quantitat') {
    updatedItems[index].quantitat = Number(newValue);
  } else if (field === 'id') {
    updatedItems[index].id = newValue;
  }

  setItems(updatedItems);
};

    const handleAddItem = () => {
    setItems([...items, { id: '', quantitat: 0 }]);
  };
    const handleSignIn = useCallback(() => {
        router.push('/');
    }, [router]);

const total = items.reduce((acc, item) => {
  const selected = itemsread.find(opt => opt.id === item.id);
  if (!selected) return acc;
  return acc + selected.price * Number(item.quantitat);
}, 0);

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
              options={itemsread}
              getOptionLabel={(option) => option.name ?? option.id}
              sx={{ width: 300 }}
              value={itemsread.find(opt => opt.id === item.id) || null}
              onChange={(event, newValue) => {
                handleChangeItem(index, 'id', newValue ? newValue.id : '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ID o nom de l'article"
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <Typography variant="h6">
          Total: {total.toFixed(2)} €
        </Typography>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="metode-pagament-label">Mètode de pagament</InputLabel>
          <Select
            labelId="metode-pagament-label"
            id="metode-pagament"
            value={metodePagament}
            label="Mètode de pagament"
            onChange={(e) => setMetodePagament(e.target.value)}
          >
            <MenuItem value="cash">Efectiu</MenuItem>
            <MenuItem value="card">Targeta</MenuItem>
            <MenuItem value="mobile">Mòbil</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleCreate}>
        Efectuar comanda
      </Button>
      {comandes.map((c) => (
      <Box key={c.id_usuari} sx={{ mt: 2, p: 2, border: '1px solid #ccc' }}>
        <p><strong>ID Usuari:</strong> {c.id_usuari}</p>
        <p><strong>Data:</strong> {c.date} {c.time}</p>
        <p><strong>Total:</strong> {c.preu_total} €</p>
        <p><strong>Pagament:</strong> {c.tipus_pagament}</p>
        <p><strong>Items:</strong></p>
        <ul>
          {c.items.map((item, i) => (
            <li key={i}>ID: {item.id} | Quantitat: {item.quantitat}</li>
          ))}
        </ul>
         </Box>
         ))}

    </Box>

  
    </DashboardContent>
  );
}
