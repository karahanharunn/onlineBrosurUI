import React from 'react';
import Menu from './scenes/Menu';
import List from './scenes/List';
import MyAccount from './scenes/MyAccount';
import HomeTabsScreen from './scenes/HomePage';

export const tab = [
  {
    name: 'Anasayfa',
    component: HomeTabsScreen,
    options: {
      tabBarIcon: 'Home',
      tabBarLabel: 'Anasayfa',
      // tabBarVisible: false,
    },
  },
  {
    name: 'Menü',
    component: List,

    options: {
      tabBarIcon: 'Menu',
      tabBarLabel: 'Listem',
    },
  },
  {
    name: 'Listem',
    component: Menu,
    options: {
      tabBarIcon: 'List',
      tabBarLabel: 'Favoriler',
    },
  },
  {
    name: 'Hesabım',
    component: MyAccount,
    options: {
      tabBarIcon: 'Settings',
      tabBarLabel: 'Hesabım',
    },
  },
];
export const Tabs = [
  {name: 'Tüm Sonuçlar', id: 1, ref: React.createRef(), tab: 'all'},
  {
    name: 'Markalar',
    tab: 'brands',
    id: 3,
    ref: React.createRef(),
  },
  {name: 'Broşürler', tab: 'brochures', id: 2, ref: React.createRef()},
];