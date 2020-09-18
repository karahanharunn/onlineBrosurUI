import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Card from './Card';
import SvgBack, {default as Back} from './icons/Back';
import {SharedElement} from 'react-navigation-shared-element';
const cardWith = 50;
const cardHeight = 50;
const {width} = Dimensions.get('screen');
const spacingCard = 20;
const Spacing = 12;
export default function CategoryDetail({route, navigation: {goBack}}) {
  const {data, item} = route.params;

  const selectedItemindex = data.findIndex((i) => i.id === item.id);
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
  const size = cardWith + Spacing * 2;
  const translateX = animatedIndex.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <SvgBack onPress={() => goBack()} />
        <Animated.FlatList
          style={[
            styles.flatList,
            {
              marginLeft: width / 2 - cardWith / 2 - Spacing,
              transform: [{translateX: translateX}],
            },
          ]}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          snapToAlignment="start"
          snapToInterval={cardWith + Spacing}
          renderItem={({item, index}) => {
            const inputRange = [index - 1, index, index + 1];
            const opacity = activeIndex.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
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
                key={item.id}
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
                    padding: Spacing,
                    width: 75,
                  }}>
                  <SharedElement id={`item ${item.id} icon`}>
                    <Animated.View style={[styles.subView, {opacity}]}>
                      <Animated.Image
                        style={{
                          ...styles.tinyLogo,
                          transform: [{scale: cardScale}],
                        }}
                        source={{
                          uri: item.imageUrl,
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
                      {transform: [{scale: textScale}]},
                    ]}>
                    {item.name}
                  </Animated.Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
      <View style={styles.Info}>
        <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
          ref={ref}
          data={data}
          decelerationRate={0}
          keyExtractor={(item) => item.id}
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
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 16,
                  width: width - spacingCard,
                  margin: 12,
                }}>
                <View style={{padding: spacingCard}}>
                  <Text style={{fontSize: 16}}>
                    {Array(50).fill('Dummy data örnek \n')}
                  </Text>
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
  Info: {
    flex: 4,
  },
  title: {
    fontSize: 17,
    marginTop: 10,
    marginRight: 10,
    width: 120,
    fontWeight: '700',
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
    borderRadius: 50,
  },
  subView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  flatList: {
    flex: 1,
    overflow: 'hidden',
    width: '200%',
    height: cardHeight * 2,
  },
});
