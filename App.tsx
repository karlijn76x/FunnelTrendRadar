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
  const [leftList, setLeftList] = useState([]);
  const [topList, setTopList] = useState([]);
  const [topDots, setTopDots] = useState([]);
  const [middleDots, setMiddleDots] = useState([]);
  const [bottomDots, setBottomDots] = useState([]);
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

  useEffect(() => {
    getDots();
  }, [trends, showTextLabels, selectedTrendType, selectedImpact, selectedTimeframe, selectedSocialKeyTrend, selectedTechFocusArea]);
  
  const getDots = () => {
      let newTopDots = [];
      let newMiddleDots = [];
      let newBottomDots = [];
        let newLeftList = [];
        let newTopList = [];

      if (leftList.length > 0) {
          newLeftList = leftList;
          newTopList = topList;
      }
      for (let i = 0; i < trends.length; i++) {
          let left = 0;
          let top = 0;
          let dot = null;

          if (leftList.length > 0) {
              left = newLeftList[i];
              top = newTopList[i];
          } else {
              let circleSize = 0;
              let height = 0;
              let width = 0;
              let overlaps = false;
              switch (trends[i].impact.toLowerCase()) {
                  case 'low impact': {
                      circleSize = 15;
                      break;
                  }
                  case 'medium impact': {
                      circleSize = 25;
                      break;
                  }
                  case 'high impact': {
                      circleSize = 35;
                      break;
                  }
                  case 'very high impact': {
                      circleSize = 45;
                      break;
                  }
              }
              switch (trends[i].timeFrame.toLowerCase()) {
                  case '5-10 years': {
                      width = 800;
                      height = 105;
                      break;
                  }
                  case '3-5 years': {
                      width = 640;
                      height = 100;
                      break;
                  }
                  case '0-3 years': {
                      width = 350;
                      height = 250;
                      break;
                  }
              }

              left = Math.round(Math.random() * (width - circleSize));
              top = Math.round(Math.random() * (height - circleSize));

              for (let i = 0; i < newLeftList.length; i++) {
                  if (newLeftList[i] > left - circleSize && newLeftList[i] < left + circleSize && newTopList[i] > top - circleSize && newTopList[i] < top + circleSize) {
                      overlaps = true;
                  }
              }
              while (overlaps) {
                left = Math.round(Math.random() * (width - circleSize));
                top = Math.round(Math.random() * (height - circleSize));
                  overlaps = false;

                  for (let i = 0; i < newLeftList.length; i++) {
                      if (newLeftList[i] > left - circleSize && newLeftList[i] < left + circleSize && newTopList[i] > top - circleSize && newTopList[i] < top + circleSize) {
                          overlaps = true;
                      }
                  }
              }
          }

        newLeftList.push(left);
        newTopList.push(top);

          if (trends[i].trendType === 1) {
              dot = (
                <View>
                    {matchesTimeframe(trends[i].timeFrame) && shouldShowTech() && matchesImpact(trends[i].impact) && (
                      <View style={[styles.circleLabelContainer, { position: 'absolute', top: top, left: left, zIndex: 1, opacity: getTechOpacity(trends[i].category) }]}>
                        <TechTrendCircle
                          impact={trends[i].impact}
                          onPress={() => setVisible(true)}
                        />
                        {showTextLabels && (
                          <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                            <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1}>
                              {trends[i].title}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                </View>
              );
          }
          else {
                dot = (
                    <View>
                      {matchesTimeframe(trends[i].timeFrame) && shouldShowSocial() && matchesImpact(trends[i].impact) && (
                        <View style={[styles.circleLabelContainer, { position: 'absolute', top: top, left: left, zIndex: 1, opacity: getSocialOpacity(trends[i].category) }]}>
                          <SocialTrendCircle
                            impact={trends[i].impact}
                            onPress={() => setVisible(true)}
                          />
                          {showTextLabels && (
                            <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                              <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1}>
                                {trends[i].title}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                );
          }

          if (trends[i].timeFrame.toLowerCase() === '5-10 years') {
              newTopDots.push(dot);
          } else if (trends[i].timeFrame.toLowerCase() === '3-5 years') {
              newMiddleDots.push(dot);
          } else {
              newBottomDots.push(dot);
          }
      }

      setTopList(newTopList);
      setLeftList(newLeftList);
      setTopDots(newTopDots);
      setMiddleDots(newMiddleDots);
      setBottomDots(newBottomDots);
  }

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
      'low impact': '2',
      'medium impact': '3',
      'high impact': '4',
      'very high impact': '5',
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
      0: '2',
      1: '3',
      2: '4',
      3: '5',
    };
    return selectedSocialKeyTrend === null || selectedSocialKeyTrend === '1' || selectedSocialKeyTrend === map[trendName];
  };
  const matchesTechFocusArea = (areaName: string) => {
    const map: Record<string, string> = {
      4: '2',
      5: '3',
      6: '4',
      7: '5',
      8: '6',
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
              <View style={{ position: 'absolute', paddingHorizontal: 50 }}>
                {topDots}
              </View>
            </View>

          {/* 3-5 years section */}
            <View>
              <Image
                style={{ width: 800, height: 100, resizeMode: 'cover' }}
                source={require('./assets/images/funnel_middle.png')}
              />
                <View style={{ position: 'absolute', paddingHorizontal: 80 }}>
                  {middleDots}
                </View>
            </View>

          {/* 0-3 years section */}
            <View style={{ position: 'relative' }}>
              <Image
                style={{ width: 700, height: 250, resizeMode: 'cover', zIndex: 0 }}
                source={require('./assets/images/funnel_bottom.png')}
              />
                <View style={{ position: 'absolute', paddingHorizontal: 175 }}>
                  {bottomDots}
                </View>
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
    bottom: -16,
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