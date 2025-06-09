import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constant/Colors';
const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Arise Court</Text>
      <Image
        source={require('../assets/splash_bg.png')}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#14213D',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: height * 0.35,
    width: width,
  },
});
