import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import NavBarEdit from '../components/NavBarEditTrends';
import SearchBar from '../components/Search_bar';

function ManageTrends() {

  return (
    <View style={styles.container}>
      <NavBarEdit/>
      <View>
        <Text>Manage Trends</Text>
        <SearchBar />
      </View>
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