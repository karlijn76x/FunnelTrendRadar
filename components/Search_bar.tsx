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
        
        <TextInput 
          style={styles.input}
          placeholder='Type to search'
          placeholderTextColor='black'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
        <Image style={styles.editImg} source={require('../assets/images/edit_icon.png')}/>
    </View>
  )
}

//Style of search bar
const styles = StyleSheet.create({
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 16,
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: 'white',
        fontSize: 14,
        width: 200,
    },
    editImg: {
      width: 30,
      height: 30,
    }
});

export default SearchBar