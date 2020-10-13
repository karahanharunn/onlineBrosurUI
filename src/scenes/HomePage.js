import React, {useState, useEffect} from 'react';
import {Easing, View, StyleSheet, StatusBar, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BrandDetail from '../components/BrandDetail/BrandDetail';
import Card from '../components/Card';
import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import {useSelector} from 'react-redux';
import {AppService} from '../services/AppService';
import {SEARCH_LOCATION, LOGIN_BACKGROUND} from '../styles/colors';

import Search from '../components/Search';
import SvgLocation from '../components/icons/Location';
import Index from '../components/icons';
import Profile from '../components/profile';
import FlexRow from '../components/FlexRow/FlexRow';
import ImageComponent from '../components/Image';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const HomeStack = createStackNavigator();
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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        style={styles.statusBar}
      />

      {/* <Search /> */}
      <FlexRow>
        <Search
          placeholder="Location"
          left={
            <SvgLocation
              style={{color: 'white'}}
              fill={SEARCH_LOCATION}
              width={16}
              height={16}
            />
          }
          right={<Index id="Search" color={LOGIN_BACKGROUND} size="20" />}
          style={styles.search}
        />
        <Profile />
      </FlexRow>
      <FlexRow
        style={{
          paddingHorizontal: 16,
          marginTop: 8,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Search
          style={{
            paddingHorizontal: 6,
            borderRadius: 12,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRightWidth: 0,
            borderColor: '#EFEFF0',
          }}
          placeholder="Search here..."
          right={
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: SEARCH_LOCATION,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Index id="Search" color={'white'} size="20" />
            </View>
          }
        />
      </FlexRow>
      <View style={[styles.listView, styles.marka]}>
        <Card data={data} {...props} />
        <ButtonGroup />
      </View>
      <ImageComponent {...props} data={brosure} />
     
    </View>
  );
}

export default function HomeStackScreen({navigation}) {
  return (
    <HomeStack.Navigator
      initialRouteName="Anasayfa"
      mode="modal"
      // headerMode="none"
      screenOptions={{
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 12,
        },
      }}>
      <HomeStack.Screen
        name="Anasayfa"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Brand"
        component={BrandDetail}
        options={{
          
          gestureEnabled: false,
          headerShown: false,
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
        }}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  listView: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'white',
    marginLeft: 24,
    marginTop: 15,
  },
  marka: {
    borderRadius: 20,
    borderColor: '#ECEAF8',
    borderWidth: 0.1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
