import {DrawerItems, SafeAreaView} from 'react-navigation';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Index from './icons/index';

export default MyAccount = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={{flex: 1}}>
        <DrawerItems {...props} />
      </View>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        //Your pencil icon here with correct margin to the right
        <Text>Bearbeiten</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
