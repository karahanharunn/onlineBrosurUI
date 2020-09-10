import React from 'react';
import {default as Home} from './Home';
import {default as Menu} from './Menu';
import {default as Settings} from './Settings';
import {default as Bookmark} from './Bookmark';
import {default as Search} from './Search';
import {View, Text} from 'react-native';

export default function Index(props) {
  let {id, color, size} = props;

  switch (id) {
    case 'Home':
      return <Home color={color} size={size} />;
    case 'Menu':
      return <Menu color={color} size={size} />;
    case 'List':
      return <Bookmark color={color} size={size} />;
    case 'Settings':
      return <Settings color={color} size={size} />;
    case 'Search':
      return <Search color={color} size={size} />;
  }
}
