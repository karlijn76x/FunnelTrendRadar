import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import NavBarEdit from '../components/NavBarEditTrends';
import SearchBar from '../components/Search_bar';
import ManagementTable from "../components/ManagementTable"
import { useNavigation } from '@react-navigation/native';

function ManageTrends() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavBarEdit/>

      <View style={styles.titleAndSearch}>
        <Text style={styles.title}>Manage Trends</Text>
        <SearchBar/>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('Create Trend')}
      >
        <Image style={styles.addImg} source={require('../assets/images/add_icon.png')}/>
      </Pressable>

      <View style={styles.tableContainer}>
        <ManagementTable/>
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
  titleAndSearch:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:40,
    marginBottom:10,
    marginHorizontal:60,
  },
  title:{
    fontFamily:'Aptos',
    fontSize:50,
    fontWeight:'bold',
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 40,

  },
  addButton: {
    alignSelf: 'flex-end',
    marginRight: 60,
  },
  addImg: {
    width: 40,
    height: 40,
  }
});