import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

type Impact = 'low' | 'medium' | 'high';

type Props = {
  impact: Impact;
  onPress: () => void;
  style?: any;  // style prop toevoegen zodat je externe styles kunt doorgeven
};

const getSize = (impact: Impact): number => {
  switch (impact) {
    case 'low':
      return 40;
    case 'medium':
      return 60;
    case 'high':
      return 80;
    default:
      return 50;
  }
};

const TechTrendCircle: React.FC<Props> = ({ impact, onPress, style }) => {
    const size = getSize(impact);
  
    return (
      <Pressable onPress={onPress} style={[{ zIndex: 1 }, style]}>
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
