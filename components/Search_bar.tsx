import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

//Search bar
const SearchBar = () => {
const [searchQuery,setSearchQuery] = useState("");

const handleSearch = (query:string) => {
    setSearchQuery(query);
}

  return (
    <View style={styles.searchBar}>
      <Image source={require('../assets/images/search_icon.png')}/>
      <TextInput 
        placeholder='Type to search'
        placeholderTextColor='black'
        autoCapitalize='none'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        style={{ outlineColor: 'transparent'}}
      />
    </View>
  )
}

//Style of search bar
const styles = StyleSheet.create({
    searchBar:{
      flexDirection:'row',
      height: 50,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: 'white',
      width: 200,
      alignItems:'center',
      fontSize:14,
      gap:3,
    }
});

export default SearchBar