import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import TrendDetail from '../components/TrendDetail';
import DropdownComponent from '../components/Dropdown_menu';
import { useFonts } from 'expo-font';
import SocialTrendCircle from '../components/SocialTrendCircle';
import TechTrendCircle from '../components/TechTrendCircle';
import Legend from '../components/Legend';
import OnboardingPopup from '../components/OnboardingPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlButtons from '../components/ControlButtons';
import FallingAnimation from '../components/FallingAnimation';
import ViewHistory from '../components/ViewHistory';



export default function MainPage() {
  const [loaded, error] = useFonts({
    Aptos: require("../assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("../assets/fonts/Aptos-ExtraBold.ttf"),
    Aptos_Italic: require("../assets/fonts/Aptos-Italic.ttf")
  });

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
  const [animationFilterKey, setAnimationFilterKey] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCircles, setSelectedCircles] = useState<string[]>([]);
  

  const handleCirclePress = (circleName: string) => {
    if (compareMode) {
      setSelectedCircles((prev) => {
        if (prev.includes(circleName)) {
          console.log(`Deselecting circle: ${circleName}`);
          return prev.filter((name) => name !== circleName);
        } else if (prev.length < 2) {
          console.log(`Selecting circle: ${circleName}`);
          return [...prev, circleName];
        }
        console.log(`Cannot select more than two circles`);
        return prev;
      });
    } else {
      console.log(`Opening detail view for: ${circleName}`);
      setVisible(true);
    }
  };
 

  const handleComparePress = () => {
    setCompareMode(!compareMode);
    setSelectedCircles([]); // Reset selected circles when toggling compare mode
  };
  


  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (__DEV__) {
        // In development aalways resert (temperary)
        await AsyncStorage.removeItem('dontShowOnboarding');
        await AsyncStorage.setItem('appStartCount', '0');
      }
      try {
        // check if onboarding has been checked befor
        const startCountStr = await AsyncStorage.getItem('appStartCount');
        let startCount = startCountStr ? parseInt(startCountStr) : 0;
        startCount += 1;
        await AsyncStorage.setItem('appStartCount', startCount.toString());

        const dontShow = await AsyncStorage.getItem('dontShowOnboarding');

        if (dontShow === 'true') {
          if (startCount === 5) {
            
            setShowOnboarding(true);
            await AsyncStorage.setItem('dontShowOnboarding', 'false');

            setDontShowAgain(false);
          } else {
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
    checkOnboardingStatus();
  }, []);

  
  useEffect(() => {
    setAnimationFilterKey(prev => prev + 1);
  }, [selectedTrendType, selectedImpact, selectedTimeframe]);

  const handleDontShowAgainChange = async (value: boolean) => {
    setDontShowAgain(value);
    try {
      await AsyncStorage.setItem('dontShowOnboarding', value ? 'true' : 'false');
    } catch (e) {
      // error 
    }
  };
  
  const handleNext = () => {
    if (onboardingStep < 4) { 
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
  const shouldShowItem = (timeframe: string, trendType: 'social' | 'tech', impact: string) => {
    const typeMatch = trendType === 'social' ? shouldShowSocial() : shouldShowTech();
    return typeMatch && matchesTimeframe(timeframe) && matchesImpact(impact);
  };

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
                source={require('../assets/images/funnel_top.png')}
              />
              <FallingAnimation 
                delay={0} 
                targetX={100} 
                targetY={5} 
                fallDirection="left"
                shouldShow={shouldShowItem('5-10 years', 'tech', 'high')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 1, opacity: getTechOpacity('Autonomous Systems') }]}>
                  <TechTrendCircle
                    impact="high"
                    onPress={() => handleCirclePress('Outdoor Autonomous Systems')}
                    selected={selectedCircles.includes('Outdoor Autonomous Systems')}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Outdoor Autonomous Systems
                      </Text>
                    </View>
                  )}
                </View>
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={250} 
                targetY={30} 
                fallDirection="left"
                shouldShow={shouldShowItem('5-10 years', 'social', 'low')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 1, opacity: getSocialOpacity('Sustainability') }]}>
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
              </FallingAnimation>
            </View>

          {/* 3-5 years section */}
            <View>
              <Image
                style={{ width: 800, height: 100, resizeMode: 'cover' }}
                source={require('../assets/images/funnel_middle.png')}
              />
              <FallingAnimation 
                delay={0} 
                targetX={400} 
                targetY={-5} 
                fallDirection="right"
                shouldShow={shouldShowItem('3-5 years', 'tech', 'medium')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getTechOpacity('Artificial Intelligence') }]}>
                  <TechTrendCircle
                    impact="medium"
                    onPress={() => handleCirclePress('Generative AI')}
                    selected={selectedCircles.includes('Generative AI')}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Generative AI
                      </Text>
                    </View>
                  )}
                </View>
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={600} 
                targetY={-5} 
                fallDirection="right"
                shouldShow={shouldShowItem('3-5 years', 'social', 'very high')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 11, opacity: getSocialOpacity('Digitalization') }]}>
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
              </FallingAnimation>
            </View>

          {/* 0-3 years section */}
            <View style={{ position: 'relative' }}>
              <Image
                style={{ width: 700, height: 250, resizeMode: 'cover', zIndex: 0 }}
                source={require('../assets/images/funnel_bottom.png')}
              />
              <FallingAnimation 
                delay={0} 
                targetX={100} 
                targetY={10} 
                fallDirection="left"
                shouldShow={shouldShowItem('0-3 years', 'tech', 'medium')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getTechOpacity('Robotics') }]}>
                  <TechTrendCircle
                    impact="medium"
                    onPress={() => handleCirclePress('Humanoids')}
                    selected={selectedCircles.includes('Humanoids')}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Humanoids
                      </Text>
                    </View>
                  )}
                </View>
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={200} 
                targetY={90} 
                fallDirection="left"
                shouldShow={shouldShowItem('0-3 years', 'social', 'high')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getSocialOpacity('As-A-Service') }]}>
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
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={350} 
                targetY={50} 
                fallDirection="right"
                shouldShow={shouldShowItem('0-3 years', 'tech', 'low')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getTechOpacity('Digital & Cloud') }]}>
                  <TechTrendCircle
                    impact="low"
                    onPress={() => handleCirclePress('Cybersecurity')}
                    selected={selectedCircles.includes('Cybersecurity')}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        Cybersecurity
                      </Text>
                    </View>
                  )}
                </View>
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={400} 
                targetY={150} 
                fallDirection="right"
                shouldShow={shouldShowItem('0-3 years', 'social', 'medium')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getSocialOpacity('Labor Shortage and Regulations') }]}>
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
              </FallingAnimation>
              <FallingAnimation 
                delay={0} 
                targetX={430} 
                targetY={5} 
                fallDirection="right"
                shouldShow={shouldShowItem('0-3 years', 'tech', 'very high')}
                filterKey={`${animationFilterKey}`}
              >
                <View style={[styles.circleLabelContainer, { zIndex: 10, opacity: getTechOpacity('Other') }]}>
                  <TechTrendCircle
                    impact="veryHigh"
                    onPress={() => handleCirclePress('3D Printing')}
                    selected={selectedCircles.includes('3D Printing')}
                  />
                  {showTextLabels && (
                    <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                      <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                        3D Printing
                      </Text>
                    </View>
                  )}
                </View>
              </FallingAnimation>
            </View>
          
            {compareMode && selectedCircles.length === 2 ? (
            <View style={styles.compareTrendDetailsContainer}>
            {selectedCircles.map((circleName, index) => {
            console.log(`Rendering TrendDetail for: ${circleName}`);
          return (
           <TrendDetail
            key={index}
            visible={true}
            onClose={() => {
            setSelectedCircles((prev) => prev.filter((name) => name !== circleName));
           }}
           circleName={circleName}
           useModal={false}
      
          />
          );
          })}

  </View>
  ) : (
  <TrendDetail visible={visible} onClose={() => setVisible(false)} circleName="Cybersecurity" />
)}

        </View>
        <View style={styles.rightColumn}>
        <ControlButtons
         onShowTextPress={() => setShowTextLabels(!showTextLabels)}
         onComparePress={handleComparePress}
         showTextLabels={showTextLabels}
         compareMode={compareMode} 
       />
          <ViewHistory/>
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
  rightColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 15
  },
  circleLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
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
  compareTrendDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    marginTop: -500, 
  },
});