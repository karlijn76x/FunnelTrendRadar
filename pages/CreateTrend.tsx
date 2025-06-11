import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NavBarEdit from '../components/NavBarEditTrends'

const CreateTrend = () => {
  return (
    <View style={styles.container}>
      <NavBarEdit />
      <View style={styles.content}>
        <Text style={styles.title}>Create a Trend</Text>
      </View>
    </View>
  )
}

export default CreateTrend

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center'
  },
  title: {
    fontSize: 48,
    fontFamily: 'Aptos_Bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
})