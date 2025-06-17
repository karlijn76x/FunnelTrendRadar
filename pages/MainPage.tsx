import React, { useState, useEffect, useRef } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import trendsApi from '../apis/TrendsApi';


export default function MainPage() {
  const [loaded, error] = useFonts({
    Aptos: require("../assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("../assets/fonts/Aptos-ExtraBold.ttf"),
    Aptos_Italic: require("../assets/fonts/Aptos-Italic.ttf")
  });

  const [trends, setTrends] = useState([]);
  const [leftList, setLeftList] = useState([]);
  const [topList, setTopList] = useState([]);
  const [topDots, setTopDots] = useState([]);
  const [middleDots, setMiddleDots] = useState([]);
  const [bottomDots, setBottomDots] = useState([]);
  // UI state
  const [visible, setVisible] = useState(false);
  const [showTextLabels, setShowTextLabels] = useState(true); // Toggle for circle labels
  // Filter states
  const [selectedTrendType, setSelectedTrendType] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);
  const [selectedSocialKeyTrend, setSelectedSocialKeyTrend] = useState<string | null>(null);
  const [selectedTechFocusArea, setSelectedTechFocusArea] = useState<string | null>(null);
  // Onboarding states
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  // Animation and interaction states
  const [animationFilterKey, setAnimationFilterKey] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCircles, setSelectedCircles] = useState<string[]>([]);
  const [isTimeframeFilterChange, setIsTimeframeFilterChange] = useState(false);
  const prevTimeframeRef = useRef(selectedTimeframe);
  
  const handleCirclePress = (trend) => {
    if (compareMode) {
      setSelectedCircles((prev) => {
        if (prev === trend) {
          console.log(`Deselecting circle`);
          return prev.filter((x) => x !== trend);
        } else if (prev.length < 2) {
          console.log(`Selecting circle`);
          return [...prev, trend];
        }
        console.log(`Cannot select more than two circles`);
        return prev;
      });
    } else {
        selectedCircles[0] = trend;
        setSelectedCircles(selectedCircles);
      console.log(`Opening detail view`);
      setVisible(true);
    }
  };
 

  const handleComparePress = () => {
    setCompareMode(!compareMode);
    setSelectedCircles([]); // Reset selected circles when toggling compare mode
  };
  
  useEffect(() => {
    getDots();
  }, [trends, showTextLabels, selectedTrendType, selectedImpact, selectedTimeframe, selectedSocialKeyTrend, selectedTechFocusArea, selectedCircles]);

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
                fallSide = Math.random();

                if (fallSide >= 0.5) {
                    fallSide = 'right';
                } else {
                    fallSide = 'left';
                }

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
                  <FallingAnimation
                    delay={0}
                    targetX={left}
                    targetY={top}
                    fallDirection={fallSide}
                    shouldShow={shouldShowItem(trends[i].timeFrame, 'tech', trends[i].impact)}
                    filterKey={`${animationFilterKey}`}
                    skipAnimation={isTimeframeFilterChange}
                  >
                    <View style={[styles.circleLabelContainer, { zIndex: 1, opacity: getTechOpacity(trends[i].category) }]}>
                      <TechTrendCircle
                        impact={trends[i].impact}
                        onPress={() => handleCirclePress(trends[i])}
                        selected={selectedCircles.includes(trends[i])}
                      />
                      {showTextLabels && (
                        <View style={[styles.labelContainer, { backgroundColor: '#5A136D' }]}>
                          <Text style={[styles.labelText, { color: 'white' }]} numberOfLines={1} ellipsizeMode="tail">
                            {trends[i].title}
                          </Text>
                        </View>
                      )}
                    </View>
                  </FallingAnimation>
                );
            }
            else {
                  dot = (
                      <FallingAnimation
                        delay={0}
                        targetX={left}
                        targetY={top}
                        fallDirection={fallSide}
                        shouldShow={shouldShowItem(trends[i].timeFrame, 'social', trends[i].impact)}
                        filterKey={`${animationFilterKey}`}
                        skipAnimation={isTimeframeFilterChange}
                      >
                        <View style={[styles.circleLabelContainer, { zIndex: 1, opacity: getSocialOpacity(trends[i].category) }]}>
                          <SocialTrendCircle
                            impact={trends[i].impact}
                            onPress={() => handleCirclePress(trends[i])}
                            selected={selectedCircles.includes(trends[i])}
                          />
                          {showTextLabels && (
                            <View style={[styles.labelContainer, { backgroundColor: '#F57523' }]}>
                              <Text style={[styles.labelText, { color: 'black' }]} numberOfLines={1} ellipsizeMode="tail">
                                {trends[i].title}
                              </Text>
                            </View>
                          )}
                        </View>
                      </FallingAnimation>
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

  
  // Refresh animations when filters change
  useEffect(() => {
    if (prevTimeframeRef.current !== selectedTimeframe) {
      setIsTimeframeFilterChange(true);
    } else {
      setIsTimeframeFilterChange(false);
    }
    setAnimationFilterKey(prev => prev + 1);
    prevTimeframeRef.current = selectedTimeframe;
  }, [selectedTrendType, selectedImpact, selectedTimeframe]);

  const handleDontShowAgainChange = async (value: boolean) => {
    setDontShowAgain(value);
    try {
      await AsyncStorage.setItem('dontShowOnboarding', value ? 'true' : 'false');
    } catch (e) {
      // Error 
    }
  };
  
  const handleNext = () => {
    if (onboardingStep < 5) { 
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false); 
    }
  };



  // Filter logic functions

  /**
   * Checks if social trends should be shown
   * @returns {boolean} True if social trends should be shown
   */
  const shouldShowSocial = () =>
    selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '2';

  /**
   * Checks if tech trends should be shown
   * @returns {boolean} True if tech trends should be shown
   */
  const shouldShowTech = () =>
    selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '3';

  /**
   * Checks if trend matches selected impact
   * @param {string} value - Impact level (low, medium, high, very high)
   * @returns {boolean} True if trend matches impact filter
   */
  const matchesImpact = (value: string) => {
    const map: { [key: string]: string } = {
      'low impact': '2',
      'medium impact': '3',
      'high impact': '4',
      'very high impact': '5',
    };
    return selectedImpact === null || selectedImpact === '1' || selectedImpact === map[value.toLowerCase()];
  };
  
  const shouldShowFunnelSection = (sectionTimeframe: string) => {
    return selectedTimeframe === null || 
           selectedTimeframe === '1' || 
           selectedTimeframe === (sectionTimeframe === '5-10 years' ? '2' : 
                                 sectionTimeframe === '3-5 years' ? '3' : '4');
  };

  /**
   * Checks if social key trend matches selected filter
   * @param {string} trendName - Name of the social key trend
   * @returns {boolean} True if trend matches social filter
   */
  const matchesSocialKeyTrend = (trendName: string) => {
    const map: Record<string, string> = {
      0: '2',
      1: '3',
      2: '4',
      3: '5',
    };
    return selectedSocialKeyTrend === null || selectedSocialKeyTrend === '1' || selectedSocialKeyTrend === map[trendName];
  };

  /**
   * Checks if tech focus area matches selected filter
   * @param {string} areaName - Name of the tech focus area
   * @returns {boolean} True if trend matches tech filter
   */
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

  // Calculates opacity for trend circles based on filter match
  const getSocialOpacity = (trendName: string) => 
    matchesSocialKeyTrend(trendName) ? 1 : 0.15;
  const getTechOpacity = (areaName: string) =>
    matchesTechFocusArea(areaName) ? 1 : 0.15;
  
  /**
   * Checks if a trend item should be shown based on all active filters
   * @param {string} timeframe - Trend timeframe
   * @param {'social' | 'tech'} trendType - Type of trend
   * @param {string} impact - Impact level
   * @returns {boolean} True if item should be shown
   */
  const shouldShowItem = (timeframe: string, trendType: 'social' | 'tech', impact: string) => {
    const typeMatch = trendType === 'social' ? shouldShowSocial() : shouldShowTech();
    const timeframeMatch = shouldShowFunnelSection(timeframe);
    return typeMatch && timeframeMatch && matchesImpact(impact);
  };

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
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


        {/* Filter Dropdown Controls */}
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
          {shouldShowFunnelSection('5-10 years') && (
            <View>
              <Image
                style={{ width: 900, height: 105, resizeMode: 'cover' }}
                source={require('../assets/images/funnel_top.png')}
              />
              <View style={{ position: 'absolute', paddingHorizontal: 50 }}>
                {topDots}
              </View>
            </View>
          )}

          {/* 3-5 years section */}
          {shouldShowFunnelSection('3-5 years') && (
            <View>
              <Image
                style={{ width: 800, height: 100, resizeMode: 'cover' }}
                source={require('../assets/images/funnel_middle.png')}
              />
                <View style={{ position: 'absolute', paddingHorizontal: 80 }}>
                  {middleDots}
                </View>
            </View>
          )}

          {/* 0-3 years section */}
          {shouldShowFunnelSection('0-3 years') && (
            <View style={{ position: 'relative' }}>
              <Image
                style={{ width: 700, height: 250, resizeMode: 'cover', zIndex: 0 }}
                source={require('../assets/images/funnel_bottom.png')}
              />
                <View style={{ position: 'absolute', paddingHorizontal: 175 }}>
                  {bottomDots}
                </View>
            </View>
          )}

            {compareMode && selectedCircles.length === 2 ? (
            <View style={styles.compareTrendDetailsContainer}>
            {selectedCircles.map((trend, index) => {
            console.log(`Rendering TrendDetail`);
          return (
           <TrendDetail
            key={index}
            visible={true}
            onClose={() => {
            setSelectedCircles((prev) => prev.filter((x) => x !== trend));
           }}
            trends={trends}
           useModal={false}
           currentTrendIndex={trends.findIndex(x => x === selectedCircles[index])}

          />
          );
          })}

  </View>
  ) : (
  <TrendDetail visible={visible} onClose={() => setVisible(false)} trends={trends} currentTrendIndex={trends.findIndex(x => x === selectedCircles[0])} />
)}

        </View>
        {/* Control Buttons and History */}
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
    </SafeAreaView>
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
    padding: 10
  },
  legend: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  // Styling for right column controls
  rightColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 15,
    zIndex: -1
  },
  // Styling for container that positions circle and label
  circleLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
  },
  // Styling for trend circle labels
  labelContainer: {
    position: 'absolute',
    bottom: -16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 5,
    alignSelf: 'center',
    maxWidth: 75,
  },
  // Text styling for labels
  labelText: {
    fontFamily: 'Aptos_Bold',
    fontSize: 12,
    color: 'black',
    width: '100%',
    overflow: 'hidden',
  },
  compareTrendDetailsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 1000,
  },
});