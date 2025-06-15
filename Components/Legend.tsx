import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';

const Legend = () => {
    const [loaded, error] = useFonts({
        Aptos_Bold: require("../assets/fonts/Aptos-Bold.ttf")
    });

    return (
        <View style={styles.container}>
            <View style={styles.dotsRow}>
                <View style={styles.dotsBorder}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Legend</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.topRow}>
                            <View style={styles.topCircleColumn}>
                                <View style={[styles.orangeCircle, styles.trendTypeCircle]}></View>
                                <View style={[styles.purpleCircle, styles.trendTypeCircle]}></View>
                            </View>
                            <View style={styles.textColumn}>
                                <View style={styles.trendTypeRow}>
                                    <Text style={styles.contentText}>Social</Text>
                                </View>
                                <View style={styles.trendTypeRow}>
                                    <Text style={styles.contentText}>Technology</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dotsDivider}/>
                        <View style={styles.bottomRow}>
                            <View style={styles.bottomCircleColumn}>
                                <View style={[styles.grayCircle, styles.smallCircle]}></View>
                                <View style={[styles.grayCircle, styles.mediumCircle]}></View>
                                <View style={[styles.grayCircle, styles.bigCircle]}></View>
                                <View style={[styles.grayCircle, styles.veryBigCircle]}></View>
                            </View>
                            <View style={styles.textColumn}>
                                <View style={styles.smallRow}>
                                    <Text style={styles.contentText}>Low impact</Text>
                                </View>
                                <View style={styles.mediumRow}>
                                    <Text style={styles.contentText}>Medium impact</Text>
                                </View>
                                <View style={styles.bigRow}>
                                    <Text style={styles.contentText}>High impact</Text>
                                </View>
                                <View style={styles.veryBigRow}>
                                    <Text style={styles.contentText}>Very high impact</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.timeframeRow}>
                <View style={styles.timeframeColumn}>
                    <Image
                        source={require('../assets/images/5-10-years.png')}
                    />
                    <Text style={styles.contentText}>5-10 years</Text>
                </View>
                <View style={styles.timeframeColumn}>
                    <Image
                        source={require('../assets/images/3-5-years.png')}
                    />
                    <Text style={styles.contentText}>3-5 years</Text>
                </View>
                <View style={styles.timeframeColumn}>
                    <Image
                        source={require('../assets/images/0-3-years.png')}
                    />
                    <Text style={styles.contentText}>0-3 years</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  dotsBorder: {
    borderWidth: 1,
    borderColor: '#000'
  },
  dotsDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginHorizontal: -5
  },
  heading: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5
  },
  content: {
    padding: 5,
    gap: 10
  },
  dotsRow: {
    flexDirection: 'row'
  },
  topRow: {
    flexDirection: 'row',
    gap: 15,
    paddingLeft: 17.5
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 15
  },
  trendTypeRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  smallRow: {
    flexDirection: 'row',
    gap: 15,
    height: 35,
    alignItems: 'center'
  },
  mediumRow: {
    flexDirection: 'row',
    gap: 15,
    height: 55,
    alignItems: 'center'
  },
  bigRow: {
    flexDirection: 'row',
    gap: 15,
    height: 75,
    alignItems: 'center'
  },
  veryBigRow: {
    flexDirection: 'row',
    gap: 15,
    height: 90,
    alignItems: 'center'
  },
  timeframeRow: {
    flexDirection: 'row'
  },
  timeframeColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5
  },
  topCircleColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 55,
    gap: 15
  },
  bottomCircleColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 90,
    gap: 15
  },
  textColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15
  },
  orangeCircle: {
    backgroundColor: '#F57523',
    borderWidth: 1,
    borderColor: '#000'
  },
  purpleCircle: {
    backgroundColor: '#5A136D',
    borderWidth: 1,
    borderColor: '#000'
  },
  grayCircle: {
    backgroundColor: '#A5ABB0',
    borderWidth: 1,
    borderColor: '#000'
  },
  trendTypeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20
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
  headingText: {
    fontFamily: 'Aptos_Bold',
    fontSize: 24
  },
  contentText: {
    fontFamily: 'Aptos_Bold',
    fontSize: 12
  }
});

export default Legend;