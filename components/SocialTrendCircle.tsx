import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type ImpactLevel = 'low' | 'medium' | 'high' | 'veryHigh'; // Nieuw type toegevoegd

type Props = {
  impact: ImpactLevel;
  onPress: () => void;
  style?: any;
};

const impactSizes = {
  low: 35,
  medium: 55,
  high: 75,
  veryHigh: 90, 
};

const SocialTrendCircle: React.FC<Props> = ({ impact, onPress, style }) => {
  const size = impactSizes[impact];

  return (
    <Pressable onPress={onPress} style={[style]}>
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
    backgroundColor: '#F57523',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  label: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SocialTrendCircle;
