import React from 'react';
import { View, StyleSheet, Pressable, Text, StyleProp, ViewStyle } from 'react-native';

type Impact = 'low' | 'medium' | 'high' | 'veryHigh'; 

type Props = {
  impact: Impact;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
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

const TechTrendCircle: React.FC<Props> = ({ impact, onPress, style, opacity = 1 }) => {
  const size = getSize(impact);

  return (
    <Pressable onPress={onPress} style={[{ zIndex: 1 }, style]} disabled={opacity < 1}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#5A136D',
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TechTrendCircle;
