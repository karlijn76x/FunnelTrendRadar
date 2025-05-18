import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image } from 'react-native';
import DropdownComponent from './components/Dropdown_menu';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/vanderlande_logo.png')}
      />
      <View style = {{backgroundColor:'#FFEFDF', margin:20, padding:20, borderColor:'black', borderRadius:20, borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
      <DropdownComponent />
      </View>
    </View>
  );
}

//Styling of logo
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    marginLeft:30,
    marginTop:50,
    width: 400,
    height: 60,
  },
});

