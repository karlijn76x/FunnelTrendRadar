import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import NavBarEdit from '../components/NavBarEditTrends'

const CreateTrend = () => {
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
        { label: 'Social & Business Trends', value: '1'},
        { label: 'Technology Trends', value: '2'}
    ];
    
    const impact = [
        { label: 'Low', value: '1' },
        { label: 'Medium', value: '2' },
        { label: 'High', value: '3' },
        { label: 'Very High', value: '4' }
    ];
    
    const timeframe = [
        { label: '0-3 years', value: '1' },
        { label: '3-5 years', value: '2' },
        { label: '5-10 years', value: '3' }
    ];

    const socialKeyTrends = [
        { label: 'Labor Shortage and Regulations', value: '1' },
        { label: 'Digitalization', value: '2' },
        { label: 'As-A-Service', value: '3' },
        { label: 'Sustainability', value: '4' }
    ];

    const techFocusArea = [
        { label: 'Autonomous Systems', value: '1' },
        { label: 'Artificial Intelligence', value: '2' },
        { label: 'Robotics', value: '3' },
        { label: 'Digital & Cloud', value: '4' },
        { label: 'Other', value: '5' }
    ];
    
    useEffect(() => {
        setSelectedCategory(null);
        setErrors(prev => ({ ...prev, category: false }));
        
        if (selectedTrendType === '1') {
            setCategoryOptions(socialKeyTrends);
        } else if (selectedTrendType === '2') {
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

    const handleCreate = () => {
        if (validateForm()) {}
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
    };

  return (
    <View style={styles.container}>
      <NavBarEdit />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Create a Trend</Text>

          <View style={styles.section}>
              <Text style={styles.label}>Title *</Text>
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
                  <View style={styles.dropdownContainer}>
                      <Text style={styles.label}>Trend Type *</Text>
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
                    />
                    {errors.trendType && <Text style={styles.errorText}>Trend Type is Required</Text>}
                  </View>
                  
                  <View style={[styles.dropdownContainer, {marginLeft: 32}]}>
                      <Text style={styles.label}>Impact *</Text>
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
                      }}
                      />
                      {errors.impact && <Text style={styles.errorText}>Impact is Required</Text>}
                  </View>
              </View>
          </View>

          <View style={styles.section}>
              <View style={styles.rowContainer}>
                  <View style={styles.dropdownContainer}>
                      <Text style={styles.label}>Category *</Text>
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
                      }}
                      disable={!selectedTrendType}
                      />
                      {errors.category && <Text style={styles.errorText}>Category is Required</Text>}
                  </View>
                  
                  <View style={[styles.dropdownContainer, {marginLeft: 32}]}>
                      <Text style={styles.label}>Timeframe *</Text>
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
                      }}
                      />
                      {errors.timeframe && <Text style={styles.errorText}>Timeframe is Required</Text>}
                  </View>
              </View>
          </View>

          <View style={styles.section}>
              <Text style={styles.label}>Description *</Text>
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
            <Pressable 
              style={({ pressed }) => [
                styles.cancelButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
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
  label: {
    fontSize: 24,
    fontFamily: 'Aptos',
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
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
  errorText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Aptos',
    marginTop: 4,
    marginLeft: 4,
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