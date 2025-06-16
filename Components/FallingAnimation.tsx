import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Handles animation when filters change
interface FallingAnimationProps {
  targetX: number;
  targetY: number;
  delay: number;
  children: React.ReactNode;
  fallDirection?: 'left' | 'right';
  shouldShow: boolean;
  filterKey: string;  // Used to detect filter changes
}

const FallingAnimation: React.FC<FallingAnimationProps> = ({ 
  targetX, 
  targetY, 
  delay, 
  children,
  fallDirection,
  shouldShow,
  filterKey,
}) => {
  // Refs for animation values and filter state tracking
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const previousFilterKey = useRef(filterKey);  // Track previous filter state
  const isInitialMount = useRef(true);
  
  // Determine which side to fall from
  const isLeftSide = fallDirection ? fallDirection === 'left' : targetX < screenWidth / 2;
  
  // Calculate starting position above screen
  const getStartPosition = () => {
    const verticalStart = -360;
    
    // Offset horizontally from target to create angled fall effect
    const horizontalStart = isLeftSide 
      ? targetX - 150
      : targetX + 150;
    
    return {
      x: horizontalStart,
      y: verticalStart
    };
  };

  // Calculate position to fall off screen
  const getFallDownPosition = () => {
    return {
      x: 350,
      y: screenHeight + 100
    };
  };

  // Animate item falling to target position
  const animateToTarget = (animationDelay = 0) => {
    const { x: startX, y: startY } = getStartPosition();
    
    position.setValue({ x: startX, y: startY });
    opacity.setValue(shouldShow ? 1 : 0);
    
    if (shouldShow) {
      // Create smooth falling animation to target position
      Animated.sequence([
        Animated.delay(animationDelay),
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
          Animated.timing(opacity, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  };

  // Animate item falling off screen
  const animateFallDown = () => {
    const { x: fallX, y: fallY } = getFallDownPosition();
    
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: fallX,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(position.y, {
        toValue: fallY,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle filter changes and visibility
  useEffect(() => {
    if (isInitialMount.current) {
      // Initial load - animate to target
      isInitialMount.current = false;
      animateToTarget(delay);
    } else if (previousFilterKey.current !== filterKey) {
      // Filter changed - fall down then reappear
      previousFilterKey.current = filterKey;
      
      if (shouldShow) {
        animateFallDown();
        setTimeout(() => {
          animateToTarget(200);
        }, 1200);
      } else {
        animateFallDown();
      }
    } else if (!shouldShow) {
      // Item should be hidden
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Item should be visible
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldShow, filterKey]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        zIndex: 1000,
        transform: [
          { translateX: position.x },
          { translateY: position.y },
        ],
        opacity: opacity,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FallingAnimation;