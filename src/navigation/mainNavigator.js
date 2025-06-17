import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import MainStack from './mainStack';
import Colors from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkInitialState = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('isOnboarded');
        const userToken = await AsyncStorage.getItem('TOKEN'); // from your login API

        setIsOnboarded(onboarded === 'true');
        setIsLoggedIn(!!userToken);

      } catch (error) {
        console.log('Error reading onboarding/login state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialState();
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
         <StatusBar
        backgroundColor={Colors.background} // your app background color
        barStyle="dark-content" // or 'light-content' depending on contrast
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
        ) : !isLoggedIn ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Stack.Screen name="MainStack" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
