import {
  _id,
  _idusuari,
  _price,
  _times,
  _hours,
  _preu,
  _boolean,
  _tipus,
  _taskNames,
  _postTitles,
  _description,
  _alimentNames,
} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  tipus: _tipus(index),
  preu: _preu(index),
}));

export type ItemProps = {
  id: string;
  price: number;
  type: string;
  name: string | null;
};

export async function fetchItemsFromAPI(): Promise<ItemProps[]> {
  try {
    const response = await fetch('http://localhost:8000/items/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos crudos de la API:', data);

    // Convertimos id a string para que coincida con ItemProps
    const formattedData: ItemProps[] = data.map((item: any) => ({
      id: item.id.toString(),
      price: item.price,
      type: item.type,
      name: item.name,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error al obtener items:', error);
    return [];
  }
}

export type ComandaProps = {
  id: string;
  id_usuari: string;
  date: string;
  time: string;
  preu_total: number;
  tipus_pagament: string;
};

export async function fetchComandesFromAPI(): Promise<ComandaProps[]> {
  try {
    const response = await fetch('http://localhost:8000/comandes/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos crudos de la API:', JSON.stringify(data, null, 2));

    const formattedData: ComandaProps[] = data.map((comanda: any) => ({
      id: comanda.id.toString(),
      id_usuari: comanda.member_id !== null ? comanda.member_id.toString() : "Anònim",
      date: comanda.c_date,
      time: comanda.c_time,
      preu_total: comanda.total_price,
      tipus_pagament: comanda.payment_method,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error al obtener items:', error);
    return [];
  }
}


export const _comandes = [...Array(24)].map((_, index) => {
  const tipus = _tipus(index);
  return {
    id: _id(index),
    id_usuari: _idusuari(index),
    date: _times(index),
    time: _hours(index),
    preu_total: _price(index),
    tipus_pagament: "targeta",    
  };
});


export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  let quantitat = 0;
  if ([1, 3, 5].includes(setIndex)) quantitat = 10;
  else if ([4, 8, 12].includes(setIndex)) quantitat = 5;

  return {
    name: _alimentNames(index),
    brand: _alimentNames(index),
    nutrition_info: _description(index),
    price: _price(index),
    Quantitat: quantitat,// 5 unidades
    stock:
      ([1, 3, 5].includes(setIndex) && 10) ||  // por ejemplo, 10 unidades en stock
      ([4, 8, 12].includes(setIndex) && 5) ||  // 5 unidades
      null, 
  };
});



// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _tipus(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];



// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

export const _traffic = [
  {
    value: 'facebook',
    label: 'Facebook',
    total: 19500,
  },
  {
    value: 'google',
    label: 'Google',
    total: 91200,
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: 69800,
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: 84900,
  },
];

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _tipus(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];
