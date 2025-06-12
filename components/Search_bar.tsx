import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ManageTrends: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

//Search bar
const SearchBar = () => {
const navigation = useNavigation<NavigationProp>();
const [searchQuery,setSearchQuery] = useState("");

const handleSearch = (query:string) => {
    setSearchQuery(query);
}

const handleEditPress = () => {
    navigation.navigate('ManageTrends');
}

  return (
    <View style={styles.searchBarAndEditIcon}>
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
      <Pressable onPress={handleEditPress}>
        <Image style={styles.editImg} source={require('../assets/images/edit_icon.png')}/>
      </Pressable>
    </View>
  )
}

//Style of search bar
const styles = StyleSheet.create({
    searchBarAndEditIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 16,
    },
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
    },
    editImg: {
      width: 30,
      height: 30,
    }
});

export default SearchBar