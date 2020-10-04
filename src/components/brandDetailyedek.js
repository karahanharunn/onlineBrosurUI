import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {GRAY_LIGHT} from '../styles/colors';
import {SCALE_12, SCALE_10, SCALE_8} from '../styles/spacing';
import Carousel from 'react-native-snap-carousel';
import {config} from '../services/Config';
import Button from './atoms/Button';
import Column from './atoms/column/index';
import SvgLove from './icons/Love';
import SvgChevronRight from './icons/ChevronRight';
import SvgChevronLeft from './icons/ChevronLeft';
import Title from './atoms/titles/Title';
import FitImage from 'react-native-fit-image';
import TitleLight from './atoms/titles/TitleLight';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgBack from './icons/Back';
import Lightbox from 'react-native-lightbox';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const {width: screenWidth} = Dimensions.get('window');
export default function BrandDetail({route, navigation: {goBack}}) {
  const {data, item} = route.params;
  const [Brosure, setBrosure] = useState(data);
  const flatlistRef = useRef(null);
  const selectedItemindex = data.findIndex(
    (i) => i.brandName === item.brandName,
  );
  const [index, setIndex] = useState(selectedItemindex ?? 0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    let copy = Object.assign({}, Brosure);
    copy[index].details = Brosure[index].details.sort(function (a, b) {
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

  const renderItem = ({item}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <Lightbox>
          <FitImage
            source={{uri: config.apiUrl + item.imageUrl}}
            style={styles.image}
          />
        </Lightbox>
      </View>
    );
  };
  const Detail = () => (
    <View style={{flex: 1}}>
      <View style={{flex: 4, backgroundColor: GRAY_LIGHT}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 6,
          }}>
          <TouchableOpacity>
            <SvgBack color="black" width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.paging}>
            <Text>{value + 1 + '/' + data[index].details.length}</Text>
          </View>
        </View>
        {/* <Carousel
          currentIndex={value}
          data={}
          ref={carouselRef}
          sliderWidth={screenWidth}
          slideStyle={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          renderItem={renderItem}
          onSnapToItem={(value) => setValue(value)}
        /> */}
        <View>
          <FlatList
            ref={flatlistRef}
            data={data[index].details}
            renderItem={renderItem}
            keyExtractor={(item) => item.imageUrl}
            horizontal={true}
            
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: '50%',
            bottom: 0,
            flexDirection: 'row',
            zIndex: 3,
          }}>
          <TouchableOpacity onPress={() => setValue(value - 1)}>
            <SvgChevronLeft
              color="#413B89"
              fill="white"
              width={32}
              height={32}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '50%',
            bottom: 0,
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => setValue(value + 1)}>
            <SvgChevronRight
              color="#413B89"
              fill="white"
              width={32}
              height={32}
            />
          </TouchableOpacity>
        </View>
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
            <Button style={[styles.button, {width: 60}]}>
              <SvgLove fill={'white'} width={16} height={16} />
            </Button>
            <Button style={[styles.button, {flex: 3}]}>Kaydet</Button>
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
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: 'white'}}
          tabStyle={{width: screenWidth / 3, height: 40}}
          scrollEnabled={true}
          style={{backgroundColor: '#413B89', color: 'black'}}
        />
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paging: {
    width: 'auto',
    padding: 6,
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    margin: SCALE_8,
    color: 'black',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: GRAY_LIGHT,
    flex: 1,
    width: screenWidth,
    height: 'auto',
    position: 'relative',
  },
  info: {
    borderRadius: 16,
    margin: 16,
    flex: 2,
    backgroundColor: 'white',
    marginTop: SCALE_12,
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
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: '#F3E7DD',
  },
});
