const {default: HomeStackScreen} = require('./views/HomePage');
const {default: Menu} = require('./views/Menu');
const {default: List} = require('./views/List');
const {default: MyAccount} = require('./views/MyAccount');

export const tab = [
  {name: 'Anasayfa', component: HomeStackScreen},
  {name: 'Menü', component: Menu},
  {name: 'Listem', component: List},
  {name: 'Hesabım', component: MyAccount},
];
