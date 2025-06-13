import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

type Impact = 'low' | 'medium' | 'high' | 'veryHigh'; 

type Props = {
  impact: Impact;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  selected?: boolean;
};

const getSize = (impact: Impact): number => {
  switch (impact) {
    case 'low':
      return 35;
    case 'medium':
      return 55;
    case 'high':
      return 75;
    case 'veryHigh':
      return 90;
    default:
      return 50;
  }
};

const TechTrendCircle: React.FC<Props> = ({ impact, onPress, style, opacity = 1, selected = false }) => {
  const size = getSize(impact);

  return (
    <Pressable onPress={onPress} style={[style, { opacity }]} disabled={opacity < 1}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          selected ? styles.selectedCircle : styles.defaultCircle, // Apply selected or default style
        ]}
      >
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultCircle: {
    backgroundColor: '#5A136D', // Default color
  },
  selectedCircle: {
    backgroundColor: '#D8BFD8', // Light purple for selected state
  },
 
});

export default TechTrendCircle;
