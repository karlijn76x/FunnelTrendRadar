import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';

interface DropdownComponentProps {
  onTrendTypeChange: (value: string | null) => void;
  onImpactChange: (value: string | null) => void;
  onTimeframeChange: (value: string | null) => void;
}

const trendType = [
  { 
    label: 'All', 
    value: '1',
    image: require('../assets/images/all_trends.png')
  },
  { 
    label: 'Social & Business Trends', 
    value: '2',
    image: require('../assets/images/social_trends.png')
  },
  { 
    label: 'Technology Trends', 
    value: '3',
    image: require('../assets/images/tech_trends.png')
  },
];

const impact = [
  { 
    label: 'All', 
    value: '1',
  },
  { 
    label: 'Low', 
    value: '2',
    image: require('../assets/images/low_impact.png')
  },
  { 
    label: 'Medium', 
    value: '3',
    image: require('../assets/images/mid_impact.png')
  },
  { 
    label: 'High', 
    value: '4',
    image: require('../assets/images/high_impact.png')
  },
  { 
    label: 'Very High', 
    value: '5',
    image: require('../assets/images/very_high_impact.png')
  },
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

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onTrendTypeChange, onImpactChange, onTimeframeChange }) => {
  const [trendValue, setTrendValue] = useState<string | null>(null);
  const [impactValue, setImpactValue] = useState<string | null>(null);
  const [timeframeValue, setTimeframeValue] = useState<string | null>(null);
  const [socialKeyTrendsValue, setSocialKeyTrendsValue] = useState<string | null>(null);
  const [techFocusAreaValue, setTechFocusAreaValue] = useState<string | null>(null);
  const [focusedDropdown, setFocusedDropdown] = useState<string | null>(null);
  const [loaded] = useFonts({
    Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf")
  });

  if (!loaded) return null;

  const handleFocus = (dropdownName: string) => setFocusedDropdown(dropdownName);
  const handleBlur = () => setFocusedDropdown(null);

  const renderDropdown = (
    title: string,
    data: { label: string; value: string; image?: any }[],
    value: string | null,
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    notifyParent?: (value: string | null) => void
  ) => {
    const isFocused = focusedDropdown === title;
    return (
      <View style={styles.titleAndMenu}>
        <Text style={styles.titles}>{title}</Text>
        <Dropdown
          style={[
            styles.dropdown, 
            isFocused && { borderColor: 'black', borderWidth: 2 }
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'All'}
          value={value}
          onFocus={() => handleFocus(title)}
          onBlur={handleBlur}
          renderItem={item => (
            <View style={styles.item}>
              {item.image && (
                <Image
                  source={item.image}
                  style={styles.itemImage}
                />
              )}
              <Text style={[
                styles.itemText,
                item.value === value && styles.selectedItemText
              ]}>{item.label}</Text>
            </View>
          )}
          onChange={item => {
            setValue(item.value);
            if (notifyParent) notifyParent(item.value);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderDropdown('Trend Type', trendType, trendValue, setTrendValue, onTrendTypeChange)}
      {renderDropdown('Impact', impact, impactValue, setImpactValue, onImpactChange)}
      {renderDropdown('Timeframe', timeframe, timeframeValue, setTimeframeValue, onTimeframeChange)}
      {renderDropdown('Social Key Trend', socialKeyTrends, socialKeyTrendsValue, setSocialKeyTrendsValue)}
      {renderDropdown('Tech Focus Area', techFocusArea, techFocusAreaValue, setTechFocusAreaValue)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexWrap: 'wrap',
  },
  dropdown: {
    height: 50,
    width: 120,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  titleAndMenu: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Aptos_Bold',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Aptos_Bold',
  },
  titles: {
    fontSize: 18,
    fontFamily: 'Aptos_Bold',
    marginBottom: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode:'contain',
  },
  itemText: {
    fontSize: 14,
  },
  selectedItemText: {
    fontWeight: 'bold',
  },
});

export default DropdownComponent;