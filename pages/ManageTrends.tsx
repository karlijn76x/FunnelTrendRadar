import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import NavBarEdit from '../components/NavBarEditTrends';
import SearchBar from '../components/Search_bar';
import ManagementTable from "../components/ManagementTable"

function ManageTrends() {

  return (
    <View style={styles.container}>
      <NavBarEdit/>

      <View style={styles.titleAndSearch}>
        <Text style={styles.title}>Manage Trends</Text>
        <SearchBar/>
      </View>

      <ManagementTable/>
    </View>
  )
}

export default ManageTrends

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  titleAndSearch:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:40,
    marginHorizontal:60,
  },
  title:{
    fontFamily:'Aptos',
    fontSize:50,
    fontWeight:'bold',
  },
})