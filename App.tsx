import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import TrendDetail from './components/TrendDetail';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownComponent from './components/Dropdown_menu';
import { useFonts } from 'expo-font';
import SocialTrendCircle from './components/SocialTrendCircle';
import TechTrendCircle from './components/TechTrendCircle';

export default function App() {
  const [loaded, error] = useFonts({
    Aptos: require("./assets/fonts/Aptos.ttf"),
    Aptos_Bold: require("./assets/fonts/Aptos-Bold.ttf"),
    Aptos_ExtraBold: require("./assets/fonts/Aptos-ExtraBold.ttf")
  });

  const [visible, setVisible] = useState(false);
  const [selectedTrendType, setSelectedTrendType] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(null);

  const handleTrendTypeChange = (value: string | null) => {
    setSelectedTrendType(value);
  };

  const handleImpactChange = (value: string | null) => {
    setSelectedImpact(value);
  };

  const handleTimeframeChange = (value: string | null) => {
    setSelectedTimeframe(value);
  };

  const shouldShowSocial = () => {
    return selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '2';
  };

  const shouldShowTech = () => {
    return selectedTrendType === null || selectedTrendType === '1' || selectedTrendType === '3';
  };

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

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/images/vanderlande_logo.png')}
      />
      <View style={styles.dropDownStyle}>
        <DropdownComponent 
          onTrendTypeChange={handleTrendTypeChange}
          onImpactChange={handleImpactChange}
          onTimeframeChange={handleTimeframeChange}
        />
      </View>
      <View style={styles.funnelStyle}>
        {/* 5-10 years section */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.column}>
            <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>5-10 years</Text>
          </View>
          <View>
            <Image
              style={{ width: 900, height: 100, resizeMode: 'cover' }}
              source={require('./assets/images/funnel_top.png')}
            />
            {shouldShowTech() && (
              <TechTrendCircle
                impact="high"
                onPress={() => setVisible(true)} 
                style={{ position: 'absolute', top: 5, left: 100, zIndex: 1 }}
              />
            )}
            {shouldShowSocial() && (
              <SocialTrendCircle
                impact="low"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 30, left: 250, zIndex: 1 }}
              />
            )}
          </View>
        </View>

        {/* 3-5 years section */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.column}>
            <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>3-5 years</Text>
          </View>
          <View>
            <Image
              style={{ width: 800, height: 100, resizeMode: 'cover' }}
              source={require('./assets/images/funnel_middle.png')}
            />
            {shouldShowTech() && (
              <TechTrendCircle
                impact="medium"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: -5, left: 400, zIndex: 10 }}
              />
            )}
            {shouldShowSocial() && (
              <SocialTrendCircle
                impact="low"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 20, left: 550, zIndex: 10 }}
              />
            )}
          </View>
        </View>

        {/* 0-3 years section */}
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.column, { paddingTop: 30 }]}>
            <Text style={{ fontFamily: 'Aptos_ExtraBold', fontSize: 18 }}>0-3 years</Text>
          </View>
          <View style={{ position: 'relative' }}>
            <Image
              style={{ width: 700, height: 250, resizeMode: 'cover', zIndex: 0 }}
              source={require('./assets/images/funnel_bottom.png')}
            />
            {shouldShowTech() && (
              <TechTrendCircle
                impact="medium"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 10, left: 100, zIndex: 10 }}
              />
            )}
            {shouldShowSocial() && (
              <SocialTrendCircle
                impact="high"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 90, left: 200, zIndex: 10 }}
              />
            )}
            {shouldShowTech() && (
              <TechTrendCircle
                impact="low"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 50, left: 350, zIndex: 10 }}
              />
            )}
            {shouldShowSocial() && (
              <SocialTrendCircle
                impact="medium"
                onPress={() => setVisible(true)}
                style={{ position: 'absolute', top: 150, left: 400, zIndex: 10 }}
              />
            )}
          </View>
        </View>
        <TrendDetail visible={visible} onClose={() => setVisible(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 20,
  },
  funnelStyle: { 
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dropDownStyle: {
    backgroundColor:'#FFEFDF',
    width:750,
    marginVertical:10,
    padding:20,
    borderColor:'black',
    borderRadius:20,
    borderWidth: 2,
  },
  tinyLogo: {
    width: 400,
    height: 60,
  },
  column: {
    paddingRight: 25,
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});