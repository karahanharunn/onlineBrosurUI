import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  ScrollView,
} from 'react-native';

function Button({title, selected, changeValue}) {
  return (
    <TouchableHighlight
      onPress={() => {
        changeValue(title);
      }}
      style={[styles.button, selected === title && styles.selectedButton]}>
      <Text style={[styles.text, selected === title && styles.selectedText]}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}
export default function ButtonGroup() {
  const data = ['4.5 Üzeri', 'Yakınlarda', '30 Dakika', 'Beğenilenler'];
  const [selected, setSelected] = useState(data[0]);
  const changeValue = (title) => {
    setSelected(title);
  };
  return (
    <View style={styles.parent}>
      {data.map((item) => (
        <Button
          key={item}
          changeValue={changeValue}
          selected={selected}
          title={item}></Button>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: '7.5%',
    marginTop: 12,
  },
  text: {
    color: 'black',
    fontSize: 10,
  },
  selectedText: {
    color: 'white',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  button: {
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
