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
import {useDispatch, useSelector} from 'react-redux';
import { SaveUserInfo } from '../redux/userData';
import { getProfile } from '../Apis';
const Stack = createNativeStackNavigator();

const MainNavigator = ({navigation}) => {
  const user = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkInitialState = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('isOnboarded');
        const userToken = await AsyncStorage.getItem('TOKEN'); // from your login API
        getProfileData(userToken)
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
   const handleButton = async () => {
  try {
    await AsyncStorage.clear();
    dispatch(SaveUserInfo(null));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (error) {
    console.log('Logout error:', error);
    showMessage({ message: 'Logout failed. Please try again.', type: 'danger' });
  }
};
  const getProfileData=async(value)=>{
    try{
     let res = await getProfile(value)
     if(res.code == '200'){
      dispatch(SaveUserInfo(res.data))
     }
     console.log("🚀 ~ getProfileData ~ res:", res)
    }catch(error){
    console.log("🚀 ~ getProfileData ~ error:", error)
    handleButton()
    }
  }
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
        ) : !user ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Stack.Screen name="MainStack" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
