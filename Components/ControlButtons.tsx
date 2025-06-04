import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const ControlButtons = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Compare</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Show Text</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  button: {
    backgroundColor: '#FFEFDF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Aptos_Bold',
    color: '#000000',
  },
});

export default ControlButtons;