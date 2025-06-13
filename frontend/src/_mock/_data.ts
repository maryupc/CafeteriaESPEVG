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


export const _item = [...Array(24)].map((_, index) => {
  const tipus = _tipus(index);
  return {
    id: _id(index),
    tipus,
    name: tipus === "menu" ? null : _alimentNames(index),
    preu: _price(index),
  };
});

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
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
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
