import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Index from './icons';
import {default as Delete} from './icons/Delete';

export default function Search() {
  const [text, onChangeText] = React.useState();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.searchSection}>
      <Index id="Search" color="orange" size="20" />
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        onChangeText={(text) => onChangeText(text)}
        value={text}
        onSubmitEditing={Keyboard.dismiss}
      />
      {text && (
        <TouchableHighlight onPress={() => onChangeText()}>
          <Delete />
        </TouchableHighlight>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
