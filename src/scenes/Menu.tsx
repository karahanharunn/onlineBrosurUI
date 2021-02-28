import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Image from '../components/image/Image';

import { AppService } from '../services/AppService';
import { GRAY_MEDIUM } from '../styles/colors';
import { Info } from './List';

export default function Menu({ navigation }) {
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
  const renderItem = ({ item }) => {
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
          <View style={{ width: 120 }}>
            <Image url={item.coverImageUrl} style={{ width: 140, height: 110 }} />
          </View>
          <View style={{ justifyContent: 'space-between' }}>
            <View>
              <Text>{item.brandName}</Text>
              <Text style={{ color: '#9B8ACA', fontSize: 12 }}>{item.name}</Text>
            </View>
            <Text style={{ fontSize: 10, color: GRAY_MEDIUM }}>
              Broşürün detayına gitmek için tıklayın
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
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, backgroundColor: '#9B8ACA' }}>
        <Text style={{ fontSize: 13, color: 'white' }}>
          Favori Broşürler
        </Text>
      </View>
      {Brosure?.length > 0 ?
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
        </View> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Info title="Favorilere aldığınız herhangibir broşürünüz bulunmuyor" />
        </View>
      }
    </View>
  );
}
