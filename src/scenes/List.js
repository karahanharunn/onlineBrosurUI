import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Information, Login} from '../components/icons';
import AuthNavigatorScreen from '../navigations/auth-navigator';
import {GRAY_DARK} from '../styles/colors';

export default function List({navigation}) {
  const userToken = useSelector((state) => state.userToken);
  console.log(userToken, 'giildi');
  if (!!userToken === false)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
          <View
            style={{
              padding: 12,
              backgroundColor: '#9B8ACA',
              borderRadius: 6,
              flexDirection: 'row',
            }}>
            <Login width={20} height={20} fill="white" />
            <Text style={{color: 'white', fontSize: 12, paddingLeft: 12}}>
              UYGULAMAYA GİRİŞ YAP
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            padding: 15,
            marginTop: 15,
            backgroundColor: 'white',
            width: '80%',
            flexDirection: 'row',
          }}>
          <Information width={20} height={20} fill="black" />
          <Text style={{fontSize: 10, color: GRAY_DARK, paddingLeft: 15}}>
            Kayıtlı broşürlerinizi görüntülemek için giriş yapmanız gerekiyor.
            Bu özellik şuan aktif değil.
          </Text>
        </View>
      </View>
    );
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <View
        style={{
          padding: 15,
          marginTop: 15,
          backgroundColor: 'white',
          width: '80%',
          flexDirection: 'row',
        }}>
        <Information width={20} height={20} fill="black" />
        <Text style={{fontSize: 10, color: GRAY_DARK, paddingLeft: 15}}>
          Bu özellik için biraz daha zamana ihtiyacımız var. Uygulamanın beta
          sürümüdür.
        </Text>
      </View>
    </View>
  );
}
