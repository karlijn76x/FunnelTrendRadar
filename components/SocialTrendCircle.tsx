import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type ImpactLevel = 'low' | 'medium' | 'high';

type Props = {
  impact: ImpactLevel;
  onPress: () => void;
  style?: any;  // style prop toegevoegd
};

const impactSizes = {
  low: 40,
  medium: 60,
  high: 80,
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
    borderWidth: 1,
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
