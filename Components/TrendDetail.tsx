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

interface Trend {
  title: string;
  category: string;
  timeframe: string;
  impact: number;
  views: number;
  description: string;
  image: any;
}

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  circleName: string;
  useModal?: boolean;
  initialTrendIndex?: number;
}

const trends: Trend[] = [
  {
    title: "Circular Economy",
    category: "Technology",
    timeframe: "3-5 years",
    impact: 4,
    views: 91,
    description: "Circularity aims to create a closed-loop system where resources are reused, recycled, and repurposed, minimizing waste and environmental impact.",
    image: require("../assets/images/Circular-economy.jpg")
  },
  {
    title: "Sustainable Energy",
    category: "Technology",
    timeframe: "5-10 years",
    impact: 4,
    views: 85,
    description: "The transition to renewable energy sources accelerates as solar, wind, and other sustainable technologies become more efficient and cost-effective.",
    image: require("../assets/images/Circular-economy.jpg") 
  }
];

const TrendDetail: React.FC<PopupProps> = ({
  visible,
  onClose,
  circleName,
  initialTrendIndex = 0,
  useModal = true, // Default to Modal behavior
  

}) => {
  const [currentIndex, setCurrentIndex] = useState(initialTrendIndex);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const currentTrend = trends[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trends.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + trends.length) % trends.length);
  };

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


  const content = (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <MaterialIcons name="arrow-back-ios" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, styles.rightNavButton]} onPress={handleNext}>
          <MaterialIcons name="arrow-forward-ios" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.whiteSection}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>{circleName}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={[styles.iconRectangle, { backgroundColor: "#5A136D" }]} />
              <Text style={styles.metaText}>{currentTrend.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={16} color="#000" />
              <Text style={styles.metaText}>{currentTrend.timeframe}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={[styles.impactDots, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                <View style={{ flexDirection: 'column', gap: 4 }}>
                  {[...Array(Math.ceil(currentTrend.impact / 2))].map((_, i) => (
                    <View key={i} style={{ flexDirection: 'row', gap: 4 }}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                  ))}
                </View>
                <Text style={styles.metaText}>Very High Impact</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="visibility" size={16} color="#000" />
              <Text style={styles.metaText}>{currentTrend.views}</Text>
            </View>
          </View>
        </View>

        <View style={styles.border} />

        <View style={styles.purpleSection}>
          <Text style={styles.description}>
            {currentTrend.description}
          </Text>

          <Image
            source={currentTrend.image}
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
    borderWidth: 2,
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
  closeButton: {
    position: "absolute",
    right: 100,
    top: 100,
    backgroundColor: "#5A136D",
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
  header: {
    marginTop:60,
    marginBottom:45,
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
  description: {
    width: 400,
    fontSize: 18,
    color: "white",
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
  navButton: {
    position: "absolute",
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: "#5A136D",
    borderRadius: 25,
    padding: 10,
    zIndex: 2,
  },
  rightNavButton: {
    left: 'auto',
    right: 20,
  },
});
