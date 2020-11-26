import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Dimensions, Text, StatusBar} from 'react-native';
import {SCALE_12, SCALE_10} from '../../styles/spacing';
import Button from '../ButtonGroup/Button';
import Column from '../column/Column';

import Swiper from 'react-native-swiper';
import Image from '../image/Image';
import {SEARCH_BACKGROUND, GRAY_MEDIUM} from '../../styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lightbox from 'react-native-lightbox';
import LoveButton from '../love/LoveButton';
import SvgBack from '../icons/Back';
import SvgOpen from '../icons/Open';
import SvgShare from '../icons/Share';
import SvgSearch from '../icons/Search';
import Title from '../titles/Title';
import TitleLight from '../titles/TitleLight';
import {AppService} from '../../services/AppService';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

export default function BrandDetail({route, navigation: {goBack}}) {
  const {item} = route.params;

  const [Brosure, setBrosure] = useState([]);
  useEffect(() => {
    AppService.getDetail(item.id).then((response) => {
      setBrosure(
        response.data.sort(function (a, b) {
          return a.page - b.page;
        }),
      );
    });
  }, [item.id]);
  useEffect(() => {
    const id = AppService.getDeviceİd();
    const body = {
      brochureId: item.id,
      deviceId: id,
    };
    async function fetchData() {
      await AppService.brochureVisit(body);
    }
    fetchData();
  }, []);

  const [visible, setVisible] = useState(false);
  const setShow = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const addToFavorites = async () => {
    const id = AppService.getDeviceİd();
    const body = {
      brochureId: item.id,
      deviceId: id,
    };
    await AppService.addtofavorites(body);
  };
  const renderPagination = (index, total, context) => (
    <View style={[styles.paginationStyle, {top: -25}]}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5,
          display: 'flex',
          marginRight: 10,
        }}>
        <TouchableOpacity style={{opacity: 1}} onPress={() => goBack()}>
          <SvgBack width={16} height={16} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>28 Eyl-01 Kas</Text>
        <Text style={styles.date}> {item.brandName + ' ' + item.name}</Text>
      </View>
      <View style={{position: 'absolute', top: 5, right: 10}}>
        <TouchableOpacity onPress={addToFavorites}>
          <LoveButton />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <Detail
      renderPagination={renderPagination}
      visible={visible}
      changeVisible={setShow}
      Brosure={Brosure}
    />
  );
}

const Detail = React.memo(function ({
  Brosure,
  visible,
  changeVisible,
  renderPagination,
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: SEARCH_BACKGROUND,
        position: 'relative',
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={SEARCH_BACKGROUND}
        style={styles.statusBar}
      />
      <View style={styles.slide}>
        <Swiper renderPagination={renderPagination} showsButtons loop={true}>
          {Brosure?.map((item, index) => (
            <View key={item.imageUrl}>
              <Image
                style={{
                  width: SLIDER_WIDTH,
                  height: '100%',
                  position: 'relative',
                  backgroundColor: 'transparent',
                }}
                url={item.imageUrl}>
                <Text style={styles.paginationText}>
                  {item.page}/{Brosure.length}
                </Text>
              </Image>
            </View>
          ))}
        </Swiper>
      </View>
      <View
        style={[
          styles.info,
          {
            bottom: visible === false ? -270 : 0,
            borderTopLeftRadius: visible === false ? 0 : 40,
            borderTopRightRadius: visible === false ? 0 : 40,
          },
        ]}>
        <Column>
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              key="Search"
              style={{display: visible === true ? 'none' : 'flex'}}
              onPress={changeVisible}>
              <SvgSearch width={16} height={16} color="#9B8ACA" />
            </TouchableOpacity>
            <TouchableOpacity key="Open" onPress={changeVisible}>
              <SvgOpen width={16} height={16} color="#9B8ACA" />
            </TouchableOpacity>
            <TouchableOpacity
              key="Share"
              style={{display: visible === true ? 'none' : 'flex'}}
              onPress={changeVisible}>
              <SvgShare width={16} height={16} color="#9B8ACA" />
            </TouchableOpacity>
          </View>

          <Title style={{paddingLeft: 32}}>Description</Title>
          <View
            style={{
              paddingLeft: 32,
              marginTop: 12,
              borderLeftWidth: 3,
              borderLeftColor: '#F2F2F2',
            }}>
            <TitleLight>
              Dean on Branding presents in a compact form the twenty essential
              principles Dean on Branding presents in a compact form the twenty
              essential principles
            </TitleLight>
          </View>
          <View style={{flexDirection: 'row', marginTop: 'auto'}}>
            <Button style={[styles.button, {flex: 1}]}>Kaydet</Button>
          </View>
        </Column>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  slide: {
    width: SLIDER_WIDTH,
    height: undefined,
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  paginationStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    position: 'absolute',
    bottom: 20,
    top: 0,
    left: 0,
    height: 40,
    right: 0,
    paddingLeft: 10,
  },
  paginationText: {
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderRadius: 12,
    padding: 4,
    color: 'white',
    fontSize: 12,
    marginLeft: 12,
  },
  date: {
    color: 'green',
    fontSize: 12,
    backgroundColor: 'transparent',
    backgroundColor: 'lightgray',
    padding: 4,
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
  },
  info: {
    backgroundColor: 'white',
    height: 300,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: GRAY_MEDIUM,
  },
  button: {
    backgroundColor: '#9B8ACA',
    elevation: 8,
    borderRadius: SCALE_10,
    color: 'white',
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
