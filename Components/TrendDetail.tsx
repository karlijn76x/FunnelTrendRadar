import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
}

const TrendDetail: React.FC<PopupProps> = ({ visible, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#FFFFFF', '#000000', '#5A136D']}
            locations={[0.37, 0.37, 0.374]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Circular Economy</Text>
            </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <View style={[styles.iconRectangle, { backgroundColor: "#f57c00" }]} />
                  <Text style={styles.metaText}>Social</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={16} color="#000" />
                  <Text style={styles.metaText}>3-5 years</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <View style={[styles.impactDots, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                    <View style={{ flexDirection: 'column', gap: 4 }}>
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                      </View>
                      <View style={{ flexDirection: 'row', gap: 4 }}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                      </View>
                    </View>
                    <Text style={styles.metaText}>Very High Impact</Text>
                  </View>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="visibility" size={16} color="#000" />
                  <Text style={styles.metaText}>91</Text>
                </View>
              </View>

            <Text style={styles.description}>
              Circularity aims to create a closed-loop system where resources are
              reused, recycled, and repurposed, minimizing waste and environmental
              impact.
            </Text>

            <Image
              source={require("../assets/images/Circular-economy.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
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
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  gradient: {
    width: '100%',
    height: '100%',
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
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '50%',
    marginVertical: -15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: 'flex-start',
  },
  metaText: {
    fontSize: 18,
    color: "black",
    textAlign: 'center',
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
  },
  image: {
    marginTop: 12,
    height: 150,
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
  },
});
