import React from 'react';
import Menu from './scenes/Menu';
import List from './scenes/List';
import MyAccount from './scenes/MyAccount';
import HomeStackScreen from './scenes/HomePage';

export const tab = [
  {
    name: 'Anasayfa',
    component: HomeStackScreen,
    options: {
      tabBarIcon: 'Home',
      tabBarLabel: 'Anasayfa',
      // tabBarVisible: false,
    },
  },
  {
    name: 'Menü',
    component: Menu,
    options: {
      tabBarIcon: 'Menu',
      tabBarLabel: 'Menü',
    },
  },
  {
    name: 'Listem',
    component: List,
    options: {
      tabBarIcon: 'List',
      tabBarLabel: 'Listem',
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
