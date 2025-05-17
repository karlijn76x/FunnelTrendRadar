import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, Image } from 'react-native';

const data = [
    { label: 'Social & Business trends', value: '1' },
    { label: 'Technology trends', value: '2' },
    { label: 'All trends', value: '3' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.container}>
        <View style = {{backgroundColor:'#FFEFDF', padding:40, borderColor:'black', borderRadius:20, borderWidth: 2}}>
        <Text style= {{fontSize:20, fontWeight:'800'}}>Trend Type</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth:2,}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
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
      backgroundColor: 'white',
      padding: 16,
      position: 'relative',
    },
    dropdown: {
      height: 50,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
      position: 'relative',
      zIndex: 1000,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 50,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });