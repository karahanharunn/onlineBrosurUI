
import React from 'react';
const {default: HomeStackScreen} = require('./views/HomePage');
const {default: Menu} = require('./views/Menu');
const {default: List} = require('./views/List');
const {default: MyAccount} = require('./views/MyAccount');

export const tab = [
  {
    name: 'Anasayfa',
    component: HomeStackScreen,
    options: {
      tabBarIcon: 'Home',
      tabBarLabel: 'Anasayfa',
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
