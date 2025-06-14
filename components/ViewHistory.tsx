import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function ViewHistory() {
  return (
    <View style={styles.history}>
        <Text style={styles.historyText}>Recently viewed trends</Text>
        <Text style={styles.historyData}>The list is currently empty</Text>
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
    fontSize: 14,
    borderBottomWidth: 1,
    padding: 10,
  },
  historyData: {
    fontSize: 14,
    padding: 10,
  }
});