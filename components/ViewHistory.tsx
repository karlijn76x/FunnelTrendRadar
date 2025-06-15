import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function ViewHistory() {
  return (
    <View style={styles.history}>
        <Text style={styles.historyText}>Recently viewed trends</Text>
        <View style={styles.historyRow}>
            <Image style={styles.trendImg} source={require('../assets/images/tech_trends.png')}/>
            <Text style={styles.historyData}>Cybersecurity</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>18.06.2025</Text>
              <Text style={styles.dateTimeText}>10:38 AM</Text>
            </View>
        </View>

        <View style={styles.historyRow}>
            <Image style={styles.trendImg} source={require('../assets/images/tech_trends.png')}/>
            <Text style={styles.historyData}>Circlular Economy</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>18.06.2025</Text>
              <Text style={styles.dateTimeText}>10:38 AM</Text>
            </View>
        </View>

        <View style={styles.lastRow}>
            <Image style={styles.trendImg} source={require('../assets/images/social_trends.png')}/>
            <Text style={styles.historyData}>Labor Shortage</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>18.06.2025</Text>
              <Text style={styles.dateTimeText}>10:38 AM</Text>
            </View>
        </View>
    </View>
  )
}

export default ViewHistory

const styles = StyleSheet.create({
  history: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
  },
  historyText: {
    fontSize: 16,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily:'Aptos',
    padding:5,
  },
  historyData: {
    fontSize: 14,
    padding: 15,
    fontFamily:'Aptos',
  },
  historyRow:{
    flexDirection:'row',
    borderBottomWidth:2,
    alignItems:'center',
    padding:5,
    justifyContent: 'space-between',
  },
  lastRow: {
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    justifyContent: 'space-between',
  },
  dateTimeContainer: {
    flexDirection: 'column',
    marginLeft: 'auto',
    paddingRight: 15,
  },
  dateTimeText: {
    textAlign: "right",
    fontFamily: 'Aptos',
  },
  trendImg:{
    width:25,
    height:25,
    resizeMode:'contain',
  },
});