import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface FallingAnimationProps {
  targetX: number;
  targetY: number;
  delay: number;
  children: React.ReactNode;
}

const FallingAnimation: React.FC<FallingAnimationProps> = ({ 
  targetX, 
  targetY, 
  delay, 
  children,
}) => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    position.setValue({ x: targetX - 100, y: -100 });
    
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(position, {
        toValue: { x: targetX, y: targetY },
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, position.getLayout()]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default FallingAnimation;