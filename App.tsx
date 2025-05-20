import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image } from 'react-native';
import DropdownComponent from './Components/Dropdown_menu';
import { useFonts } from 'expo-font';


export default function App() {
  const [loaded, error] = useFonts({
    Aptos: require("./assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("./assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("./assets/fonts/Aptos-ExtraBold.ttf")
  });

  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/vanderlande_logo.png')}
      />
      <View style = {{backgroundColor:'#FFEFDF', margin:20, padding:20, borderColor:'black', borderRadius:20, borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
        <DropdownComponent />
      </View>
      <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.column}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold' }}>5-10 years</Text>
            </View>
            <Image
                style={{ width: 450, height: 50, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_top.png')}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.column}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold' }}>3-5 years</Text>
            </View>
            <Image
                style={{ width: 400, height: 50, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_middle.png')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.column, {paddingTop: 15}]}>
              <Text style={{ fontFamily: 'Aptos_ExtraBold' }}>0-3 years</Text>
            </View>
            <Image
                style={{ width: 350, height: 125, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_bottom.png')}
            />
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    marginLeft:30,
    marginTop:50,
    width: 400,
    height: 60,
  },
  column: {
    paddingRight: 25,
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});
