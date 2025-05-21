import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';

// Data for each filter
const trendType = [
    { label: 'All', value: '1' },
    { label: 'Social & Business Trends', value: '2' },
    { label: 'Technology Trends', value: '3' },
  ];

const impact = [
    { label: 'All', value: '1' },
    { label: 'Low', value: '2' },
    { label: 'Medium', value: '3' },
    { label: 'High', value: '4' },
    { label: 'Very High', value: '5' },
  ];

const timeframe = [
    { label: 'All', value: '1' },
    { label: '0-3 years', value: '2' },
    { label: '3-5 years', value: '3' },
    { label: '5-10 years', value: '4' },
  ];

const socialKeyTrends = [
    { label: 'All', value: '1' },
    { label: 'Labor Shortage and Regulations', value: '2' },
    { label: 'Digitalization', value: '3' },
    { label: 'As-A-Service', value: '4' },
    { label: 'Sustainability', value: '5' },
  ];

const techFocusArea = [
    { label: 'All', value: '1' },
    { label: 'Autonomous Systems', value: '2' },
    { label: 'Artificial Intelligence', value: '3' },
    { label: 'Robotics', value: '4' },
    { label: 'Digital & Cloud', value: '5' },
    { label: 'Other', value: '6' },
  ];

  const DropdownComponent = () => {
    const [trendValue, setTrendValue] = useState(null);
    const [impactValue, setImpactValue] = useState(null);
    const [timeframeValue, setTimeframeValue] = useState(null);
    const [socialKeyTrendsValue, setSocialKeyTrendsValue] = useState(null);
    const [techFocusAreaValue, setTechFocusAreaValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [loaded, error] = useFonts({
        Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf")
    });

// Type of filters
    return (
      <View style={styles.container}>
        <View style={styles.titleAndMenu}>
        <Text style= {styles.titles}>Trend Type</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={trendType}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'All' : 'All'}
          value={trendValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTrendValue(item.value);
            setIsFocus(false);
          }}
        />
        </View>

        <View style={styles.titleAndMenu}>
        <Text style= {styles.titles}>Impact</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={impact}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'All' : 'All'}
          value={impactValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setImpactValue(item.value);
            setIsFocus(false);
          }}
        />
        </View>

        <View style={styles.titleAndMenu}>
        <Text style= {styles.titles}>Timeframe</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={timeframe}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'All' : 'All'}
          value={timeframeValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTimeframeValue(item.value);
            setIsFocus(false);
          }}
        />
        </View>

        <View style={styles.titleAndMenu}>
        <Text style= {styles.titles}>Social Key Trend</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={socialKeyTrends}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'All' : 'All'}
          value={socialKeyTrendsValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSocialKeyTrendsValue(item.value);
            setIsFocus(false);
          }}
        />
        </View>

        <View style={styles.titleAndMenu}>
        <Text style= {styles.titles}>Tech Focus Area</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={techFocusArea}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'All' : 'All'}
          value={techFocusAreaValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setTechFocusAreaValue(item.value);
            setIsFocus(false);
          }}
        />
        </View>
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      gap:10,
    },
    dropdown: {
      height: 50,
      width:120,
      borderColor: 'black',
      backgroundColor:'white',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    titleAndMenu: {
      flexDirection:'column',
    },
    placeholderStyle: {
      fontSize: 14,
      fontFamily: 'Aptos_Bold',
    },
    selectedTextStyle: {
      fontSize: 14,
      fontFamily: 'Aptos_Bold',
    },
    titles:{
      fontSize:18,
      fontFamily: 'Aptos_Bold',
    },
  });