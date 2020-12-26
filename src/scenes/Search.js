import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Index from '../components/icons';
import Image from '../components/image/Image';
import Search from '../components/Search';
import {AppService} from '../services/AppService';
import CustomTab from '../components/CustomTab';
import { Tabs } from '../constant';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ModalSearch({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [Result, setResult] = useState();
  const [text, setText] = React.useState();
  const implementSearchText = (e) => {
    setText(e);
  };
  useEffect(() => {
    AppService.search(text).then((response) => {
      setResult({
        all: [...response.data.brochures, ...response.data.brands],
        brands: [...response.data.brands],
        brochures: [...response.data.brochures],
      });
    });
    return () => {
      setResult(null);
    };
  }, [text]);
  function renderBrochure({item}) {
    if (item.coverImageUrl) {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Brand', {
              selectedId: item.name,
              item,
            })
          }>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.48,
              shadowRadius: 11.95,
              elevation: 18,
            }}>
            <View style={{width: 120}}>
              <Image
                url={item.thumbCoverImageUrl}
                style={{width: 120, height: 60}}
              />
            </View>
            <View>
              <Text>{item.brandName}</Text>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Brand', {
              selectedId: item.name,
              item,
            })
          }>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.48,
              shadowRadius: 11.95,
              elevation: 18,
            }}>
            <View style={{width: 120}}>
              <Image url={item.imageUrl} style={{width: 70, height: 70}} />
            </View>
            <View>
              <Text>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
  const ref = useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });
  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        ref={ref}
        data={Tabs}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        removeClippedSubviews
        bounces={false}
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        bounces={false}
        renderItem={({item}) => {
          console.log(item.tab);
          return (
            <View style={{width, height, top: 120}}>
              {Result && (
                <FlatList
                  data={Result[item.tab]}
                  keyExtractor={(item) => item.id}
                  renderItem={renderBrochure}
                />
              )}
            </View>
          );
        }}
      />
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
        }}>
        <Search
          onChangeText={(e) => implementSearchText(e)}
          isFocused={true}
          setText={setText}
          text={text}
          style={{
            paddingHorizontal: 6,
            borderRadius: 6,
            backgroundColor: 'white',
            borderWidth: 1,
            height: 40,
            borderRightWidth: 0,
            borderColor: '#EFEFF0',
          }}
          placeholder="Search here..."
          left={<Index id="Search" color={'gray'} size="16" />}
        />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 12,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{fontSize: 12, color: 'black'}}>Vazgeç</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomTab  onItemPress={onItemPress} scrollX={scrollX} data={Tabs} />
    </View>
  );
}
