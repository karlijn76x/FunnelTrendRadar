import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import NavBarEdit from '../components/NavBarEditTrends'
import { useNavigation } from '@react-navigation/native';
import trendsApi from '../apis/TrendsApi';

const CreateTrend = () => {
    const navigation = useNavigation();

    // Form input states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // Dropdown selection states
    const [selectedTrendType, setSelectedTrendType] = useState(null);
    const [selectedImpact, setSelectedImpact] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTimeframe, setSelectedTimeframe] = useState(null);
    // Dropdown focus states
    const [isTrendTypeFocus, setTrendTypeFocus] = useState(false);
    const [isImpactFocus, setIsImpactFocus] = useState(false);
    const [isCategoryFocus, setIsCategoryFocus] = useState(false);
    const [isTimeframeFocus, setIsTimeframeFocus] = useState(false);
    // Category options based on selected trend type
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
    
    // Error states for form validation
    const [errors, setErrors] = useState({
        title: false,
        trendType: false,
        impact: false,
        category: false,
        timeframe: false,
        description: false
    });
    
    // Data for trend type dropdown
    const trendType = [
        { label: 'Social & Business Trends', value: '0', image: require('../assets/images/social_trends.png') },
        { label: 'Technology Trends', value: '1', image: require('../assets/images/tech_trends.png') }
    ];
    
    // Data for impact dropdown
    const impact = [
        { label: 'Low', value: 'low impact', image: require('../assets/images/low_impact.png') },
        { label: 'Medium', value: 'medium impact', image: require('../assets/images/mid_impact.png') },
        { label: 'High', value: 'high impact', image: require('../assets/images/high_impact.png') },
        { label: 'Very High', value: 'very high impact', image: require('../assets/images/very_high_impact.png') }
    ];
    
    // Data for timeframe dropdown
    const timeframe = [
        { label: '0-3 years', value: '0-3 years' },
        { label: '3-5 years', value: '3-5 years' },
        { label: '5-10 years', value: '5-10 years' }
    ];

    // Data for social key trends dropdown
    const socialKeyTrends = [
        { label: 'Labor Shortage and Regulations', value: '0' },
        { label: 'Digitalization', value: '1' },
        { label: 'As-A-Service', value: '2' },
        { label: 'Sustainability', value: '3' }
    ];

    // Data for technology focus area dropdown
    const techFocusArea = [
        { label: 'Autonomous Systems', value: '4' },
        { label: 'Artificial Intelligence', value: '5' },
        { label: 'Robotics', value: '6' },
        { label: 'Digital & Cloud', value: '7' },
        { label: 'Other', value: '8' }
    ];
    
    // Effect to update category options when trend type changes
    useEffect(() => {
        // Reset category selection when trend type changes
        setSelectedCategory(null);
        setErrors(prev => ({ ...prev, category: false }));
        
        // Set appropriate category options based on selected trend type
        if (selectedTrendType === '0') {
            setCategoryOptions(socialKeyTrends);
        } else if (selectedTrendType === '1') {
            setCategoryOptions(techFocusArea);
        } else {
            setCategoryOptions([]);
        }
    }, [selectedTrendType]);

    const clearError = (field: keyof typeof errors) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    // Form validation function
    const validateForm = () => {
        const newErrors = {
            title: !title.trim(),
            trendType: !selectedTrendType,
            impact: !selectedImpact,
            category: !selectedCategory,
            timeframe: !selectedTimeframe,
            description: !description.trim()
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    // Handle form submission
    const handleCreate = () => {
        if (validateForm()) {
            const newTrend = {
                title: title,
                description: description,
                impact: selectedImpact,
                timeFrame: selectedTimeframe,
                category: Number(selectedCategory),
                trendType: Number(selectedTrendType)
            };
            trendsApi.createTrend(newTrend)
                .then(navigation.goBack);
        }
    };

    // Reset form to initial state and go back
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setSelectedTrendType(null);
        setSelectedImpact(null);
        setSelectedCategory(null);
        setSelectedTimeframe(null);
        setErrors({
            title: false,
            trendType: false,
            impact: false,
            category: false,
            timeframe: false,
            description: false
        });
        navigation.goBack();
    };

  return (
    <View style={styles.container}>
      <NavBarEdit />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Page title */}
          <Text style={styles.title}>Create a Trend</Text>

          {/* Title input */}
          <View style={styles.section}>
              <Text style={styles.label}>
                Title <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="Title"
              placeholderTextColor="#727272"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                clearError('title');
              }}
            />
            {errors.title && <Text style={styles.errorText}>Title is Required</Text>}
          </View>

          <View style={styles.section}>
              <View style={styles.rowContainer}>
                  {/* Trend Type dropdown */}
                  <View style={styles.dropdownContainer}>
                      <Text style={styles.label}>
                        Trend Type <Text style={styles.requiredAsterisk}>*</Text>
                      </Text>
                      <Dropdown
                      style={[
                        styles.dropdown, 
                        isTrendTypeFocus && { borderColor: '#000', borderWidth: 2 },
                        errors.trendType && styles.dropdownError
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={trendType}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={'-Select-'}
                      value={selectedTrendType}
                      onFocus={() => setTrendTypeFocus(true)}
                      onBlur={() => setTrendTypeFocus(false)}
                      onChange={item => {
                        setSelectedTrendType(item.value);
                        setTrendTypeFocus(false);
                        clearError('trendType');
                      }}
                      renderItem={(item) => (
                      <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.textItem}>{item.label}</Text>
                      </View>
                      )}
                      renderLeftIcon={() => {
                        if (selectedTrendType) {
                            const selectedItem = trendType.find(item => item.value === selectedTrendType);
                            return (
                            <Image 
                            source={selectedItem?.image} 
                            style={styles.selectedImage}
                            />
                            );
                        }
                        return null;
                      }}
                    />
                    {errors.trendType && <Text style={styles.errorText}>Trend Type is Required</Text>}
                  </View>
                  
                  {/* Impact dropdown */}
                  <View style={[styles.dropdownContainer, {marginLeft: 32}]}>
                      <Text style={styles.label}>
                        Impact <Text style={styles.requiredAsterisk}>*</Text>
                      </Text>
                      <Dropdown
                      style={[
                        styles.dropdown, 
                        isImpactFocus && { borderColor: '#000', borderWidth: 2 },
                        errors.impact && styles.dropdownError
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={impact}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={'-Select-'}
                      value={selectedImpact}
                      onFocus={() => setIsImpactFocus(true)}
                      onBlur={() => setIsImpactFocus(false)}
                      onChange={item => {
                        setSelectedImpact(item.value);
                        setIsImpactFocus(false);
                        clearError('impact');
                      }}
                      renderItem={(item) => (
                      <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.textItem}>{item.label}</Text>
                      </View>
                      )}
                      renderLeftIcon={() => {
                        if (selectedImpact) {
                            const selectedItem = impact.find(item => item.value === selectedImpact);
                            return (
                            <Image 
                            source={selectedItem?.image} 
                            style={styles.selectedImage}
                            />
                            );
                        }
                        return null;
                    }}
                      />
                      {errors.impact && <Text style={styles.errorText}>Impact is Required</Text>}
                  </View>
              </View>
          </View>

          <View style={styles.section}>
              <View style={styles.rowContainer}>
                  {/* Category dropdown */}
                  <View style={styles.dropdownContainer}>
                      <Text style={styles.label}>
                        Category <Text style={styles.requiredAsterisk}>*</Text>
                      </Text>
                      <Dropdown
                      style={[
                        styles.dropdown, 
                        isCategoryFocus && { borderColor: '#000', borderWidth: 2 }, 
                        !selectedTrendType && { backgroundColor: '#F0F0F0' },
                        errors.category && styles.dropdownError
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={categoryOptions}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={selectedTrendType ? '-Select-' : '-Select Trend Type First-'}
                      value={selectedCategory}
                      onFocus={() => selectedTrendType && setIsCategoryFocus(true)}
                      onBlur={() => setIsCategoryFocus(false)}
                      onChange={item => {
                        setSelectedCategory(item.value);
                        setIsCategoryFocus(false);
                        clearError('category');
                      }}
                      disable={!selectedTrendType}  // Disable until trend type is selected
                      />
                      {errors.category && <Text style={styles.errorText}>Category is Required</Text>}
                  </View>
                  
                  {/* Timeframe dropdown */}
                  <View style={[styles.dropdownContainer, {marginLeft: 32}]}>
                      <Text style={styles.label}>
                        Timeframe <Text style={styles.requiredAsterisk}>*</Text>
                      </Text>
                      <Dropdown
                      style={[
                        styles.dropdown, 
                        isTimeframeFocus && { borderColor: '#000', borderWidth: 2 },
                        errors.timeframe && styles.dropdownError
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={timeframe}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={'-Select-'}
                      value={selectedTimeframe}
                      onFocus={() => setIsTimeframeFocus(true)}
                      onBlur={() => setIsTimeframeFocus(false)}
                      onChange={item => {
                        setSelectedTimeframe(item.value);
                        setIsTimeframeFocus(false);
                        clearError('timeframe');
                      }}
                      />
                      {errors.timeframe && <Text style={styles.errorText}>Timeframe is Required</Text>}
                  </View>
              </View>
          </View>

          {/* Description textarea */}
          <View style={styles.section}>
              <Text style={styles.label}>
                Description <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TextInput
              style={[styles.input, styles.multilineInput, errors.description && styles.inputError]}
              placeholder="Description"
              placeholderTextColor="#727272"
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                clearError('description');
              }}
            />
            {errors.description && <Text style={styles.errorText}>Description is Required</Text>}
          </View>

          <View style={styles.buttonContainer}>
            {/* Cancel button - resets form */}
            <Pressable 
              style={({ pressed }) => [
                styles.cancelButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            {/* Create button - submits form */}
            <Pressable 
              style={({ pressed }) => [
                styles.createButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={handleCreate}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateTrend

const styles = StyleSheet.create({
  // Styling for main container
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center'
  },
  // Styling for text elements
  title: {
    fontSize: 48,
    fontFamily: 'Aptos_Bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  label: {
    fontSize: 24,
    fontFamily: 'Aptos',
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: '#FF0000',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Aptos',
    marginTop: 4,
    marginLeft: 4,
  },
  
  // Styling for layout containers
  section: {
    marginBottom: 24,
    width: 900
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flex: 1,
  },
  // Styling for input field
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 20,
    fontFamily: 'Aptos',
    color: '#000',
    backgroundColor: '#FFEFDF',
  },
  inputError: {
    borderColor: '#FF4444',
    backgroundColor: '#FFE6E6',
  },
  multilineInput: {
    height: 130,
    textAlignVertical: 'top',
  },
  // Styling for dropdown
  dropdown: {
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFEFDF',
  },
  dropdownError: {
    borderColor: '#FF4444',
    backgroundColor: '#FFE6E6',
  },
  placeholderStyle: {
    fontSize: 20,
    fontFamily: 'Aptos',
    color: '#727272',
  },
  selectedTextStyle: {
    fontSize: 20,
    fontFamily: 'Aptos',
    color: '#000',
  },
  // Styling for dropdown item
  item: {
    flexDirection: 'row',
    padding: 17,
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  selectedImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  // Styling for buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#9ECEE3',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    marginRight: 16,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Aptos',
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#FFB469',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    marginLeft: 16,
  },
  createButtonText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Aptos',
    fontWeight: '600',
  },
})