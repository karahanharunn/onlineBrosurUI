import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {SCALE_12, SCALE_10} from '../../styles/spacing';
import Button from '../ButtonGroup/Button';
import Column from '../column/Column';

import Swiper from 'react-native-swiper';
import Image from '../image/Image';
import {GRAY_DARK, GRAY_LIGHT, SEARCH_BACKGROUND} from '../../styles/colors';
import LoveButton from '../love/LoveButton';

import Title from '../titles/Title';
import TitleLight from '../titles/TitleLight';
import {AppService} from '../../services/AppService';
import ModalComponent from '../atoms/ModalComponent';
import OpenUrlButton from '../atoms/OpenUrlButton';
import {
  Back,
  Facebook,
  Instagram,
  Open,
  Paging,
  Previous,
  Whatsapp,
} from '../icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../header/Header';
import Logo from '../Logo';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

export default function BrandDetail({route, navigation: {goBack}}) {
  const {item} = route.params;

  const [Brosure, setBrosure] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState([]);
  useEffect(() => {
    AppService.getDetail(item.id).then((response) => {
      response.data.length > 0
        ? setBrosure(
            response.data.sort(function (a, b) {
              return a.page - b.page;
            }),
          )
        : setBrosure(item.details);
    });
  }, [item.id]);
  useEffect(() => {
    const id = AppService.getDeviceİd();
    const body = {
      brochureId: item.id,
      deviceId: id,
    };
    async function fetchData() {
      AppService.brochureVisit(body);
      const response = await AppService.checkFavorites(body);
      setCheckFavorite(response.data.data);
    }
    fetchData();
  }, []);

  const changeFavorites = async () => {
    const id = AppService.getDeviceİd();
    const body = {
      brochureId: item.id,
      deviceId: id,
    };
    if (!checkFavorite) {
      await AppService.addtofavorites(body);
      return setCheckFavorite(true);
    } else {
      await AppService.deletefavorite(body);
      return setCheckFavorite(false);
    }
  };
  const renderPagination = (index, total, context) => (
    <View style={[styles.paginationStyle, {top: -25}]}>
      <Header>
        <TouchableOpacity onPress={() => goBack()} style={{opacity: 1}}>
          <Previous width={16} height={16} fill="black" />
        </TouchableOpacity>
      </Header>
      <View style={styles.row}>
        <Text style={styles.date}>28 Eyl-01 Kas</Text>
        <Text style={styles.date}> {item.brandName + ' ' + item.name}</Text>
      </View>
      <View style={{position: 'absolute', top: 5, right: 10}}>
        <TouchableOpacity onPress={changeFavorites}>
          <LoveButton active={checkFavorite} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return <Detail renderPagination={renderPagination} Brosure={Brosure} />;
}

const Detail = React.memo(function ({
  Brosure,

  renderPagination,
}) {
  const swiperScroll = useRef();
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState(false);
  const [share, setShare] = useState(false);
  const [search, setSearch] = useState(false);
  const [ActiveBrosur, setActiveBrosur] = useState();
  //Animation
  const setShow = useCallback(() => {
    setVisible(false);
    setDescription(false);
    setSearch(false);
    setShare(false);
  }, [visible]);
  const showDescription = useCallback(() => {
    setDescription(true);
    setVisible(true);
  }, [description]);
  const showShare = useCallback(() => {
    setShare(true);
    setVisible(true);
  }, [share]);
  const showSearch = useCallback(() => {
    setVisible(true);
    setSearch(true);
  }, [search]);
  useEffect(() => {
    swiperScroll.current.scrollTo(ActiveBrosur);
  }, [ActiveBrosur]);
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
        <Swiper
          ref={swiperScroll}
          renderPagination={renderPagination}
          showsButtons
          loop={true}>
          {Brosure?.map((item, index) => (
            <View key={item.imageUrl}>
              <TouchableWithoutFeedback onPress={() => setShow(false)}>
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
              </TouchableWithoutFeedback>
            </View>
          ))}
        </Swiper>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          height: 25,
          bottom: 8,
          paddingHorizontal: 25,
        }}>
        <Logo />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            key="Search"
            style={{
              display: visible === true ? 'none' : 'flex',
              marginRight: 16,
            }}
            onPress={showSearch}>
            <Paging width={16} height={16} fill="black" />
          </TouchableOpacity>
          <TouchableOpacity key="Open" onPress={showDescription}>
            <Open width={16} height={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ModalComponent
        setShow={setShow}
        setVisible={() => setVisible(!visible)}
        visible={visible}
        height={270}>
        <Column>
          <Description visible={description} />
          <BrosureList
            changeActiveBrosur={setActiveBrosur}
            visible={search}
            Brosure={Brosure}
            ActiveBrosur={ActiveBrosur}
          />
        </Column>
      </ModalComponent>
    </View>
  );
});
function BrosureList({visible, Brosure, changeActiveBrosur, ActiveBrosur}) {
  const flatlistRef = useRef();
  useEffect(() => {
    if (ActiveBrosur)
      flatlistRef.current.scrollToIndex({
        animated: true,
        index: ActiveBrosur - 1,
      });
  }, [ActiveBrosur]);
  if (visible === false) return <View />;
  const renderItem = (item) => {
    return (
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 10}}>{item.item.page}</Text>
        <TouchableOpacity onPress={() => changeActiveBrosur(item.item.page)}>
          <Image
            style={{
              width: 70,
              height: '100%',
              marginRight: 10,
              marginTop: 0,
              backgroundColor: 'transparent',
            }}
            url={item.item.imageUrl}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        height: 120,
        marginTop: 10,
      }}>
      <FlatList
        data={Brosure}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        horizontal
        nestedScrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyExtractor={(item) => item.page}
        renderItem={renderItem}
        ref={flatlistRef}
      />
    </View>
  );
}

function Description({visible}) {
  if (visible === false) return <View />;
  return (
    <View
      style={{
        flex: 1,
        height: 230,
        paddingTop: 10,
        zIndex: 99,
        backgroundColor: 'white',
        width: SLIDER_WIDTH,
      }}>
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
          marginBottom: 12,
          marginLeft: 6,
        }}>
        <Button style={[styles.button, {flex: 1}]}>Kaydet</Button>
      </View>
    </View>
  );
}
function ShareComponent({visible}) {
  const text = 'Deneme';

  if (visible === false) return <View />;
  return (
    <View style={{flex: 1, height: 50}}>
      <View
        style={{
          paddingLeft: 12,
          marginTop: 12,
          borderLeftWidth: 3,
          borderLeftColor: '#F2F2F2',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TitleLight style={{color: 'white'}}> Broşürü Paylaş</TitleLight>
        <View style={{flexDirection: 'row'}}>
          <OpenUrlButton url={`whatsapp://send?text=${text}`}>
            <Whatsapp width={32} height={32} />
          </OpenUrlButton>
          <OpenUrlButton url={`whatsapp://send?text=${text}`}>
            <Facebook width={32} height={32} />
          </OpenUrlButton>
          <OpenUrlButton url={`whatsapp://send?text=${text}`}>
            <Instagram width={32} height={32} />
          </OpenUrlButton>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    width: SLIDER_WIDTH,
    height: undefined,
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
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
    backgroundColor: 'white',
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
    color: '#9B8ACA',
    fontSize: 12,
    backgroundColor: 'transparent',
    backgroundColor: 'white',
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
