import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import NavBarEdit from '../components/NavBarEditTrends';


function ManageTrends() {
  return (
    <View style={styles.container}>
      <NavBarEdit/>
    </View>
  )
}

export default ManageTrends

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})