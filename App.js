import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/mainNavigator';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import { store } from './src/redux/Store';

export default function App() {
  const publishableKey = 'pk_test_51RbEv9IorG3LMbfblOcsWQtpVzPj3Hg6jRwgAeamUV6SqEICC1I0UNgEjWQPazjVmepwgHsTyulBboKdvChRnwMK00qgdQCFE2';
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
        <StripeProvider publishableKey={publishableKey}
        >
       <MainNavigator />
       </StripeProvider>
       <FlashMessage style={{paddingTop: 32}} position="top" />
    </GestureHandlerRootView>
    </Provider>
  );
}
