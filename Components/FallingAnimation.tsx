import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface FallingAnimationProps {
  targetX: number;
  targetY: number;
  delay: number;
  children: React.ReactNode;
  fallDirection?: 'left' | 'right';
}

const FallingAnimation: React.FC<FallingAnimationProps> = ({ 
  targetX, 
  targetY, 
  delay, 
  children,
  fallDirection,
}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const isLeftSide = fallDirection ? fallDirection === 'left' : targetX < screenWidth / 2;
  
  const getStartPosition = () => {
    const verticalStart = -360;
    
    const horizontalStart = isLeftSide 
      ? targetX - 150
      : targetX + 150;
    
    return {
      x: horizontalStart,
      y: verticalStart
    };
  };

  useEffect(() => {
    const { x: startX, y: startY } = getStartPosition();
    
    position.setValue({ x: startX, y: startY });
    
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(position.x, {
          toValue: targetX,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(position.y, {
          toValue: targetY,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
});

export default FallingAnimation;