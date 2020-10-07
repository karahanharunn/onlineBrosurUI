import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SvgUser from '../../icons/User';
import {  SEARCH_BACKGROUND } from '../../../styles/colors';

const Profile = () => {
  return (
    <View style={styles.profile}>
      <SvgUser width={24} height={24} fill={'black'} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    borderRadius: 18,
    width: 36,
    height: 36,
    backgroundColor:SEARCH_BACKGROUND,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
  },
});
