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
export {default as About} from './About';
export {default as Back} from './Back';
export {default as Bottom} from './Bottom';
export {default as Chevron} from './Chevron';
export {default as ChevronLeft} from './ChevronLeft';
export {default as ChevronRight} from './ChevronRight';
export {default as Close} from './Close';
export {default as Delete} from './Delete';
export {default as DotsVertical} from './DotsVertical';
export {default as Facebook} from './Facebook';
export {default as Favori} from './Favori';
export {default as Home} from './Home';
export {default as HomeBack} from './HomeBack';
export {default as Information} from './Information';
export {default as Instagram} from './Instagram';
export {default as List} from './List';
export {default as ListWithBack} from './ListWithBack';
export {default as Location} from './Location';
export {default as Login} from './Login';
export {default as Love} from './Love';
export {default as LoveWithBack} from './LoveWithBack';
export {default as New} from './New';
export {default as Open} from './Open';
export {default as Paging} from './Paging';
export {default as Previous} from './Previous';
export {default as Right} from './Right';
export {default as Search} from './Search';
export {default as Settings} from './Settings';
export {default as Share} from './Share';
export {default as Twitter} from './Twitter';
export {default as User} from './User';
export {default as UserWithBack} from './UserWithBack';
export {default as Whatsapp} from './Whatsapp';
