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
import {GRAY_MEDIUM, LOGIN_BACKGROUND} from '../styles/colors';
import Input from './atoms/Input';

export default function Search({style, background = 'white'}) {
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
    <View style={[styles.searchSection, style]}>
      <Input
        style={[styles.input, {backgroundColor: background}]}
        placeholder="Search here..."
        value={text}
        onSubmitEditing={Keyboard.dismiss}
      />
      {text && (
        <TouchableHighlight onPress={() => onChangeText()}>
          <Delete />
        </TouchableHighlight>
      )}
      <Index id="Search" color={LOGIN_BACKGROUND} size="20" />
    </View>
  );
}
const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#424242',
  },
});
