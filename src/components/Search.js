import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {default as Delete} from './icons/Delete';
import {SEARCH_BACKGROUND, SEARCH_TEXT} from '../styles/colors';

export default function Search({
  style,
  left,
  right,
  setSearchText,
  placeholder,
  setText,
  text,
  onChangeText,
  ...rest
}) {

  const textInputReference = useRef(null);
  useEffect(() => {
    textInputReference.current.focus();
    return () => {
      textInputReference.current.clear();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View {...rest} style={[styles.searchSection, style]}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {left}
          <TextInput
            ref={textInputReference}
            style={[styles.input]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!!text && (
            <TouchableHighlight
              style={{marginRight: 12}}
              onPress={() => setText(null)}>
              <Delete
                width={20}
                height={20}
                color={SEARCH_TEXT}
                fill={SEARCH_TEXT}
              />
            </TouchableHighlight>
          )}
          {right}
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingRight: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 0.4,
  },
  input: {
    color: SEARCH_TEXT,
    paddingLeft: 6,
  },
  container: {
    flex: 1,
  },
});
