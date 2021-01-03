import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  About,
  Facebook,
  Instagram,
  Login,
  New,
  Right,
  Twitter,
} from '../components/icons';
import setToken from '../redux/actions/action';
import {GRAY_DARK, SEARCH_TEXT} from '../styles/colors';
const username = 'trendbrosur';
export default function MyAccount({navigation}) {
  const dispatch = useDispatch();
  const resetToken = () => {
    dispatch(setToken(null));
    AsyncStorage.removeItem('token');
  };
  const userToken = useSelector((state) => state.userToken);
  const openSocialMedia = async (url, platform) => {
    const supported = await Linking.canOpenURL(url);

    Linking.openURL(
      supported ? url : `https://www.${platform}.com/${username}`,
    );
  };
  return (
    <View style={{flex: 1}}>
      <Title title="Hesabım" />
      {!userToken && (
        <Info
          onPress={() => navigation.navigate('Auth')}
          title={'Giriş Yap'}
          icon={<Login width={20} height={20} fill="black" />}
          right={<Right width={12} height={12} fill={GRAY_DARK} />}
        />
      )}
      {userToken && (
        <Info
          onPress={() => resetToken()}
          title={'Çıkış Yap'}
          icon={<Login width={20} height={20} fill="black" />}
          right={<Right width={12} height={12} fill={GRAY_DARK} />}
        />
      )}
      <Title title="Ayarlar" />
      <Info
        title={'Güncelleme'}
        icon={<New width={20} height={20} fill="black" />}
      />
      <Info
        title={'Uygulama'}
        icon={<About width={20} height={20} fill="black" />}
      />
      <Title title="Sosyal Medya" />
      <Info
        onPress={() =>
          openSocialMedia('facebook://user?username=trendbrosur', 'facebook')
        }
        title={'Facebook'}
        icon={<Facebook width={20} height={20} fill="black" />}
        right={<Right width={12} height={12} fill={GRAY_DARK} />}
      />
      <Info
        onPress={() =>
          openSocialMedia('twitter://user?username=trendbrosur', 'twitter')
        }
        title={'Twitter'}
        icon={<Twitter width={20} height={20} fill="black" />}
        right={<Right width={12} height={12} fill={GRAY_DARK} />}
      />
      <Info
        onPress={() =>
          openSocialMedia('instagram://user?username=trendbrosur', 'instagram')
        }
        title={'İnstagram'}
        icon={<Instagram width={20} height={20} fill="black" />}
        right={<Right width={12} height={12} fill={GRAY_DARK} />}
      />
    </View>
  );
}

function Info({onPress, icon, title, right}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <View style={{width: '15%'}}>{icon}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text style={{fontSize: 12, color: GRAY_DARK}}>{title}</Text>
          {right}
        </View>
      </View>
    </TouchableOpacity>
  );
}
export function Title({title}) {
  return (
    <Text
      style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 12,
        color: SEARCH_TEXT,
      }}>
      {title}
    </Text>
  );
}
