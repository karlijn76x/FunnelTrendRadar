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

interface PopupProps {
  visible: boolean;
  onClose: () => void;
}

const TrendDetail: React.FC<PopupProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Circular Economy</Text>
          </View>

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
        </View>
      </View>
    </Modal>
  );
};

export default TrendDetail;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 16,
    padding: 20,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#f57c00",
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f57c00",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: "#333",
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
    marginTop: 12,
    fontSize: 15,
    color: "#444",
  },
  image: {
    marginTop: 12,
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
});
