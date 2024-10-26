import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "@react-navigation/compat";
import RootNavigation from "./RootNavigation";
import * as firebase from "firebase";
import { Alert } from "react-native";
import "firebase/auth";

import HomeScreen from "../screens/discoverScreens/homeScreen";
import RestaurantCategoryScreen from "../screens/discoverScreens/restaurantCategoryScreen";
import RetaurantDetailScreen from "../screens/discoverScreens/restaurantDetailScreen";
import ProfileScreen from "../screens/profileScreens/profileScreen";
import Rate from "../screens/discoverScreens/rateScreen";
import SettingsScreen from "../screens/profileScreens/settingsScreen";
import ExploreScreen from "../screens/exploreScreen";
import Settings from "../screens/profileScreens/settingsScreen";
import Comments from "../screens/discoverScreens/commentsScreen";
import Directions from "../screens/discoverScreens/directions";

import Colors from "../constants/Colors";
import SearchTab from "../components/searchTab";
` `
var user = false;
//Creating a navigation stack for screens
const RestaurantNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        //style header
        headerShown: true,
        headerTitle: "Home",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "white",
      },
    },
    RestaurantCategory: {
      screen: RestaurantCategoryScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        headerShown: true,

        headerStyle: {
          backgroundColor: Colors.accentColor,
        },
        headerTintColor: "white",
      }),
    },
    RetaurantDetail: {
      screen: RetaurantDetailScreen,
      navigationOptions: {
        headerRight: () => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (user) {
                RootNavigation.navigate("Rate");
              } else {
                //no user logged in
                Alert.alert(
                  "Login",
                  "Sorry! To use features like rating restaurants, you have to login! "
                );
              }
            }}
          >
            <Text
              style={{
                marginRight: 3,
                fontFamily: "rubik",
                color: Colors.primaryColor,
                fontSize: 15,
              }}
            >
              Rate
            </Text>
            <Ionicons
              name="star"
              size={25}
              color={Colors.primaryColor}
              style={{ marginRight: 10, marginBottom: 5 }}
            />
          </TouchableOpacity>
        ),
      },
    },
    Rate: {
      screen: Rate,
      navigationOptions: {
        headerBackTitle: "Cancel",
      },
    },
    Comments: {
      screen: Comments,
    },
    Directions: {
      screen: Directions,
    },
  },

  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: Colors.primaryColor,
    },
  }
);
firebase
  .auth()
  .onAuthStateChanged((userAuth) => {
    if (userAuth != null || userAuth != undefined) {
      user = true;
    } else {
      user = false;
    }
  })
  .bind(this);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: true,
        headerTitle: "Profile",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "white",

        headerRight: () => {
          if (user) {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  RootNavigation.navigate("Settings");

                  // props.navigation.navigate("Settings");
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color="white"
                  style={{ marginRight: 10, marginBottom: 5 }}
                />
              </TouchableOpacity>
            );
          }
        },
      },
    },

    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: Colors.primaryColor,
    },
  }
);

const ProfileTabNavigator = createBottomTabNavigator(
  {
    Discover: {
      screen: RestaurantNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            // <SearchTab/>
            <Ionicons name="search" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
    User: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      // look at docs to change more
      activeTintColor: Colors.primaryColor,
    },
  }
);

//need createAppContainer for navigation
export default createAppContainer(ProfileTabNavigator);
