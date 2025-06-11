import React from 'react';
import { View, StyleSheet, Pressable, Text, StyleProp, ViewStyle } from 'react-native';

type Impact = 'low impact' | 'medium impact' | 'high impact' | 'very high impact';

type Props = {
  impact: Impact;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
};

const getSize = (impact: Impact): number => {
  switch (impact.toLowerCase()) {
    case 'low impact':
      return 15;
    case 'medium impact':
      return 25;
    case 'high impact':
      return 35;
    case 'very high impact':
      return 45;
    default:
      return 50;
  }
};

const TechTrendCircle: React.FC<Props> = ({ impact, onPress, style, opacity = 1 }) => {
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
