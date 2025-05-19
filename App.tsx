import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SocialTrendCircle from './components/SocialTrendCircle';
import TechTrendCircle from './components/TechTrendCircle';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Social Trend Cirkels */}
      <View style={styles.row}>
        <SocialTrendCircle impact="low" onPress={() => alert('Social: Low impact!')} />
        <SocialTrendCircle impact="medium" onPress={() => alert('Social: Medium impact!')} />
        <SocialTrendCircle impact="high" onPress={() => alert('Social: High impact!')} />
      </View>

      {/* Tech Trend Cirkels */}
      <View style={styles.row}>
        <TechTrendCircle impact="low" onPress={() => alert('Tech: Low impact!')} />
        <TechTrendCircle impact="medium" onPress={() => alert('Tech: Medium impact!')} />
        <TechTrendCircle impact="high" onPress={() => alert('Tech: High impact!')} />
      </View>

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
    gap: 30, 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20, 
  },
});
