import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

interface OnboardingPopupProps {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  dontShowAgain: boolean;
  setDontShowAgain: (value: boolean) => void;
}

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({
  visible,
  onClose,
  onNext,
  dontShowAgain,
  setDontShowAgain,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Welcome to the Trend Funnel of Vanderlande!</Text>
          <Text style={styles.subtitle}>Discover trends that could shape your work.</Text>

          <Text style={styles.sectionTitle}>What you see</Text>
          <Text style={styles.description}>
            Each bubble is a trend. The color and size show the impact. The lower in the funnel, the closer in time.
          </Text>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View style={styles.checkboxContainer}>
              <Switch
                value={dontShowAgain}
                onValueChange={setDontShowAgain}
              />
              <Text style={styles.checkboxLabel}>Don't show this again</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OnboardingPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4B9DEA',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
});
