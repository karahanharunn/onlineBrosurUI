import React from 'react';
import {Easing, View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
import {HeaderBackButton} from '@react-navigation/stack';
import Search from '../components/Search';
import Card from '../components/Card';
import ButtonGroup from '../components/Button';
import Progress from '../components/Progress';
import Info from '../components/info';
import ImageComponent from '../components/Image';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {useSelector} from 'react-redux';

const Images = [
  {
    imageUrl:
      'https://i12.haber7.net//haber/haber7/photos/2020/34/bim_25_28_agustos_aktuel_katalogu_trambolin_kamp_sandalyesi_televizyon_mutfak_urunlerinde_1598014931_7541.JPG',
    name: 'Fast Food',
    minute: 10,
    count: '136 Places',
  },
  {
    imageUrl:
      'https://i12.haber7.net//haber/haber7/photos/2020/34/bim_25_28_agustos_aktuel_katalogu_trambolin_kamp_sandalyesi_televizyon_mutfak_urunlerinde_1598014931_7541.JPG',
    name: 'Fast Food2',
    minute: 25,
    count: '256 Places',
  },
  {
    imageUrl:
      'https://i12.haber7.net//haber/haber7/photos/2020/34/bim_25_28_agustos_aktuel_katalogu_trambolin_kamp_sandalyesi_televizyon_mutfak_urunlerinde_1598014931_7541.JPG',
    name: 'Fast Food3',
    minute: 30,
    count: '10 Places',
  },
  {
    imageUrl:
      'https://i12.haber7.net//haber/haber7/photos/2020/34/bim_25_28_agustos_aktuel_katalogu_trambolin_kamp_sandalyesi_televizyon_mutfak_urunlerinde_1598014931_7541.JPG',
    name: 'Fast Food4',
    minute: 40,
    count: '248 Places',
  },
];
function HomePage(props) {
  const state = useSelector((state) => state.title);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Search />
      <Info title="Popüler Markalar" category="h1" buttonName="Show All" />
      <View style={styles.listView}>
        <Card {...props} />
      </View>
      <ButtonGroup />
      <Progress />
      <Info title="Kategoriler" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent {...props} data={Images} />
      </View>
      <Info title="Çok Satanlar" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent {...props} data={Images} />
      </View>
    </View>
  );
}
const HomeStack = createSharedElementStackNavigator();

export default function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator
      initialRouteName="Anasayfa"
      headerMode="none"
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 12,
        },
      }}>
      <HomeStack.Screen name="Anasayfa" component={HomePage} />
      <HomeStack.Screen
        name="Category"
        component={CategoryDetail}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const {data} = route.params;
          return data.map((item) => `item ${item.id} icon`);
        }}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 500, easing: Easing.inOut(Easing.ease)},
            },
            close: {
              animation: 'timing',
              config: {duration: 500, easing: Easing.inOut(Easing.ease)},
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
          headerLeft: (props) => (
            <HeaderBackButton
              style={{width: 15, height: 15}}
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <HomeStack.Screen name="Brand" component={BrandDetail} />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  listView: {
    display: 'flex',
    width: '100%',
    flex: 1,
  },
});
