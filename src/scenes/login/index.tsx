import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LOGIN_BACKGROUND} from '../../styles/colors';
import Button from '../../components/ButtonGroup/Button';
import Login from '../../components/Login';
import Register from '../../components/Register';
import Header from '../../components/header/Header';
import {Previous} from '../../components/icons';

export default function index(props) {
  const [page, setPage] = useState(false);

  return (
    <>
      <Header
        style={{
          padding: 20,
          paddingBottom: 0,
          backgroundColor: LOGIN_BACKGROUND,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{opacity: 1}}>
          <Previous width={14} height={14} fill="white" />
        </TouchableOpacity>
      </Header>
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <Button style={styles.registerLeft} onPress={() => setPage(true)}>
            <Text
              style={
                (styles.buttonText,
                {color: page === false ? '#95979A' : 'white'})
              }>
              Giriş Yap
            </Text>
          </Button>
          <Button style={styles.registerRight} onPress={() => setPage(false)}>
            <Text
              style={
                (styles.buttonText,
                {color: page === true ? '#95979A' : 'white'})
              }>
              Kaydol
            </Text>
          </Button>
        </View>
        {page === true ? <Login {...props} /> : <Register />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: LOGIN_BACKGROUND,
    paddingTop: '33%',
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
