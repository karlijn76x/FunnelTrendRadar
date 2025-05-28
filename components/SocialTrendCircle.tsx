import React from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

type ImpactLevel = 'low' | 'medium' | 'high' | 'veryHigh'; // Nieuw type toegevoegd

type Props = {
  impact: ImpactLevel;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
};

const impactSizes = {
  low: 35,
  medium: 55,
  high: 75,
  veryHigh: 90, 
};

const SocialTrendCircle: React.FC<Props> = ({ impact, onPress, style, opacity = 1 }) => {
  const size = impactSizes[impact];

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
