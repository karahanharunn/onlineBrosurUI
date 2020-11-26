import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from './Input';
import Button from './ButtonGroup/Button';
import {LOGIN_BUTTON} from '../styles/colors';
import {useDispatch} from 'react-redux';
import setToken from '../redux/actions/action';
import {AppService, instance} from '../services/AppService';
import {tokenService} from '../services/TokenService';
import AsyncStorage from '@react-native-community/async-storage';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
export default function Login() {
  const encodeBase64 = (input) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        console.log(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  };
  const dispatch = useDispatch();
  const onLogin = async () => {
    const value = 'Basic ' + encodeBase64(`consumer:RB,z6n}qvuJirM84`);
    tokenService.set(value);
    await AppService.login(
      '?email=' + username + '&ClearTextPassword=' + password,
    );

    dispatch(setToken(value));
  };
  useEffect(() => {
    FacebookLogin();
  }, []);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <>
      <Input
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={'Username'}
      />
      <Input
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Button style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login </Text>
      </Button>
      <Text style={styles.buttonText}>Or</Text>
      <View style={{marginTop: 10}}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={(error, result) => OnLoginFinished(error, result)}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </>
  );

  function OnLoginFinished(error, result) {
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      console.log('girildi');
      FacebookLogin();
    }
  }

  function FacebookLogin() {
    AccessToken.getCurrentAccessToken().then((data) => {
      let accessToken = data.accessToken;

      const responseInfoCallback = async (error, result) => {
        if (error) {
          console.log(error);
          alert('Error fetching data: ' + error.toString());
        } else {
          console.log(result);
          const id = AppService.getDeviceİd();

          const value = 'Basic ' + encodeBase64(`consumer:RB,z6n}qvuJirM84`);
          await tokenService.set(value);
          try {
            await AppService.createLogin(
              `?email=${result.email}&ClearTextPassword=!Facebook123&FacebookId=${result.id}&DeviceId=${id}`,
            );
            await AppService.login(
              '?email=' +
                result.email +
                '&ClearTextPassword=!Facebook123&FacebookId=' +
                result.id,
            );
            dispatch(setToken(value));
          } catch (error) {
            AppService.login(
              '?email=' +
                result.email +
                '&ClearTextPassword=!Facebook123&FacebookId=' +
                result.id,
            );
            dispatch(setToken(value));
          }
        }
      };

      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        responseInfoCallback,
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: LOGIN_BUTTON,
    width: 190,
    height: 30,
    borderWidth: 1,
    borderColor: '#E41684',
    borderRadius: 6,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
