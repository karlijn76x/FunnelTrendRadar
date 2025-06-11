import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import NavBarEdit from '../components/NavBarEditTrends'

const CreateTrend = () => {
    const [selectedTrendType, setSelectedTrendType] = useState(null);
    const [selectedImpact, setSelectedImpact] = useState(null);
    const [isTrendTypeFocus, setTrendTypeFocus] = useState(false);
    const [isImpactFocus, setIsImpactFocus] = useState(false);
    
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

  return (
    <View style={styles.container}>
      <NavBarEdit />
      <View style={styles.content}>
        <Text style={styles.title}>Create a Trend</Text>

        <View style={styles.section}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#727272"
            />
        </View>

        <View style={styles.section}>
            <View style={styles.rowContainer}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Trend Type *</Text>
                    <Dropdown
                    style={[styles.dropdown, isTrendTypeFocus  && { borderColor: '#000', borderWidth: 2 }]}
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
                    }}
                    />
                </View>
                
                <View style={[styles.dropdownContainer, {marginLeft: 32}]}>
                    <Text style={styles.label}>Impact *</Text>
                    <Dropdown
                    style={[styles.dropdown, isImpactFocus && { borderColor: '#000', borderWidth: 2 }]}
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
                </View>
            </View>
        </View>
      </View>
    </View>
  )
}

export default CreateTrend

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
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
  dropdown: {
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFEFDF',
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
})