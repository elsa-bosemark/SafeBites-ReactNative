import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";

import RestaurantNavigator from "./config/restaurantNavigation";
import RootNavigation from "./config/RootNavigation";

enableScreens();
//Showing launch Screen until have all fonts
const fetchFonts = () => {
  return Font.loadAsync({
    rubik: require("./assets/fonts/Rubik-Regular.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "rubik-light": require("./assets/fonts/Rubik-Light.ttf"),
  });
};

export default function App() {
  //my font State set to false since font is not loaded
  const [fontLoaded, setFontLoaded] = useState(false);
  //if font not loaded
  // if (!fontLoaded) {
  //   return <AppLoading
  //     startAsync={fetchFonts}
  //     onFinish={() => setFontLoaded(true)}
  //     onError={(err) => console.log(err)}
  //   />
  // }
  fetchFonts();
  return (
    <RestaurantNavigator
      ref={(navigatorRef) => {
        RootNavigation.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
