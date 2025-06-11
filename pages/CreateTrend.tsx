import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NavBarEdit from '../components/NavBarEditTrends'

const CreateTrend = () => {
  return (
    <View>
      <NavBarEdit />
    </View>
  )
}

export default CreateTrend

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})