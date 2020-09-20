import React from 'react';
import {default as Home} from './Home';
import {default as List} from './List';
import {default as Love} from './Love';
import {default as Search} from './Search';
import {default as User} from './User';
import {default as HomeBack} from './HomeBack';
import {default as ListWithBack} from './ListWithBack';
import {default as LoveWithBack} from './LoveWithBack';
import {default as UserWithBack} from './UserWithBack';
export default function Index(props) {
  let {id, color, size, active} = props;

  switch (id) {
    case 'Home': {
      return active ? (
        <Home stroke={color} width={size} height={size} />
      ) : (
        <HomeBack fill={color} width={size} height={size} />
      );
    }
    case 'Menu':
      return active ? (
        <List fill={color} width={size} height={size} />
      ) : (
        <ListWithBack fill={color} width={size} height={size} />
      );
    case 'List':
      return active ? (
        <Love fill={color} width={size} height={size} />
      ) : (
        <LoveWithBack fill={color} width={size} height={size} />
      );
    case 'Settings':
      return active ? (
        <User fill={color} width={size} height={size} />
      ) : (
        <UserWithBack fill={color} width={size} height={size} />
      );
    case 'Search':
      return <Search stroke={color} width={size} height={size} />;
  }
}
