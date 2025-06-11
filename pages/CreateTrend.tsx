import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import NavBarEdit from '../components/NavBarEditTrends'

const CreateTrend = () => {
  return (
    <View style={styles.container}>
      <NavBarEdit />
      <View style={styles.content}>
        <Text style={styles.title}>Create a Trend</Text>

        <View style={styles.section}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#727272"
            />
        </View>
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
  section: {
    marginBottom: 24,
    width: 900
  },
  label: {
    fontSize: 24,
    fontFamily: 'Aptos',
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 20,
    fontFamily: 'Aptos',
    color: '#000',
    backgroundColor: '#FFEFDF',
  },
})