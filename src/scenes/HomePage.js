import React, {useState, useEffect} from 'react';
import {Easing, View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/organisms/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
import {HeaderBackButton} from '@react-navigation/stack';
import Card from '../components/organisms/Card';
import ButtonGroup from '../components/Button';
import Progress from '../components/Progress';
import Info from '../components/info';
import ImageComponent from '../components/organisms/Image';
import SvgDotsVertical from '../components/icons/DotsVertical';
import {useSelector} from 'react-redux';
import {AppService} from '../services/AppService';
import {GRAY_LIGHT} from '../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgSearch from '../components/icons/Search';
import SvgLove from '../components/icons/Love';
const HomeStack = createStackNavigator();
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
  const [data, setData] = useState();
  const [brosure, setBrosure] = useState();
  useEffect(() => {
    (() => {
      AppService.getBrosure().then((response) => {
        setBrosure(response.data);
      });
      AppService.getBrands().then((response) => {
        setData(response.data);
      });
    })();
  }, []);
  const state = useSelector((state) => state.title);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        overflow: 'scroll',
        backgroundColor: 'white',
      }}>
      {/* <Search/> */}
      {/* <Search background={GRAY_LIGHT} style={styles.search} /> */}
      <View style={[styles.listView, styles.marka]}>
        <Info title="Markalar" category="h1" buttonName="Show All" />
        <Card data={data} {...props} />
        <ButtonGroup />
        <Progress />
      </View>
      <Info title="Kategoriler" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent {...props} data={brosure} />
      </View>
      {/* <Info title="Çok Satanlar" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent {...props} data={Images} />
      </View> */}
    </View>
  );
}

export default function HomeStackScreen({navigation}) {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Brand') {
      return false;
    }

    return true;
  };
  return (
    <HomeStack.Navigator
      initialRouteName="Anasayfa"
      // headerMode="none"
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 12,
        },
      }}>
      <HomeStack.Screen name="Anasayfa" component={HomePage} />
      <HomeStack.Screen name="Category" component={CategoryDetail} />
      <HomeStack.Screen
        name="Brand"
        component={BrandDetail}
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
          headerStyle: {
            height: 40,
            elevation:0
          },
          headerTitle:'Logo Gelecek',
          headerLeft: (props) => (
            <HeaderBackButton
              style={{width: 15, height: 15}}
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: (props) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <SvgSearch
                  width={24}
                  height={24}
                  style={{fontSize: 48}}
                  color="black"
                  {...props}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <SvgLove
                  width={24}
                  height={24}
                  style={{marginLeft:16}}
                  fill="black"
                  {...props}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <SvgDotsVertical
                  width={24}
                  height={24}
                  style={{fontSize: 48, marginHorizontal: 11}}
                  color="black"
                  fill="black"
                  {...props}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: '80%',
    backgroundColor: GRAY_LIGHT,
    marginTop: '5%',
  },
  listView: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
  },
  marka: {
    borderRadius: 20,
    borderColor: '#ECEAF8',
    borderWidth: 0.1,
    backgroundColor: 'white',
  },
});
