import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface ControlButtonsProps {
  onComparePress: () => void;
  onShowTextPress: () => void;
  showTextLabels: boolean;
}

const ControlButtons = ({ onComparePress, onShowTextPress, showTextLabels }: ControlButtonsProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onComparePress}>
        <Text style={styles.buttonText}>Compare</Text>
      </Pressable>
      
      <Pressable style={styles.button} onPress={onShowTextPress}>
        <Text style={styles.buttonText}>
          {showTextLabels ? 'Hide Text' : 'Show Text'}
        </Text>
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