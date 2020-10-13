import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from './Input';
import Button from './ButtonGroup/Button';
import {LOGIN_BUTTON} from '../styles/colors';

export default function Register() {
  const onLogin = () => {
    Alert.alert('Credentials', `${username} + ${password}`);
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
