import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchCourtScreen from '../screens/SearchCourt';
import ContactUsScreen from '../screens/ContactUsScreen.js';
import CheckoutScreen from '../screens/CheckoutScreen.js';
import BookAppointmentScreen from '../screens/BookAppointmentScreen .js';
import MyBookingsScreen from '../screens/BookingScreen.js';
import CustomTabBar from '../components/CustomTabBar.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import BookingsDetailScreen from '../screens/BookingDetails.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BookingStack = ()=>{
  return(
     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Bookings'>
      <Stack.Screen name="Bookings" component={MyBookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookingsDetailScreen} />
     </Stack.Navigator>
  )
}

const HomeStack = ()=>{
  return(
     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name="Home" component={SearchCourtScreen} />
      <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} />
     </Stack.Navigator>
  )
}
const MainStack = () => {
  console.log("#############======>")
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{tabBarIcon: 'home',headerShown:false}}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingStack}
        options={{tabBarIcon: 'calendar',headerShown:false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarIcon: 'user',headerShown:false}}
      />
      <Tab.Screen
        name="Contact"
        component={ContactUsScreen}
        options={{tabBarIcon: 'user',headerShown:false}}
      />
    </Tab.Navigator>

    // <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Bookings'>
    //   {/* <Stack.Screen name="Court" component={SearchCourtScreen} /> */}
    //   {/* <Stack.Screen name="Contact" component={ContactUsScreen} /> */}
    //   {/* <Stack.Screen name="Checkout" component={CheckoutScreen} /> */}
    //   <Stack.Screen name="Bookings" component={MyBookingsScreen} />
    //   {/* <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen}/> */}
    // </Stack.Navigator>
  );
};

export default MainStack;
