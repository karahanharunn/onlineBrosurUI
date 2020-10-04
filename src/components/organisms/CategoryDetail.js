import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {config} from '../../services/Config';
import {LOGIN_BACKGROUND} from '../../styles/colors';
import Search from '../Search';
import InfoProduct from '../molecules/InfoProduct';
import SvgBack from '../icons/Back';
import {SCALE_12} from '../../styles/spacing';
const cardWith = 60;
const cardHeight = 40;
const {width} = Dimensions.get('screen');
const spacingCard = 20;
const Spacing = 12;
export default function CategoryDetail({route, navigation: {goBack}}) {
  const {data, item} = route.params;

  const selectedItemindex = data.findIndex((i) => i.name === item.name);
  const ref = React.useRef();
  const [Value, setValue] = useState(selectedItemindex);
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(new Animated.Value(Value)).current;
  const animatedIndex = React.useRef(new Animated.Value(Value)).current;
  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 300,
      delay,
      useNativeDriver: true,
    });
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedIndex, {
        toValue: activeIndex,
        duration: 500,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  });
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const size = cardWith + Spacing * 2.5;
  const translateX = animatedIndex.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: LOGIN_BACKGROUND,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'scroll',
          height: 130,
        }}>
        <SvgBack
          fill="white"
          style={{margin: SCALE_12}}
          width={20}
          height={20}
          onPress={() => goBack()}
        />
        <Animated.View
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={[
            styles.flatList,
            {
              marginLeft: width / 2 - cardWith / 2 - Spacing * 2.5,
              transform: [{translateX: translateX}],
              overflow: 'scroll',
            },
          ]}>
          {data.map((item, index) => {
            const inputRange = [index - 1, index, index + 1];
            const opacity = activeIndex.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const cardScale = activeIndex.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });
            const textScale = activeIndex.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });
            return (
              <TouchableWithoutFeedback
                key={item.name}
                onPress={() => {
                  activeIndex.setValue(index);
                  setValue(index);
                  ref.current.scrollToIndex({
                    index,
                    animated: true,
                  });
                }}>
                <View
                  style={{
                    ...styles.center,
                    width: 90,
                    padding: Spacing,
                  }}>
                  <SharedElement id={`item ${item.name} icon`}>
                    <Animated.View style={[styles.subView]}>
                      <Animated.Image
                        style={{
                          ...styles.tinyLogo,
                          transform: [{scale: cardScale}],
                        }}
                        source={{
                          uri: config.apiUrl + item.imageUrl,
                        }}
                        resizeMode={'contain'}
                      />
                    </Animated.View>
                  </SharedElement>
                  <Animated.Text
                    style={[
                      styles.title,
                      ,
                      item.id === activeIndex && styles.redColor,
                      {opacity},
                    ]}>
                    {item.name}
                  </Animated.Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.View>
      </View>
      <Search style={styles.search} />

      <View style={styles.Info}>
        <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
          ref={ref}
          data={data}
          decelerationRate={0}
          keyExtractor={(item) => item.name}
          horizontal
          disableIntervalMomentum={true}
          snapToInterval={width}
          initialScrollIndex={Value}
          nestedScrollEnabled
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
            activeIndex.setValue(newIndex);
            setValue(newIndex);
          }}
          renderItem={({item}) => {
            return (
              <ScrollView
                style={{
                  borderRadius: 16,
                  width: width,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: '6%',
                  }}>
                  {data.map((item) => (
                    <InfoProduct key={item.name} item={item} />
                  ))}
                </View>
              </ScrollView>
            );
          }}></Animated.FlatList>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  parentView: {
    alignItems: 'center',
  },
  search: {
    width: '90%',
    marginLeft: '5%',
    position: 'absolute',
    top: 110,
  },
  Info: {marginTop: 50},
  title: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginTop: 8,
    marginRight: 10,
    width: 120,
    color: 'white',
  },
  center: {
    justifyContent: 'center',
  },
  redColor: {
    color: 'red',
  },
  tinyLogo: {
    width: cardWith,
    height: cardHeight,
  },
  subView: {
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    marginTop: 25,
    marginBottom: 25,
  },
});
