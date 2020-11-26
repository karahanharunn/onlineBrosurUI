import React, {useEffect} from 'react';

export default function useSelect() {
  const [selected, setSelected] = React.useState(null);
  const [key, setKey] = React.useState(null);
 console.log(key)
  const changeValue = (item) => {
    setSelected(item.name);
    setKey(item.key);
  };

  return [selected, changeValue, key];
}
