import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


interface OnboardingPopupProps {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  dontShowAgain: boolean;
  setDontShowAgain: (value: boolean) => void;
  step: number; 
}

const PaginationDots: React.FC<{ totalSteps: number; currentStep: number }> = ({ totalSteps, currentStep }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i + 1 === currentStep ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({
  visible,
  onClose,
  onNext,
  dontShowAgain,
  setDontShowAgain,
  step,
}) => {
  let title = '';
  let subtitle = '';
  let sectionTitle = '';
  let description = '';
  let circles = null;

  switch (step) {
    case 1:
      title = 'Welcome to the Trend Funnel of\nVanderlande!';
      subtitle = 'Discover trends that could shape your work.';
      circles = (
        <Image
          source={require('../assets/images/vanderlande_logo.png')} 
          resizeMode="contain"
          style={styles.image}
        />
      );
      break;
    case 2:
      title = 'What you see';
      description = 'Each bubble’s size reflects its impact, \nwhile its color reveals the type of trend. \nThe lower in the funnel, the closer it is in time.';
      circles = (
        <View style={styles.circlesWrapper}>
          <View style={styles.column}>
            <View style={[styles.circle, { backgroundColor: '#5A136D', marginBottom: 20 }]} />
            <View style={[styles.circle, { backgroundColor: '#F57523' }]} />
          </View>
          <View style={[styles.circle, { backgroundColor: '#5A136D', marginLeft: 25, marginTop: 15 }]} />
        </View>
      );
      break;
    case 3:
      title = 'Use the filters';
      description = 'Want to see trends relevant to your\n department or interests? \nUse the filters above.';
      circles = (
        <View style={styles.filterLinesContainer}>
          <View style={styles.filterLine}>
            <View style={[styles.filterDot, { left: 25, top: -8 }]} />
          </View>
          <View style={styles.filterLine}>
            <View style={[styles.filterDot, { right: 20, top: -8 }]} />
          </View>
          <View style={styles.filterLine}>
            <View style={[styles.filterDot, { left: '40%', top: -8 }]} />
          </View>
        </View>
      );
      break;
    case 4:
      title = 'Explore further';
      description = 'Click on a bubble to learn more, or\n compare trends to discover new \nopportunities.';
      circles = (
        <View style={styles.clickCircleWrapper}>
          <View style={styles.clickArrowWrapper}>
            <View style={styles.clickArrowHead} />
            <View style={styles.clickArrowShaft} />
          </View>
          <View style={styles.clickCircle} />
        </View>
      );
      break;
    default:
      return null;
  }

  const isLastStep = step === 4;
  const buttonText = step === 1 ? 'Start' : isLastStep ? 'Done' : 'Next';
  const buttonAction = isLastStep ? onClose : onNext;

  // Position pages 
  let content;
  if (step === 1) {
    content = (
      <>
        {circles}
        <Text style={styles.title1}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </>
    );
  } else {
    content = (
      <>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        {circles}
        <Text style={styles.description}>{description}</Text>
      </>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {content}

          {/* Pagination Dots indicator */}
          {step >= 2 && step <= 4 && (
          <PaginationDots totalSteps={3} currentStep={step - 1} />
          )}


          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={buttonAction}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

            {/* Skip button alleen bij step 1 */}
            {step === 1 && (
             <TouchableOpacity
               style={[styles.button, { backgroundColor: '#FBA96B', marginTop: 10 }]}
               onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: 'black' }]}>Skip Info</Text>
             </TouchableOpacity>
           )}
              {/* Don't show again switch vanaf step 2 */}
            {step >= 2 && (
            <View style={styles.checkboxContainer}>
             <Switch
               value={dontShowAgain}
               onValueChange={setDontShowAgain}
               trackColor={{ false: '#ccc', true: '#FBA96B' }}
               thumbColor={dontShowAgain ? '#F57523' : '#f4f3f4'}
             />
             <Text style={[styles.checkboxLabel, { fontFamily: 'Aptos_Bold' }]}>
             Don't show this again
             </Text>
            </View>
            )}

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OnboardingPopup;

const styles = StyleSheet.create({
  // General popup styling
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    minHeight: 440,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Aptos_Bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Aptos_Bold',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Aptos_Italic',
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'Aptos_Bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 30,    
    fontSize: 14,
    fontFamily: 'Aptos_Bold',
  },
  //Case 1 styling
  circlesWrapper: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
  footer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9ECEE3',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Aptos_Bold',
  },
  //Case 2 styling
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  filterLinesContainer: {
    marginTop: 16,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterLine: {
    height: 3,
    backgroundColor: 'black',
    marginVertical: 20,
    width: '80%',
    position: 'relative',
    borderRadius: 1,
  },
  filterDot: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A136D',
    borderWidth: 1,
    borderColor: '#5A136D',
    top: -30,
  },
  //Case 3 styling
  clickCircleWrapper: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 120,
    height: 140,
  },
  clickCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F57523',
    borderWidth: 3,
    borderColor: 'black',
  },
  //Case 4 styling
  clickArrowWrapper: {
    position: 'absolute',
    top: 70,
    left: '50%',
    transform: [{ translateX: -18 }],
    alignItems: 'center',
    zIndex: 10,
  },
  clickArrowShaft: {
    width: 12,
    height: 50,
    backgroundColor: 'black',
  },
  clickArrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 24,
    borderRightWidth: 24,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
  },
  image: {
    width: 300,
    height: 150,
    marginTop: 20,
    marginBottom: 10,
  },

  // Styles for pagination dots
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -8,
    marginTop: 10
  },
  
  dot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: '#555555', 
  },
  inactiveDot: {
    backgroundColor: '#cccccc', 
  },
});
