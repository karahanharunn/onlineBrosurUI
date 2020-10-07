import React, {useState, useEffect} from 'react';
import {Easing, View, StyleSheet, StatusBar, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryDetail from '../components/organisms/CategoryDetail';
import BrandDetail from '../components/BrandDetail';
import {HeaderBackButton} from '@react-navigation/stack';
import Card from '../components/organisms/Card';
import ButtonGroup from '../components/Button';
import ImageComponent from '../components/organisms/Image';
import SvgDotsVertical from '../components/icons/DotsVertical';
import {useSelector} from 'react-redux';
import {AppService} from '../services/AppService';
import {SEARCH_LOCATION, LOGIN_BACKGROUND} from '../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgSearch from '../components/icons/Search';
import SvgLove from '../components/icons/Love';
import Search from '../components/Search';
import SvgLocation from '../components/icons/Location';
import Profile from '../components/atoms/profile/index';
import FlexRow from '../components/atoms/FlexRow/FlexRow';
import Index from '../components/icons';
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
      {/* <Search /> */}
      <View style={[styles.listView, styles.marka]}>
        <Card data={data} {...props} />
        <ButtonGroup />
      </View>
      <ImageComponent {...props} data={brosure} />
      {/* <Info title="Çok Satanlar" category="h2" buttonName="Show All" />
      <View style={styles.listView}>
        <ImageComponent {...props} data={Images} />
      </View> */}
    </View>
  );
}

export default function HomeStackScreen({navigation}) {
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
      <HomeStack.Screen
        name="Anasayfa"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
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
            elevation: 0,
          },
          headerTitle: 'Logo Gelecek',
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
                  style={{marginLeft: 16}}
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
