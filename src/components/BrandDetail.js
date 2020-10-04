import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, FlatList, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {GRAY_LIGHT} from '../styles/colors';
import {SCALE_12, SCALE_10, SCALE_8, SCALE_16} from '../styles/spacing';
import {config} from '../services/Config';
import Button from './atoms/Button';
import Column from './atoms/column/index';
import SvgLove from './icons/Love';
import Title from './atoms/titles/Title';
import FitImage from 'react-native-fit-image';
import TitleLight from './atoms/titles/TitleLight';
import SvgBack from './icons/Back';
import Swiper from 'react-native-swiper';
import Image from './atoms/image/Image';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

export default function BrandDetail({route, navigation: {goBack}}) {
  const {data, item} = route.params;
  const [Brosure, setBrosure] = useState(data[0].details);
  const flatlistRef = useRef(null);
  const selectedItemindex = data.findIndex(
    (i) => i.brandName === item.brandName,
  );
  const [index, setIndex] = useState(selectedItemindex ?? 0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    let copy = data[index].details;
    copy = data[index].details.sort(function (a, b) {
      return a.page - b.page;
    });
    setBrosure(copy);
    setValue(0);
  }, [index]);
  const [routes, setRoutes] = useState(
    data.map((data) => {
      return {key: data.brandName, title: data.brandName};
    }),
  );
  useEffect(() => {
    if (flatlistRef.current) {
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({animated: true, index: value});
      }, 100);
    }
  }, [value]);

  const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={styles.date}>28 Eyl-01 Kas</Text>
        <Text style={styles.paginationText}>
          {index + 1}/{total}
        </Text>
      </View>
    );
  };

  const Detail = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.slide}>
        <Swiper
          removeClippedSubviews
          renderPagination={renderPagination}
          showsButtons
          loop={false}>
          {Brosure.map((item, index) => (
            <Image
              style={{
                width: SLIDER_WIDTH,
                height: '100%',
                backgroundColor: 'transparent',
              }}
              url={item.imageUrl}
            />
          ))}
        </Swiper>
      </View>
      <View style={styles.info}>
        <Column>
          <View
            style={{
              paddingLeft: 32,
              borderLeftWidth: 3,
              borderLeftColor: '#F2F2F2',
            }}>
            <Title>Description</Title>
            <TitleLight>
              Dean on Branding presents in a compact form the twenty essential
              principles
            </TitleLight>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button style={[styles.button, {flex: 1}]}>Kaydet</Button>
          </View>
        </Column>
      </View>
    </View>
  );
  return (
    <TabView
      scrollEnabled={true}
      navigationState={{index, routes}}
      renderScene={Detail}
      onIndexChange={setIndex}
      swipeEnabled={false}
      style={{
        backgroundColor: 'white',
      }}
      showPageIndicator={false}
      removeClippedSubviews={true}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{shadowColor: 'white'}}
          tabStyle={{
            width: SLIDER_WIDTH / 3,
            height: 45,
          }}
          renderIndicator={() => <View></View>}
          scrollEnabled={true}
          renderLabel={({route, focused}) => (
            <View
              style={{
                display: 'flex',
                width: SLIDER_WIDTH / 3,
                justifyContent: 'center',
                height: 45,
                backgroundColor: focused ? '#413B89' : '#E8E5E8',
                borderRadius: 8,
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: focused ? 'white' : 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {route.title}
              </Text>
            </View>
          )}
          style={{
            shadowOpacity: 0,
            height: 45,
            display: 'flex',
            alignContent: 'center',
            backgroundColor: '#E8E5E8',
            elevation: 4,
          }}
        />
      )}
    />
  );
}
const styles = StyleSheet.create({
  slide: {
    width: SLIDER_WIDTH,
    height: undefined,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  paginationStyle: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paginationText: {
    backgroundColor: '#413B89',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 6,
    color: 'white',
    fontSize: 14,
    marginLeft: 'auto',
  },
  date: {
    color: 'white',
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: 'transparent',
    backgroundColor: '#413B89',
    padding: 6,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    width: SLIDER_WIDTH,
    height: 'auto',
    position: 'relative',
  },
  info: {
    borderRadius: 32,
    backgroundColor: 'white',
    height: 160,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#413B89',
    elevation: 8,
    borderRadius: SCALE_10,
    paddingVertical: SCALE_10,
    paddingHorizontal: SCALE_12,
    marginRight: 6,
  },
  imageContainer: {
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: '#F3E7DD',
  },
});
