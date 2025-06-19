import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  useModal?: boolean;
  initialTrendIndex?: number;
}

const TrendDetail: React.FC<PopupProps> = ({
  visible,
  onClose,
  currentTrendIndex,
  trends,
  useModal = true, // Default to Modal behavior
  

}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [currentTrend, setCurrentTrend] = useState(0);
  const [currentTrendImpact, setCurrentTrendImpact] = useState(0);
  const [currentTrendTrendType, setCurrentTrendTrendType] = useState('');
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex === trends.length-1) {
        setCurrentIndex(0);
    } else {
        setCurrentIndex(currentIndex+1);
    }
  };

  const handlePrevious = () => {
  if (currentIndex === 0) {
      setCurrentIndex(trends.length-1);
  } else {
    setCurrentIndex(currentIndex-1);
  }
  };

    useEffect(() => {
        if (currentIndex !== prevIndex) {
            setCurrentTrend(trends[currentIndex]);
            setPrevIndex(currentIndex);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === -1) {
            setCurrentTrend(trends[currentTrendIndex]);
            setCurrentIndex(currentTrendIndex);
        } else {
            setCurrentTrend(trends[currentIndex]);
        }
        setCurrentTrend(trends[currentTrendIndex]);
        setCurrentIndex(currentTrendIndex);
        setPrevIndex(currentTrendIndex);
    }, [currentTrendIndex]);

    useEffect(() => {
        if (currentTrend?.impact?.toLowerCase() === 'low impact') {
            setCurrentTrendImpact(1);
        } else if (currentTrend?.impact?.toLowerCase() === 'medium impact') {
            setCurrentTrendImpact(2);
        } else if (currentTrend?.impact?.toLowerCase() === 'high impact') {
            setCurrentTrendImpact(3);
        } else if (currentTrend?.impact?.toLowerCase() === 'very high impact') {
            setCurrentTrendImpact(4);
        }
      if (currentTrend?.trendType === 0) {
          setCurrentTrendTrendType('Social');
      } else if (currentTrend?.trendType === 1) {
          setCurrentTrendTrendType('Technology');
      }
    }, [currentTrend]);

  useEffect(() => {
    if (visible) {
      StatusBar.setHidden(true);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 30,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      StatusBar.setHidden(false);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 30,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);


  let content = null
  if (currentTrendTrendType === 'Social') {
      content = (
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.container}>
            <TouchableOpacity style={styles.orangeNavButton} onPress={handlePrevious}>
              <MaterialIcons name="arrow-back-ios" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.orangeNavButton, styles.rightNavButton]} onPress={handleNext}>
              <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
            </TouchableOpacity>

            <View style={styles.whiteSection}>
              <TouchableOpacity style={styles.orangeCloseButton} onPress={onClose}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>{currentTrend?.title}</Text>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <View style={[styles.iconRectangle, { backgroundColor: "#F57523" }]} />
                  <Text style={styles.metaText}>{currentTrendTrendType}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={16} color="#000" />
                  <Text style={styles.metaText}>{currentTrend?.timeFrame}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <View style={[styles.impactDots, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                    <View style={{ flexDirection: 'column', gap: 4 }}>
                      {[...Array(Math.ceil(currentTrendImpact / 2))].map((_, i) => (
                        <View key={i} style={{ flexDirection: 'row', gap: 4 }}>
                          <View style={styles.dot} />
                          <View style={styles.dot} />
                        </View>
                      ))}
                    </View>
                    <Text style={styles.metaText}>{currentTrend?.impact}</Text>
                  </View>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="visibility" size={16} color="#000" />
                  <Text style={styles.metaText}>{currentTrend?.views}</Text>
                </View>
              </View>
            </View>

            <View style={styles.border} />

            <View style={styles.orangeSection}>
              <Text style={styles.blackDescription}>
                {currentTrend?.description}
              </Text>

              <Image
                source={require("../assets/images/Circular-economy.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </Animated.View>
      );
      if (useModal) {
        return (
          <Modal visible={visible} transparent animationType="none">
            <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
              {content}
            </Animated.View>
          </Modal>
        );
    }
  } else {
    content = (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.purpleNavButton} onPress={handlePrevious}>
            <MaterialIcons name="arrow-back-ios" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.purpleNavButton, styles.rightNavButton]} onPress={handleNext}>
            <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.whiteSection}>
            <TouchableOpacity style={styles.purpleCloseButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>{currentTrend?.title}</Text>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <View style={[styles.iconRectangle, { backgroundColor: "#5A136D" }]} />
                <Text style={styles.metaText}>{currentTrendTrendType}</Text>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={16} color="#000" />
                <Text style={styles.metaText}>{currentTrend?.timeFrame}</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <View style={[styles.impactDots, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                  <View style={{ flexDirection: 'column', gap: 4 }}>
                    {[...Array(Math.ceil(currentTrendImpact / 2))].map((_, i) => (
                      <View key={i} style={{ flexDirection: 'row', gap: 4 }}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                      </View>
                    ))}
                  </View>
                  <Text style={styles.metaText}>{currentTrend?.impact}</Text>
                </View>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="visibility" size={16} color="#000" />
                <Text style={styles.metaText}>{currentTrend?.views}</Text>
              </View>
            </View>
          </View>

          <View style={styles.border} />

          <View style={styles.purpleSection}>
            <Text style={styles.whiteDescription}>
              {currentTrend?.description}
            </Text>

            <Image
              source={require("../assets/images/Circular-economy.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </Animated.View>
    );
    if (useModal) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
            {content}
          </Animated.View>
        </Modal>
      );
    }
  }

  // Inline rendering for compare mode
  return <View style={styles.inlineContainer}>{content}</View>;
};

export default TrendDetail;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: 650,
    height: 650,
    borderRadius: 350,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    position: 'relative',
  },
  inlineContainer: {
    margin: 10, 
  },
  whiteSection: {
    height: '37%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  border: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
  },
  purpleSection: {
    height: '63%',
    backgroundColor: '#5A136D',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
    orangeSection: {
      height: '63%',
      backgroundColor: '#F57523',
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
    },
  purpleCloseButton: {
    position: "absolute",
    right: 100,
    top: 100,
    backgroundColor: "#5A136D",
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
    orangeCloseButton: {
      position: "absolute",
      right: 100,
      top: 100,
      backgroundColor: "#F57523",
      borderRadius: 20,
      padding: 4,
      zIndex: 1,
    },
  header: {
    marginTop:60,
    marginBottom:45,
    width: 400,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    fontFamily:'Aptos',
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '60%',
    marginLeft: '10%',
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: 'flex-start',
    width: '45%',
  },
  metaText: {
    fontSize: 18,
    color: "black",
    textAlign: 'center',
    fontFamily:'Aptos'
  },
  iconRectangle: {
    width: 40,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  impactDots: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  whiteDescription: {
    width: 400,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily:'Aptos',
  },
    blackDescription: {
      width: 400,
      fontSize: 18,
      color: "black",
      textAlign: "center",
      fontFamily:'Aptos',
    },
  image: {
    marginTop: 12,
    height: 150,
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
  },
  purpleNavButton: {
    position: "absolute",
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: "#5A136D",
    borderRadius: 25,
    padding: 10,
    zIndex: 2,
  },
    orangeNavButton: {
      position: "absolute",
      left: 20,
      top: '50%',
      transform: [{ translateY: -20 }],
      backgroundColor: "#F57523",
      borderRadius: 25,
      padding: 10,
      zIndex: 2,
    },
  rightNavButton: {
    left: 'auto',
    right: 20,
  },
});
