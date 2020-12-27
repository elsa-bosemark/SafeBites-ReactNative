import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import ResturauntCategoryScreen from '../screens/resturauntCategoryScreen';
import ReturauntDetailScreen from '../screens/resturauntDetailScreen';
import Colors from '../constants/Colors';

//Createing a navigation stack for screens
const ResturauntNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: { //style header
            headerTitle: 'Home',
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.accentColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
        }
    },
    ResturauntCategory: {
        screen: ResturauntCategoryScreen,
        navigationOptions: { //style header
            headerStyle: {
                backgroundColor: Colors.primaryColor
            },
            headerTintColor: 'white'
        }
    },
    ReturauntDetail: {
        screen: ReturauntDetailScreen,
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.accentColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accentColor
    }
});

//need createAppContainer for navigation
export default createAppContainer(ResturauntNavigator);