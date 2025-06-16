import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Props for the control buttons component
interface ControlButtonsProps {
  onComparePress: () => void;
  onShowTextPress: () => void;
  showTextLabels: boolean;
  compareMode: boolean;
}

const ControlButtons = ({ onShowTextPress, onComparePress, showTextLabels, compareMode }: ControlButtonsProps) => {
  return (
    <View style={styles.container}>
      {/* Compare button */}
      <Pressable
       style={[styles.button, compareMode && styles.activeCompareButton]}
       onPress={onComparePress}
     >
        <Text style={styles.buttonText}>Compare</Text>
      </Pressable>
      
      {/* Text visibility toggle button - shows/hides text labels */}
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
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 10,
    width: 150
  },
  button: {
    backgroundColor: '#FFEFDF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    minHeight: 50
  },
  // Active state styling for compare button
  activeCompareButton: {
    borderColor: 'purple',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Aptos_Bold',
    color: '#000000',
  },
});

export default ControlButtons;