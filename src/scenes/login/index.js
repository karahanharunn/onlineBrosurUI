import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LOGIN_BACKGROUND} from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Login from '../../components/molecules/Login';
import Register from '../../components/molecules/Register';

export default function index() {
  const [page, setPage] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button style={styles.registerLeft} onPress={() => setPage(true)}>
          <Text
            style={
              (styles.buttonText, {color: page === false ? '#95979A' : 'white'})
            }>
            Login
          </Text>
        </Button>
        <Button style={styles.registerRight} onPress={() => setPage(false)}>
          <Text
            style={
              (styles.buttonText, {color: page === true ? '#95979A' : 'white'})
            }>
            Register
          </Text>
        </Button>
      </View>
      {page === true ? <Login /> : <Register />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LOGIN_BACKGROUND,
    paddingTop:'33%'
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#142548',
    marginBottom: 30,
  },
  registerLeft: {
    borderRightWidth: 1,
    borderColor: '#95979A',
    margin: 10,
    paddingRight: 10,
  },
  registerRight: {
    margin: 10,
  },
});
