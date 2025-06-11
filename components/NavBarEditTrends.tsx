import React from 'react'
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';


function NavBarEdit() {
  return (
    <View style={styles.outerContainer}>
      <ImageBackground 
        source={require('../assets/images/navbar_bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
          <Image
            style={styles.logo}
            source={require('../assets/images/vanderlande_logo.png')}
          />
      </ImageBackground>
    </View>
  )
}

export default NavBarEdit

const styles = StyleSheet.create({
    outerContainer: {
      borderColor: 'black',
      borderBottomWidth: 2,
    },
    //Styling for the whole navbar
    container: {
      paddingHorizontal: 15,
      paddingVertical: 24,
      width: '100%',
      height: 117,
    },
    //Styling for the logo
    logo: {
      resizeMode: 'contain',
      width: 170,
      height: 60,
      marginTop: 9,
    },
})