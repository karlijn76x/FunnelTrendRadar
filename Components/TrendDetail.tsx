import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
}

const TrendDetail: React.FC<PopupProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#FFFFFF', '#000000', '#5A136D']}
          locations={[0.37, 0.37, 0.374]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Circular Economy</Text>
          </View>

        <View style={styles.wholeMeta}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={[styles.iconCircle, { backgroundColor: "#f57c00" }]} />
              <Text style={styles.metaText}>Social</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="schedule" size={16} color="#000" />
              <Text style={styles.metaText}>3-5 years</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={styles.impactDots}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <Text style={styles.metaText}>Very High Impact</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="visibility" size={16} color="#000" />
              <Text style={styles.metaText}>91</Text>
            </View>
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
      </View>
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center", 
    gap: 20,
    borderWidth:2,
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
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  wholeMeta:{
    marginBottom: 30,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    gap: 80,
    paddingHorizontal: 40,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    justifyContent: 'flex-start',
  },
  metaText: {
    fontSize: 18,
    color: "black",
  },
  iconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  impactDots: {
    flexDirection: "row",
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
