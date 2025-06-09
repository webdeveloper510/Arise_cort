import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'; // Reuse button component
import Colors from '../constant/Colors';
import CircularProgress  from '../components/CircularProgress';
import theme from '../constant/theme';
import BackButton from '../components/BackButton';
const { width, height } = Dimensions.get('window');

const Onboarding3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <BackButton navigation={navigation}/>
      <View style={styles.topSection}>
        <Text style={styles.title}>
          Onboarding <Text style={styles.highlight}>Screen 3</Text>
        </Text>
        <Text style={styles.description}>
          Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
        </Text>
      </View>

      <Image
        source={require('../assets/onbording3.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.bottomSection}>
        <PrimaryButton title="Next" onPress={() => navigation.navigate('Onboarding4')} width={'80%'} height={60}/>
       <View style={{ marginTop: 0 }}>
          <CircularProgress  progress={75}  />
        </View>
      </View>
    </View>
  );
};

export default Onboarding3;
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
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 26,
    fontFamily:theme.medium,
    lineHeight:16
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
