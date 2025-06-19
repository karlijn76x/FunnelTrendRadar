import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function ViewHistory() {
  return (
    <View style={styles.history}>
        <Text style={styles.historyText}>Recently viewed trends</Text>
        <View style={styles.historyRow}>
            <Image style={styles.trendImg} source={require('../assets/images/tech_trends.png')}/>
            <Text style={styles.historyData}>Cybersecurity</Text>
        </View>

        <View style={styles.historyRow}>
            <Image style={styles.trendImg} source={require('../assets/images/tech_trends.png')}/>
            <Text style={styles.historyData}>Circlular Economy</Text>
        </View>

        <View style={styles.lastRow}>
            <Image style={styles.trendImg} source={require('../assets/images/social_trends.png')}/>
            <Text style={styles.historyData}>Labor Shortage</Text>
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
    width:180,
  },
  historyText: {
    fontSize: 14,
    borderBottomWidth: 2,
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily:'Aptos',
    padding:5,
  },
  historyData: {
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal:5,
    fontFamily:'Aptos',
  },
  historyRow:{
    flexDirection:'row',
    borderBottomWidth:2,
    alignItems:'center',
    padding:5,
  },
  lastRow: {
    flexDirection:'row',
    alignItems:'center',
    padding:5,
  },
  trendImg:{
    width:25,
    height:25,
    resizeMode:'contain',
  },
});