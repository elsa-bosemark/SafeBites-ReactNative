import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDla4L8V_iQmaLsvel7yJQaOUKAR3B9dxk",
  authDomain: "safebytes-6c39a.firebaseapp.com",
  projectId: "safebytes-6c39a",
  storageBucket: "safebytes-6c39a.appspot.com",
  messagingSenderId: "783269453835",
  appId: "1:783269453835:web:acc6b997caa2d6beada70e",
  measurementId: "G-19Q28MG7Y4"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

import RestaurantNavigator from './navigation/restaurantNavigation';

enableScreens();

//Showing launtch Screen until have all fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'rubik': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'rubik-light': require('./assets/fonts/Rubik-Light.ttf'),
  });
}

export default function App() {
  //my font State set to false since font is not loaded
  const [fontLoaded, setFontLoaded] = useState(false);
  //if font not loaded
  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }
  return (
    <RestaurantNavigator />
  );
}

