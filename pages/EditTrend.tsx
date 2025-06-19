import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import NavBarEdit from '../components/NavBarEditTrends'
import { useNavigation } from '@react-navigation/native';
import trendsApi from '../apis/TrendsApi';

const CreateTrend = ({ route }) => {
    const navigation = useNavigation();

    const [trend, setTrend] = useState(null);
    const [resetCategory, setResetCategory] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTrendType, setSelectedTrendType] = useState(null);
    const [selectedImpact, setSelectedImpact] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTimeframe, setSelectedTimeframe] = useState(null);
    const [isTrendTypeFocus, setTrendTypeFocus] = useState(false);
    const [isImpactFocus, setIsImpactFocus] = useState(false);
    const [isCategoryFocus, setIsCategoryFocus] = useState(false);
    const [isTimeframeFocus, setIsTimeframeFocus] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

    const [errors, setErrors] = useState({
        title: false,
        trendType: false,
        impact: false,
        category: false,
        timeframe: false,
        description: false
    });

    const trendType = [
        { label: 'Social & Business Trends', value: '0', image: require('../assets/images/social_trends.png') },
        { label: 'Technology Trends', value: '1', image: require('../assets/images/tech_trends.png') }
    ];

    const impact = [
        { label: 'Low', value: 'low impact', image: require('../assets/images/low_impact.png') },
        { label: 'Medium', value: 'medium impact', image: require('../assets/images/mid_impact.png') },
        { label: 'High', value: 'high impact', image: require('../assets/images/high_impact.png') },
        { label: 'Very High', value: 'very high impact', image: require('../assets/images/very_high_impact.png') }
    ];

    const timeframe = [
        { label: '0-3 years', value: '0-3 years' },
        { label: '3-5 years', value: '3-5 years' },
        { label: '5-10 years', value: '5-10 years' }
    ];

    const socialKeyTrends = [
        { label: 'Labor Shortage and Regulations', value: '0' },
        { label: 'Digitalization', value: '1' },
        { label: 'As-A-Service', value: '2' },
        { label: 'Sustainability', value: '3' }
    ];

    const techFocusArea = [
        { label: 'Autonomous Systems', value: '4' },
        { label: 'Artificial Intelligence', value: '5' },
        { label: 'Robotics', value: '6' },
        { label: 'Digital & Cloud', value: '7' },
        { label: 'Other', value: '8' }
    ];

    useEffect(() => {
        trendsApi.getTrend(route.params.trendId)
            .then(res => setTrend(res));
    }, [route.params?.trendId]);

    useEffect(() => {
        if (resetCategory) {
            setSelectedCategory(null);
            setResetCategory(true);
        }
        setErrors(prev => ({ ...prev, category: false }));

        if (selectedTrendType === '0') {
            setCategoryOptions(socialKeyTrends);
        } else if (selectedTrendType === '1') {
            setCategoryOptions(techFocusArea);
        } else {
            setCategoryOptions([]);
        }
    }, [selectedTrendType]);

    useEffect(() => {
        if (trend !== null) {
            setTitle(trend.title);
            setDescription(trend.description);
            setSelectedTrendType(String(trend.trendType));
            setSelectedImpact(trend.impact);
            setSelectedCategory(String(trend.category));
            setSelectedTimeframe(trend.timeFrame);
        }
    }, [trend]);

    const clearError = (field: keyof typeof errors) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

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

    const handleUpdate = () => {
        if (validateForm()) {
            const newTrend = {
                id: trend.id,
                title: title,
                description: description,
                impact: selectedImpact,
                timeFrame: selectedTimeframe,
                category: Number(selectedCategory),
                trendType: Number(selectedTrendType)
            };
            trendsApi.updateTrend(newTrend, trend.id)
                .then(() => navigation.navigate('Manage Trends'));
        }
    };

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
          <Text style={styles.title}>Edit Trend</Text>

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
                      disable={!selectedTrendType}
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
              onPress={handleUpdate}
            >
              <Text style={styles.createButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateTrend

const styles = StyleSheet.create({
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