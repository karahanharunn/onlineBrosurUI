import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from './Input';
import Button from './ButtonGroup/Button';
import {LOGIN_BUTTON, PLACEHOLDER} from '../styles/colors';
import {tokenService} from '../services/TokenService';
import {AppService} from '../services/AppService';

export default function Register() {
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
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const onLogin = async () => {
    setClicked(true);
    if (password === confirmPassword) {
      const value = 'Basic ' + encodeBase64(`consumer:RB,z6n}qvuJirM84`);
      tokenService.set(value);
      const id = AppService.getDeviceİd();

      validateEmail(username) &&
        (await AppService.createLogin(
          `?email=${username}&ClearTextPassword=${password}&DeviceId=${id}`,
        ));
    }
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <>
      <Input
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={'Email'}
      />
      {!validateEmail(username) && clicked && (
        <Text style={{fontSize: 10, color: PLACEHOLDER, paddingVertical: 10}}>
          Lütfen geçerli bir email adresi giriniz.
        </Text>
      )}
      <Input
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Şifre'}
        secureTextEntry={true}
      />
      <Input
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder={'Onayla'}
        secureTextEntry={true}
      />
      {password !== confirmPassword && clicked && (
        <Text style={{fontSize: 10, color: PLACEHOLDER, paddingVertical: 10}}>
          Şifreleriniz eşleşmiyor.
        </Text>
      )}
      <Button style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Hesap Oluştur </Text>
      </Button>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: LOGIN_BUTTON,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E41684',
    borderRadius: 12,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});
