import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ScrollView } from 'react-native';

interface Trend {
  title: string;
  category: string;
  timeframe: string;
  impact: number;
  views: number;
  description: string;
  image: any;
}

const trends: Trend[] = [
  {
    title: "Circular Economy",
    category: "Technology",
    timeframe: "3-5 years",
    impact: 4,
    views: 91,
    description: "Circularity aims to create a closed-loop system where resources are reused, recycled, and repurposed, minimizing waste and environmental impact.",
    image: require("../assets/images/Circular-economy.jpg")
  },
  {
    title: "Artificial Intelligence",
    category: "Technology",
    timeframe: "1-3 years",
    impact: 5,
    views: 120,
    description: "AI continues to revolutionize industries through machine learning, automation, and predictive analytics, transforming how businesses operate.",
    image: require("../assets/images/Circular-economy.jpg")
  },
  {
    title: "Cybersecurity",
    category: "Technology",
    timeframe: "2-4 years",
    impact: 5,
    views: 95,
    description: "Advanced security measures and protocols to protect digital systems, networks, and data from cyber threats and attacks.",
    image: require("../assets/images/Circular-economy.jpg")
  }
];

interface SearchBarProps {
  onTrendSelect?: (trend: Trend) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onTrendSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const normalizeText = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const filteredTrends = trends.filter(trend => {
    const normalizedQuery = normalizeText(searchQuery);
    const normalizedTitle = normalizeText(trend.title);
    const normalizedCategory = normalizeText(trend.category);
    
    // Check if any word in the query matches the title or category
    const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0);
    
    return queryWords.some(word => 
      normalizedTitle.includes(word) || 
      normalizedCategory.includes(word) ||
      // Check for partial matches in each word
      trend.title.toLowerCase().split(' ').some(titleWord => 
        titleWord.startsWith(word) || word.startsWith(titleWord)
      ) ||
      trend.category.toLowerCase().split(' ').some(categoryWord => 
        categoryWord.startsWith(word) || word.startsWith(categoryWord)
      )
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const handleTrendSelect = (trend: Trend) => {
    setSearchQuery(trend.title);
    setShowResults(false);
    onTrendSelect?.(trend);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={require('../assets/images/search_icon.png')}/>
        <TextInput 
          placeholder='Type to search'
          placeholderTextColor='black'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{ outlineColor: 'transparent', flex: 1 }}
        />
      </View>
      
      {showResults && filteredTrends.length > 0 && (
        <ScrollView style={styles.resultsContainer}>
          {filteredTrends.map((trend, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => handleTrendSelect(trend)}
            >
              <Text style={styles.resultTitle}>{trend.title}</Text>
              <Text style={styles.resultCategory}>{trend.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    width: 200,
    alignItems: 'center',
    fontSize: 14,
    gap: 3,
  },
  resultsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
    maxHeight: 200,
    zIndex: 1001,
    elevation: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  resultCategory: {
    fontSize: 14,
    color: '#666',
  }
});

export default SearchBar;