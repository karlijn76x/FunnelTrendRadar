import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type ImpactLevel = 'low' | 'medium' | 'high';

type Props = {
  impact: ImpactLevel;
  onPress: () => void;
};

const impactSizes = {
  low: 50,
  medium: 80,
  high: 120,
};

const SocialTrendCircle: React.FC<Props> = ({ impact, onPress }) => {
  const size = impactSizes[impact];

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: '#000',
          },
        ]}
      >
        <Text style={styles.label}>Social</Text>
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
  },
  label: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SocialTrendCircle;
