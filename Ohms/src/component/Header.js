import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return (
    <View style={{backgroundColor: '#0ab5f7', height: 40, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
      <Text
        style={{
          fontSize: 16,
          color: '#fff',
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
