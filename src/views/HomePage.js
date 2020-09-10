import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
import {HeaderBackButton} from '@react-navigation/stack';
import Search from '../components/Search';
import Card from '../components/Card';
import SvgDelete from '../components/icons/Delete';
import {default as Chevron} from '../components/icons/Chevron';
import ButtonGroup from '../components/Button';
import Progress from '../components/Progress';
import Info from '../components/info';
import ImageComponent from '../components/Image';
const data = [
  {name: 'Fast Food', icon: <Chevron />, count: '136 Places'},
  {name: 'Fast Food2', icon: <SvgDelete />, count: '256 Places'},
  {name: 'Fast Food3', icon: <SvgDelete />, count: '10 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
  {name: 'Fast Food4', icon: <SvgDelete />, count: '248 Places'},
];
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
function HomePage() {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Search />
      <Info title="Popüler Markalar" category="h1" buttonName="Show All" />
      <View style={styles.listView}>
        <Card data={data} />
      </View>
      <ButtonGroup />
      <Progress />
      <Info title="Kategoriler" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent data={Images} />
      </View>
    </View>
  );
}

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          marginRight: '10%',
          fontSize: 12,
        },
      }}>
      <HomeStack.Screen
        name="Bakery(36 places)"
        component={HomePage}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              style={{width: 15, height: 15}}
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
const styles = StyleSheet.create({
  listView: {
    display: 'flex',
    width: '100%',
  },
});
