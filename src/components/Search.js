import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {default as Delete} from './icons/Delete';
import {SEARCH_BACKGROUND, SEARCH_TEXT} from '../styles/colors';

export default function Search({style, left, right, placeholder, ...rest}) {
  const [text, setText] = React.useState();
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
    <View {...rest} style={[styles.searchSection, style]}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {left}
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          onChangeText={(e) => setText(e)}
          value={text}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      {text ? (
        <TouchableHighlight onPress={(e) => setText(null)}>
          <Delete
            width={16}
            height={16}
            color={SEARCH_TEXT}
            fill={SEARCH_TEXT}
          />
        </TouchableHighlight>
      ) : (
        right
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: SEARCH_BACKGROUND,
    borderRadius: 36,
    paddingHorizontal: 12,
    flex: 1,
  },
  input: {
    color: SEARCH_TEXT,
  },
});
