import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
import {HeaderBackButton} from '@react-navigation/stack';
function HomePage() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Page</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {alignSelf: 'center', marginRight: '10%'},
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              style={{width:15 , height:15}}
              {...props}
              onPress={() => {
                // Do something
              }}
            />
          ),
        }}
      />
      <HomeStack.Screen name="Category" component={CategoryDetail} />
      <HomeStack.Screen name="Brand" component={BrandDetail} />
    </HomeStack.Navigator>
  );
}
