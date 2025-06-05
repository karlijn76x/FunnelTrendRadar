import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import TrendDetail from './components/TrendDetail';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponent from './components/Dropdown_menu';
import { useFonts } from 'expo-font';
import SocialTrendCircle from './components/SocialTrendCircle';
import TechTrendCircle from './components/TechTrendCircle';
import Legend from './components/Legend';
import OnboardingPopup from './components/OnboardingPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlButtons from './components/ControlButtons';
import trendsApi from './apis/TrendsApi';



export default function App() {
  const [loaded, error] = useFonts({
    Aptos: require("./assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("./assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("./assets/fonts/Aptos-ExtraBold.ttf")
  });

  const [trends, setTrends] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedTrendType, setSelectedTrendType] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [selectedSocialKeyTrend, setSelectedSocialKeyTrend] = useState<string | null>(null);
  const [selectedTechFocusArea, setSelectedTechFocusArea] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [showTextLabels, setShowTextLabels] = useState(false);


  useEffect(() => {
    const retrieveTrends = async () => {
        await trendsApi.getAllTrends()
            .then(data => setTrends(data))
            .catch(error => console.log(error));
    };
    retrieveTrends();
    const checkOnboardingStatus = async () => {
      try {
        // Retrieve the number of times the app has been started
        const startCountStr = await AsyncStorage.getItem('appStartCount');
        let startCount = startCountStr ? parseInt(startCountStr) : 0;
        startCount += 1;
         // Save the updated start count
        await AsyncStorage.setItem('appStartCount', startCount.toString());
         // Check if the user chose not to show onboarding again
        const dontShow = await AsyncStorage.getItem('dontShowOnboarding');
        // Show onboarding again on the 5th app start
        if (dontShow === 'true') {
          if (startCount === 5) {
            // Reset the flag so onboarding will be shown again
            setShowOnboarding(true);
            await AsyncStorage.setItem('dontShowOnboarding', 'false');
             // Skip onboarding if it's not the 5th start
            setDontShowAgain(false);
          } else {
             // Show onboarding if the user hasn't opted out
            setShowOnboarding(false);
          }
        } else {
          setShowOnboarding(true);
        }
  
      } catch (e) {
        setShowOnboarding(true);
      } finally {
        setOnboardingChecked(true);
      }
    };
    // Run onboarding check on component mount
    checkOnboardingStatus();
  }, []);
  
  
  

  const handleDontShowAgainChange = async (value: boolean) => {
    setDontShowAgain(value);
    try {
      await AsyncStorage.setItem('dontShowOnboarding', value ? 'true' : 'false');
    } catch (e) {
      // error 
    }
  };
  
  const handleNext = () => {
    if (onboardingStep < 3) { 
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false); 
    }
  };



  const shouldShowSocial = () =>
    selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '2';
  const shouldShowTech = () =>
    selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '3';
  const matchesImpact = (value: string) => {
    const map: { [key: string]: string } = {
      'low': '2',
      'medium': '3',
      'high': '4',
      'very high': '5',
    };
    return selectedImpact === null || selectedImpact === '1' || selectedImpact === map[value.toLowerCase()];
  };
  const matchesTimeframe = (value: string) => {
    const map: { [key: string]: string } = {
      '0-3 years': '2',
      '3-5 years': '3',
      '5-10 years': '4',
    };
    return selectedTimeframe === null || selectedTimeframe === '1' || selectedTimeframe === map[value.toLowerCase()];
  };
  const matchesSocialKeyTrend = (trendName: string) => {
    const map: Record<string, string> = {
      'Labor Shortage and Regulations': '2',
      'Digitalization': '3',
      'As-A-Service': '4',
      'Sustainability': '5',
    };
    return selectedSocialKeyTrend === null || selectedSocialKeyTrend === '1' || selectedSocialKeyTrend === map[trendName];
  };
  const matchesTechFocusArea = (areaName: string) => {
    const map: Record<string, string> = {
      'Autonomous Systems': '2',
      'Artificial Intelligence': '3',
      'Robotics': '4',
      'Digital & Cloud': '5',
      'Other': '6',
    };
    return selectedTechFocusArea === null || selectedTechFocusArea === '1' || selectedTechFocusArea === map[areaName];
  };
  const getSocialOpacity = (trendName: string) => 
    matchesSocialKeyTrend(trendName) ? 1 : 0.15;
  const getTechOpacity = (areaName: string) =>
    matchesTechFocusArea(areaName) ? 1 : 0.15;

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      {onboardingChecked && (
  <OnboardingPopup
    visible={showOnboarding}
    step={onboardingStep}
    onClose={() => setShowOnboarding(false)}
    onNext={handleNext}
    dontShowAgain={dontShowAgain}
    setDontShowAgain={handleDontShowAgainChange}
  />
)}


        <DropdownComponent
          onTrendTypeChange={setSelectedTrendType}
          onImpactChange={setSelectedImpact}
          onTimeframeChange={setSelectedTimeframe}
          onSocialKeyTrendChange={setSelectedSocialKeyTrend}
          onTechFocusAreaChange={setSelectedTechFocusArea}
        />
      <View style={styles.row}>
        <View style={styles.legend}>
            <Legend />
        </View>
        <View style={styles.funnelStyle}>
          {/* 5-10 years section */}
            <View>
              <Image
                style={{ width: 900, height: 105, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_top.png')}
              />
              {trends.map(trend => (
                  <View>
                      {matchesTimeframe('5-10 years') && shouldShowTech() && matchesImpact('high') && (
                        <View style={[styles.circleLabelContainer, { position: 'absolute', top: 5, left: 100, zIndex: 1, opacity: getTechOpacity('Autonomous Systems') }]}>
                          <TechTrendCircle
                            impact="high"
                            onPress={() => setVisible(true)}
                          />
                          {showTextLabels && (
                            <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                              <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                                Outdoor Autonomous Systems
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                      {matchesTimeframe('5-10 years') && shouldShowSocial() && matchesImpact('low') && (
                        <View style={[styles.circleLabelContainer, { position: 'absolute', top: 30, left: 250, zIndex: 1, opacity: getSocialOpacity('Sustainability') }]}>
                          <SocialTrendCircle
                            impact="low"
                            onPress={() => setVisible(true)}
                          />
                          {showTextLabels && (
                            <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                              <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1}>
                                Local for Local
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                  </View>
              ))}
            </View>

          {/* 3-5 years section */}
            <View>
              <Image
                style={{ width: 800, height: 100, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_middle.png')}
              />
              {matchesTimeframe('3-5 years') && shouldShowTech() && matchesImpact('medium') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: -5, left: 400, zIndex: 10, opacity: getTechOpacity('Artificial Intelligence') }]}>
                  <TechTrendCircle
                    impact="medium"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Generative AI
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {matchesTimeframe('3-5 years') && shouldShowSocial() && matchesImpact('very high') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: -5, left: 600, zIndex: 11, opacity: getSocialOpacity('Digitalization') }]}>
                  <SocialTrendCircle
                    impact="veryHigh"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                      <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1}>
                        Privacy & Security
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>

          {/* 0-3 years section */}
            <View style={{ position: 'relative' }}>
              <Image
                style={{ width: 700, height: 250, resizeMode: 'cover', zIndex: 0 }}
                source={require('./assets/images/funnel_bottom.png')}
              />
              {matchesTimeframe('0-3 years') && shouldShowTech() && matchesImpact('medium') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: 10, left: 100, zIndex: 10, opacity: getTechOpacity('Robotics') }]}>
                  <TechTrendCircle
                    impact="medium"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Humanoids
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {matchesTimeframe('0-3 years') && shouldShowSocial() && matchesImpact('high') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: 90, left: 200, zIndex: 10, opacity: getSocialOpacity('As-A-Service') }]}>
                  <SocialTrendCircle
                    impact="high"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                      <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1}>
                        Everything as a Service
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {matchesTimeframe('0-3 years') && shouldShowTech() && matchesImpact('low') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: 50, left: 350, zIndex: 10, opacity: getTechOpacity('Digital & Cloud') }]}>
                  <TechTrendCircle
                    impact="low"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Cybersecurity
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {matchesTimeframe('0-3 years') && shouldShowSocial() && matchesImpact('medium') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: 150, left: 400, zIndex: 10, opacity: getSocialOpacity('Labor Shortage and Regulations') }]}>
                  <SocialTrendCircle
                    impact="medium"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                      <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1}>
                        Changing Work
                      </Text>
                    </View>
                  )}
                </View>
              )}
              {matchesTimeframe('0-3 years') && shouldShowTech() && matchesImpact('very high') && (
                <View style={[styles.circleLabelContainer, { position: 'absolute', top: 5, left: 430, zIndex: 10, opacity: getTechOpacity('Other') }]}>
                  <TechTrendCircle
                    impact="veryHigh"
                    onPress={() => setVisible(true)}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        3D Printing
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          <TrendDetail visible={visible} onClose={() => setVisible(false)} />
        </View>
        <View style={styles.controlButtons}>
          <ControlButtons
          onShowTextPress={() => setShowTextLabels(!showTextLabels)}
          onComparePress={() => {}}
          showTextLabels={showTextLabels}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  funnelStyle: { 
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    padding: 20
  },
  legend: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  controlButtons: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: 173
  },
  circleLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    bottom: -10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  labelText: {
    fontFamily: 'Aptos_Bold',
    fontSize: 12,
    color: 'black',
  },
});