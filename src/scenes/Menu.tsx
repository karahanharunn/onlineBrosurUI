import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Image from '../components/image/Image';

import {AppService} from '../services/AppService';
import {GRAY_MEDIUM} from '../styles/colors';

export default function Menu({navigation}) {
  const [Brosure, setBrosure] = useState();

  React.useEffect(() => {
    const id = AppService.getDeviceİd();

    async function fetchData() {
      const response = await AppService.getFavorites(id);
      setBrosure(response.data);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({item}) => {
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
            padding: 5,
            paddingVertical: 10,
            marginVertical: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 1,
          }}>
          <View style={{width: 120}}>
            <Image url={item.coverImageUrl} style={{width: 140, height: 90}} />
          </View>
          <View style={{justifyContent: 'space-between', paddingVertical: 5}}>
            <View>
              <Text>{item.brandName}</Text>
              <Text>{item.name}</Text>
            </View>
            <Text style={{fontSize: 10, color: GRAY_MEDIUM}}>
              Broşürün detaylarına gitmek için tıklayın
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        overflow: 'scroll',
      }}>
      <View style={{padding: 15}}>
        <Text style={{fontSize: 12}}>
          Favori Broşürlerinizi Bu Sekme Altında Görüntüleyebilirsiniz.
        </Text>
      </View>
      <View>
        <FlatList
          data={Brosure}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
