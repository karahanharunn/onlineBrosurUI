import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Index from './icons/index';
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
          <TouchableOpacity
            style={[styles.button, isFocused && styles.buttonOrange]}
            onPress={onPress}>
            <Index
              id={icon}
              color={isFocused ? 'white' : '#afafaf'}
              size={isFocused ? 26 : 20}
            />
          
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
    padding: 10,
    fontSize: 14,
  },
  buttonOrange: {backgroundColor: 'orange', borderRadius: 50},

  view: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 0.1,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 1,
  },
  viewSub: {
    backgroundColor: 'orange',
    width: 3,
    height: 3,
    borderRadius: 50,
  },
  white: {
    backgroundColor: 'white',
  },
});
