import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from './Input';
import Button from './ButtonGroup/Button';
import {LOGIN_BUTTON} from '../styles/colors';
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
  const onLogin = async () => {
    if (password === confirmPassword) {
      const value = 'Basic ' + encodeBase64(`consumer:RB,z6n}qvuJirM84`);
      tokenService.set(value);
      const id = AppService.getDeviceİd();

      const response = await AppService.createLogin(
        `?email=${username}&ClearTextPassword=${password}&DeviceId=${id}`,
      );
    }
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      <Input
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder={'Confirm Password'}
        secureTextEntry={true}
      />
      <Button style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Create </Text>
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
