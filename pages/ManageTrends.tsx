import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NavBarEdit from '../components/NavBarEditTrends';
import SearchBar from '../components/Search_bar';
import ManagementTable from "../components/ManagementTable"
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  'Create Trend': undefined;
  'Home': undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function ManageTrends() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <NavBarEdit/>

      <View style={styles.contentContainer}>
        <View style={styles.searchSection}>
          <View style={styles.titleAndSearch}>
            <Text style={styles.title}>Manage Trends</Text>
            <SearchBar/>
          </View>
        </View>

        <Pressable 
            style={styles.addButton}
            onPress={() => navigation.navigate('Create Trend')}
          >
            <Image style={styles.addImg} source={require('../assets/images/add_icon.png')}/>
          </Pressable>

        <View style={styles.mainContent}>
          <View style={styles.tableContainer}>
            <ManagementTable/>
          </View>
        </View>

        <View style={styles.align}>
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Legend:</Text>
            <View style={styles.legendContainer}>
              <View style={styles.columnLegend}>
                <View style={styles.legendItem}>
                  <Image source={require('../assets/images/edit_icon.png')} style={styles.legendIcon}/>
                  <Text style={styles.legendText}>= Edit</Text>
                </View>
                <View style={styles.legendItem}>
                  <Image source={require('../assets/images/delete_icon.png')} style={styles.legendIcon}/>
                  <Text style={styles.legendText}>= Delete</Text>
                </View>
              </View>
              <Pressable 
                style={styles.legendItem}
                onPress={() => navigation.navigate('Create Trend')}
              >
                <Image source={require('../assets/images/add_icon.png')} style={styles.legendIcon}/>
                <Text style={styles.legendText}>= Add</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable 
              style={({ pressed }) => [
                styles.cancelButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.cancelButtonText}>Back to Funnel</Text>
            </Pressable>
          </View>
        </View>
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
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  searchSection: {
    position: 'relative',
    zIndex: 1000,
  },
  addButton: {
    alignSelf: 'flex-end',
    marginRight: 60,
    marginBottom: 10,
  },
  addImg: {
    width: 40,
    height: 40,
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
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
    marginHorizontal: 40,
    position: 'relative',
  },
  align:{
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    position: 'relative',
    zIndex: 1,
  },
  legend:{
    marginLeft:60,
    marginBottom: 20,
  },
  legendTitle:{
    fontFamily:'Aptos',
    fontWeight:'bold',
    fontSize:16,
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
  },
  columnLegend: {
    flexDirection: 'column',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendIcon: {
    width: 30,
    height: 30,
  },
  legendText: {
    fontFamily: 'Aptos',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight:60,
  },
  cancelButton: {
    backgroundColor: '#9ECEE3',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Aptos',
    fontWeight: '600',
  },
});