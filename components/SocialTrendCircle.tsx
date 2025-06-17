import React from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

type ImpactLevel = 'low impact' | 'medium impact' | 'high impact' | 'very high impact'; // Nieuw type toegevoegd

type Props = {
  impact: ImpactLevel;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  selected?: boolean;
};

const getSize = (impact: ImpactLevel): number => {
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

const SocialTrendCircle: React.FC<Props> = ({ impact, onPress, style, opacity = 1, selected = false }) => {
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
            selected ? styles.selectedCircle : styles.defaultCircle,
        ]}
      >
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
    defaultCircle: {
      backgroundColor: '#F57523', // Default color
    },
  selectedCircle: {
    backgroundColor: '#F5752380', // Light purple for selected state
  },
  label: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SocialTrendCircle;
