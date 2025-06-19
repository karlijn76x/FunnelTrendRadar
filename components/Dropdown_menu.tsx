import React, { useRef, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Animated } from 'react-native';
import SearchBar from './Search_bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const panelWidth = screenWidth * 0.2; 

type RootStackParamList = {
  ManageTrends: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DropdownComponentProps {
  onTrendTypeChange: (value: string | null) => void;
  onImpactChange: (value: string | null) => void;
  onTimeframeChange: (value: string | null) => void;
  onSocialKeyTrendChange: (value: string | null) => void;
  onTechFocusAreaChange: (value: string | null) => void;
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
    { label: '0-3 years', value: '4' },
    { label: '3-5 years', value: '3' },
    { label: '5-10 years', value: '2' },
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

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onTrendTypeChange, onImpactChange, onTimeframeChange, onSocialKeyTrendChange, onTechFocusAreaChange }) => {
  const navigation = useNavigation<NavigationProp>();
  const [infoVisible, setInfoVisible] = useState(false); 
  const slideAnim = useRef(new Animated.Value(panelWidth)).current;
  const [trendValue, setTrendValue] = useState<string | null>(null);
  const [impactValue, setImpactValue] = useState<string | null>(null);
  const [timeframeValue, setTimeframeValue] = useState<string | null>(null);
  const [socialKeyTrendsValue, setSocialKeyTrendsValue] = useState<string | null>(null);
  const [techFocusAreaValue, setTechFocusAreaValue] = useState<string | null>(null);
  const [focusedDropdown, setFocusedDropdown] = useState<string | null>(null);

  if (!loaded) return null;

  const handleFocus = (dropdownName: string) => setFocusedDropdown(dropdownName);
  const handleBlur = () => setFocusedDropdown(null);

  /**
   * Reusable dropdown component with filter functionality
   * @param title - Display title for the filter dropdown
   * @param data - Array of options for the dropdown
   * @param value - Currently selected value
   * @param setValue - State setter for the dropdown value
   * @param notifyParent - Callback to notify parent component of changes
   */
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

  const toggleInfoPanel = () => {
    if (infoVisible) {
      Animated.timing(slideAnim, {
        toValue: panelWidth, 
        duration: 300,
        useNativeDriver: true,
      }).start(() => setInfoVisible(false));
    } else {
      setInfoVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  

  const handleEditPress = () => {
    navigation.navigate('Manage Trends');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/vanderlande_logo.png')}
        />
      </View>
      
      {/* Filter dropdowns */}
      <View style={styles.dropdownsContainer}>
        {renderDropdown('Trend Type', trendType, trendValue, setTrendValue, onTrendTypeChange)}
        {renderDropdown('Impact', impact, impactValue, setImpactValue, onImpactChange)}
        {renderDropdown('Timeframe', timeframe, timeframeValue, setTimeframeValue, onTimeframeChange)}
        {renderDropdown('Social Key Trend', socialKeyTrends, socialKeyTrendsValue, setSocialKeyTrendsValue, onSocialKeyTrendChange)}
        {renderDropdown('Tech Focus Area', techFocusArea, techFocusAreaValue, setTechFocusAreaValue, onTechFocusAreaChange)}
      </View>

      {/* Search Bar and Icons */}
    <View style={styles.searchAndEditContainer}>
      <SearchBar />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleInfoPanel} style={styles.infoIcon}>
          <MaterialIcons name="info" size={30} color="black" />
        </TouchableOpacity>
        <Pressable onPress={handleEditPress}>
          <Image style={styles.editImg} source={require('../assets/images/edit_icon.png')} />
        </Pressable>
      </View>
    </View>
    
    {/* Side Panel */}
    {infoVisible && (
  <Animated.View style={[styles.infoPanel, { transform: [{ translateX: slideAnim }] }]}>
    <Text style={[styles.infoText, styles.paragraph]}>
      To identify potential industry disruptors early on, extensive trend research was conducted. A total of 270 relevant social and technological trends were identified across the segments: airports, parcel and warehousing.
    </Text>
    <Text style={[styles.infoText, styles.paragraph]}>
      The impact of these trends were validated through a variety of sources; including expert interviews, industry reports, research into the investment landscape, and analysis of active patents. Through this process we gained a comprehensive understanding of the forces shaping the future of our industry and identified the most important trends to focus on.
    </Text>
    <Text style={[styles.infoText, styles.paragraph]}>
      The top 40 trends are shown on the priority matrix on the right. Over time we will track the relevancy of these trends and continue watching for emerging signals. More information and trend definitions can be found in the appendix.
    </Text>
    <TouchableOpacity onPress={toggleInfoPanel} style={styles.closeButton}>
      <MaterialIcons name="close" size={24} color="white" />
    </TouchableOpacity>
  </Animated.View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#FFEFDF',
    padding: 15,
    borderColor:'black',
    borderBottomWidth: 2,
    zIndex: 1000,
  },
  logoContainer: {
    marginTop: 10,
  },
  logo: {
    resizeMode: 'contain',
    width: 170,
    height: 60,
  },
  infoIcon: {
    marginRight: 10,
  },
  dropdownsContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    width: 140,
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
  searchAndEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5, 
  },
  infoIcon: {
    marginBottom: 5, 
  },
  editImg: {
    width: 30,
    height: 30,
  },
  infoPanel: {
    position: 'absolute',
    right: 0, 
    top: 0,
    height: screenHeight,
    width: panelWidth,
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    justifyContent: 'flex-start',
    borderColor: 'black',
    zIndex: 10,
  },
  
  infoText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 24,
    zIndex: 20,
    marginTop: 30
  },
  
  paragraph: {
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
});

export default DropdownComponent;