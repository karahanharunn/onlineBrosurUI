import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Index from './icons/index';
import TitleLight from './atoms/titles/TitleLight';
import {SCALE_10} from '../styles/spacing';
const Button = styled.TouchableOpacity``;
const BottomNavigator = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 14px;
`;
export default function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon = options.tabBarIcon;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={label} style={[styles.button]} onPress={onPress}>
            <Index
              id={icon}
              color={isFocused ? '#413B89' : 'black'}
              size={isFocused ? 24 : 20}
              active={!isFocused}
            />
            <TitleLight
              style={{
                fontSize: 13,
                color: isFocused ? '#413B89' : 'black',
                fontFamily: isFocused ? 'OpenSans-Bold' : 'OpenSans-Regular',
              }}>
              {label}
            </TitleLight>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCALE_10,
    fontSize: SCALE_10,
    backgroundColor: 'white',
  },
  buttonOrange: {backgroundColor: 'orange'},

  view: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 0.1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 1,
  },
  viewSub: {
    backgroundColor: 'orange',
    width: 3,
    height: 3,
  },
  white: {
    backgroundColor: 'white',
  },
});
