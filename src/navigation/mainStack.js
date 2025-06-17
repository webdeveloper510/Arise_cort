import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchCourtScreen from '../screens/SearchCourt';
import ContactUsScreen from '../screens/ContactUsScreen.js';
import CheckoutScreen from '../screens/CheckoutScreen.js';
import BookAppointmentScreen from '../screens/BookAppointmentScreen .js';
import MyBookingsScreen from '../screens/BookingScreen.js'
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Bookings'>
      {/* <Stack.Screen name="Court" component={SearchCourtScreen} /> */}
      {/* <Stack.Screen name="Contact" component={ContactUsScreen} /> */}
      {/* <Stack.Screen name="Checkout" component={CheckoutScreen} /> */}
      <Stack.Screen name="Bookings" component={MyBookingsScreen} />
      {/* <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen}/> */}
    </Stack.Navigator>
  );
};

export default MainStack;
 


