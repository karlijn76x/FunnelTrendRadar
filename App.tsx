import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import TrendDetail from './Components/TrendDetail';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponent from './Components/Dropdown_menu';
import { useFonts } from 'expo-font';


export default function App() {
  const [loaded, error] = useFonts({
    Aptos: require("./assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("./assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("./assets/fonts/Aptos-ExtraBold.ttf")
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/images/vanderlande_logo.png')}
      />
      <View style = {styles.dropDownStyle}>
        <DropdownComponent />
      </View>
      <View style={styles.funnelStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.column}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>5-10 years</Text>
            </View>
            <Image
                style={{ width: 900, height: 100, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_top.png')}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.column}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>3-5 years</Text>
            </View>
            <Image
                style={{ width: 800, height: 100, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_middle.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.column, {paddingTop: 30}]}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>0-3 years</Text>
            </View>
            <Image
                style={{ width: 700, height: 250, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_bottom.png')}
            />
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 20,
  },
  funnelStyle: { 
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dropDownStyle: {
    backgroundColor:'#FFEFDF',
    width:750,
    marginVertical:10,
    padding:20,
    borderColor:'black',
    borderRadius:20,
    borderWidth: 2,
  },
  tinyLogo: {
    width: 400,
    height: 60,
  },
  column: {
    paddingRight: 25,
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});
