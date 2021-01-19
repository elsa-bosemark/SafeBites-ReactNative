import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

import HomeScreen from '../screens/discoverScreens/homeScreen';
import RestaurantCategoryScreen from '../screens/discoverScreens/restaurantCategoryScreen';
import RetaurantDetailScreen from '../screens/discoverScreens/restaurantDetailScreen';
import ProfileScreen from '../screens/profileScreens/profileScreen';
import Rate from '../screens/discoverScreens/rateScreen';

import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from '@react-navigation/compat';
import RootNavigation from './RootNavigation';


//Createing a navigation stack for screens
const RestaurantNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: { //style header
            headerShown: false,
            headerTitle: 'Home',
            headerStyle: {
                backgroundColor: Colors.accentColor
            },
            headerTintColor: 'white'
        }
    },
    RestaurantCategory: {
        screen: RestaurantCategoryScreen,
        navigationOptions: { //style header
            headerStyle: {
                backgroundColor: Colors.lightPurple
            },
            headerTintColor: Colors.primaryColor
        }
    },
    RetaurantDetail: {
        screen: RetaurantDetailScreen,
        navigationOptions: {
            headerRight: () => (
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }} onPress={() => {
                    RootNavigation.navigate('Rate',);
                }}>
                    <Text style={{ marginRight: 3, fontFamily: 'rubik', color: Colors.primaryColor, fontSize: 15 }}>Rate</Text>
                    <Ionicons
                        name="star-half-sharp"
                        size={30}
                        color={Colors.primaryColor}
                        style={{ marginRight: 10, marginBottom: 5 }}
                    />
                </TouchableOpacity>
            )
        }
    },
    Rate: {
        screen: Rate,
        navigationOptions: {
            headerBackTitle: "Cancel"
        }
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.lightPurple
        },
        headerTintColor: Colors.primaryColor
    }
});

const ProfileTabNavigator = createBottomTabNavigator({
    Discover: {
        screen: RestaurantNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );

            }
        },
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-person"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    }
}, {
    tabBarOptions: { // look at docs to change more
        activeTintColor: Colors.primaryColor,
    }

});

//need createAppContainer for navigation
export default createAppContainer(ProfileTabNavigator);
