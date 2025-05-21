import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

const Legend = () => {
    const [loaded, error] = useFonts({
        Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf")
    });

    return (
        <View style={styles.row}>
            <View style={styles.column}>
                <View style={styles.circleColumn}>
                    <View style={[styles.circle, styles.smallCircle]}></View>
                </View>
                <View style={styles.textColumn}>
                    <Text style={styles.text}>Low impact</Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.circleColumn}>
                    <View style={[styles.circle, styles.mediumCircle]}></View>
                </View>
                <View style={styles.textColumn}>
                    <Text style={styles.text}>Medium impact</Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.circleColumn}>
                    <View style={[styles.circle, styles.bigCircle]}></View>
                </View>
                <View style={styles.textColumn}>
                    <Text style={styles.text}>High impact</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#F57523',
    borderWidth: 1,
    borderColor: '#000'
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  mediumCircle: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  bigCircle: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  row: {
    flexDirection: 'row',
    gap: 15
  },
  circleColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  textColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    gap: 5
  },
  text: {
    fontFamily: 'Aptos_Bold',
    fontSize: 12
  }
});

export default Legend;