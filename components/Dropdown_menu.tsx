import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image } from 'react-native';

//Data for each filter
const trendType = [
    { label: 'Social & Business trends', value: '1' },
    { label: 'Technology trends', value: '2' },
    { label: 'All trends', value: '3' },
  ];

const impact = [
    { label: 'Low', value: '1' },
    { label: 'Medium', value: '2' },
    { label: 'High', value: '3' },
    { label: 'Very high', value: '4' },
  ];

const timeframe = [
    { label: '0-3 years', value: '1' },
    { label: '3-5 years', value: '2' },
    { label: '5-10 years', value: '3' },
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

//Type of filters
    return (
      <View style={styles.container}>
        <Text style= {{fontSize:20, fontWeight:'800'}}>Trend Type</Text>
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

        <Text style= {{fontSize:20, fontWeight:'800'}}>Impact</Text>
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

        <Text style= {{fontSize:20, fontWeight:'800'}}>Timeframe</Text>
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

        <Text style= {{fontSize:20, fontWeight:'800'}}>Social Key Trends</Text>
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

        <Text style= {{fontSize:20, fontWeight:'800'}}>Technology Focus Area</Text>
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
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {

    },
    dropdown: {
      height: 50,
      borderColor: 'black',
      backgroundColor:'white',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });