import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SocialTrendCircle from './components/SocialTrendCircle';
import TechTrendCircle from './components/TechTrendCircle';


export default function App() {
  return (
    <View style={styles.container}>
      <SocialTrendCircle size={80} onPress={() => alert('Je klikte op Social!')} />
      <TechTrendCircle size={80} onPress={() => alert('Je klikte op Tech!')} />
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
