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
        <Image
          source={require('../assets/images/edit_icon.png')}></Image>
        <TextInput 
          style={styles.input}
          placeholder='Type to search'
          placeholderTextColor='black'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
    </View>
  )
}

//Style of search bar
const styles = StyleSheet.create({
    searchBar: {
        flex: 0.5,
        gap:10,
        marginBottom: 25,
        alignItems: 'flex-end',
    },
    input: {
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        paddingRight: 40,
        paddingLeft:10,
        backgroundColor: 'white',
        fontSize: 14,
    }
});

export default SearchBar