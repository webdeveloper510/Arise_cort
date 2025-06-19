import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/mainNavigator';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import { store } from './src/redux/Store';
export default function App() {

  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
       <MainNavigator />
       <FlashMessage style={{paddingTop: 32}} position="top" />
    </GestureHandlerRootView>
    </Provider>
  );
}
