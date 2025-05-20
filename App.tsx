import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TrendDetail from './Components/TrendDetail';

export default function App() {
    const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
            <Button title="Toon Popup" onPress={() => setVisible(true)} />
      <TrendDetail visible={visible} onClose={() => setVisible(false)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
