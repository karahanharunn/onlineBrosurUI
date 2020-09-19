import React, {useState} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import {LOGIN_BUTTON} from '../../styles/colors';
import {useDispatch} from 'react-redux';
import setToken from '../../redux/actions/action';
import {instance} from '../../services/AppService';

export default function Login() {
  const dispatch = useDispatch();
  const onLogin = async () => {
    await AsyncStorage.setItem(
      'userToken',
      'Basic Y29uc3VtZXI6UkIsejZufXF2dUppck04NA==',
    );
    instance.defaults.headers.common['Authorization'] =
      'Basic Y29uc3VtZXI6UkIsejZufXF2dUppck04NA==';
    dispatch(setToken('Basic Y29uc3VtZXI6UkIsejZufXF2dUppck04NA=='));
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
