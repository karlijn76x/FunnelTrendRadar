import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

const Legend = () => {
    const [loaded, error] = useFonts({
        Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf")
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.topCircleColumn}>
                        <View style={[styles.circle, styles.smallCircle]}></View>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.text}>Low impact</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={styles.topCircleColumn}>
                        <View style={[styles.circle, styles.mediumCircle]}></View>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.text}>Medium impact</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.bottomCircleColumn}>
                        <View style={[styles.circle, styles.bigCircle]}></View>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.text}>High impact</Text>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={styles.bottomCircleColumn}>
                        <View style={[styles.circle, styles.veryBigCircle]}></View>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={styles.text}>Very high impact</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  circle: {
    backgroundColor: '#F57523',
    borderWidth: 1,
    borderColor: '#000'
  },
  smallCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  mediumCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5
  },
  bigCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5
  },
  veryBigCircle: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  row: {
    flexDirection: 'row',
    gap: 15
  },
  topCircleColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55
  },
  bottomCircleColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90
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