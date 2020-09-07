import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
function HomePage() {
  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="Category" component={CategoryDetail} />
      <HomeStack.Screen name="Brand" component={BrandDetail} />
    </HomeStack.Navigator>
  );
}
