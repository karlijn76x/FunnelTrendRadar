import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  size: number;
  onPress: () => void;
};

const SocialTrendCircle: React.FC<Props> = ({ size, onPress }) => {
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
            borderColor: '#000', // zwarte rand
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
    backgroundColor: '#F57523', // oranje kleur
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SocialTrendCircle;
