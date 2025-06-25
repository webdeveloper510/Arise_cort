import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'; // Reuse button component
import Colors from '../constant/Colors';
import CircularProgress  from '../components/CircularProgress';
import theme from '../constant/theme';
const { width, height } = Dimensions.get('window');

const Onboarding1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>
          Quick <Text style={styles.highlight}>Reservations</Text>
        </Text>
        <Text style={styles.description}>
          Easy court reservations for players and coach
        </Text>
      </View>

      <Image
        source={require('../assets/onbording11.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.bottomSection}>
        <PrimaryButton title="Next" onPress={() => navigation.navigate('Onboarding2')} width={'80%'} height={60}/>
       <View style={{ marginTop: 0 }}>
          <CircularProgress  progress={25}  />
        </View>
      </View>
    </View>
  );
};

export default Onboarding1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 60,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    fontFamily:theme.bold
  },
  highlight: {
    color: '#0066FF',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily:theme.medium
  },
  image: {
    width: width * 0.9,
    height: height * 0.45,
    alignSelf: 'center',
  },
  bottomSection: {
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent:'space-between',
    
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
  },
  activeDot: {
    backgroundColor: '#0066FF',
  },
});
