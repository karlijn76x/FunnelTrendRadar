import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/vanderlande_logo.png')}
      />
    </View>
  );
}

//Styling of logo
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 400,
    height: 60,
  },
});
