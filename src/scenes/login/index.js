import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin = () => {
    const {username, password} = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.registerLeft}>
            <Text style={(styles.buttonText, {color: '#95979A'})}>Login </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerRight}>
            <Text style={styles.buttonText}>Register </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholderTextColor="#95979A"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="#95979A"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#142548',
  },
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 0.2,
    color: '#6E7E9F',
    borderColor: '#6E7E9F',
    marginBottom: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#E41684',
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
    color: '#95979A',
    paddingRight: 10,
  },
  registerRight: {
    margin: 10,
  },
});
