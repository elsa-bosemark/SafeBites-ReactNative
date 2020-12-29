import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Platform
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

import { CATEGORIES } from '../../data/categoryData';
import Colors from '../../constants/Colors';
import CategoryGridTile from '../../components/categoryGridTile';
import RestaurantCard from '../../components/restaurantCard';
import { RESTAURANTS } from '../../data/dummydata';
import { Restaurant } from '../../models/restaurant';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

state = {
    location: null,
    geocode: null,
    errorMessage: "",
    data: null,
    error: null,
    loading: false,
    refreshing: true,
    filteredData: null,
    images: null,
    phoneNumber: null,
    restaurantLocations: null,
    address: null,
    url: null,
}

class HomeScreen extends React.Component {
    //more states
    state = {
        search: '',
        nameList: [],
    };
    //LOCATION ASK
    componentDidMount() {
        //this.getLocationAsync()
    }
    constructor(props) {
        super(props);
        this.getLocationAsync();
    }

    //get location of user's phone
    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
        const { latitude, longitude } = location.coords
        this.setState({ location: { latitude, longitude } });
        //this.fetchApiCall() //fetch api 
    }

    //get the geocode
    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({ geocode })
    }


    //API GET DATA

    fetchApiCall = () => {
        console.log('I fetched API')
        let names = []
        let phoneNums = [];
        let _url = [];
        let image = [];
        let addresses = [];
        let _restaurantLocation = [];
        this.setState({ loading: true });
        fetch(`https://api.yelp.com/v3/businesses/search?term=&latitude=${this.state.location.latitude}&longitude=${this.state.location.longitude}&limit=50`, {
            "method": "GET",
            "headers": headers
        })
            //parse through data, to get the things we need 
            //they are ordered in arrays in the same order
            .then(response => response.json())
            .then(responseJSON => {
                responseJSON.businesses.forEach(element => {
                    names.push(element.name)
                    phoneNums.push(element.display_phone)
                    image.push(element.image_url)
                    _restaurantLocation.push(element.location)
                    _url.push(element.url)

                    //set state
                    this.setState({
                        data: names,
                        error: responseJSON.error || null,
                        loading: false,
                        refreshing: false,
                        phoneNumber: phoneNums,
                        images: image,
                        url: _url,
                        restaurantLocations: _restaurantLocation,
                    });
                    //get addresses
                    this.state.restaurantLocations.forEach(element => {
                        addresses.push(element.display_address)
                        this.setState({
                            address: addresses,
                        })
                    })
                });


            })
            .catch(err => {
                console.warn(err);
                this.setState({ error, loading: false });
            });

    };
    //SEARCH
    //update the search field 
    updateSearch = (search) => {
        this.setState({ search: search });

        let filteredData = this.state.data.filter(function (item) {
            return item.includes(search);
        });

        this.setState({ filteredData: filteredData });
        console.log('filteredData: '+this.state.filteredData)
    };



    render() {
        const { search, nameList } = this.state;

        const renderGridItem = (itemData) => {
            
            return (
                <CategoryGridTile
                    title={itemData.item.title}
                    icon={itemData.item.icon}
                    //sends title data to catScreen
                    onSelect={() => {
                        props.navigation.navigate({
                            routeName: 'RestaurantCategory', params: {
                                categoryId: itemData.item.id
                            }
                        })
                    }} />
            );
        }
        const renderRestaurantCard = (itemData) => {
            return (
                <RestaurantCard
                    // nameArray: this.state.data,
                    // images: this.state.images,
                    // phoneNumber: this.state.phoneNumber,
                    // address: this.state.address,
                    // url: this.state.url,

                    // title={itemData.item.title}
                    // price={itemData.item.price}
                    // distance={itemData.item.distance}
                    // cover={itemData.item.cover}
                    // curbsidePickup={true}
                    // takeout={false}
                    // delivery={true}

                    title={'test'}//{this.state.data}
                    price={'$$$'}
                    distance={'0.5'}
                    cover={'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg'}//{this.state.images}
                    curbsidePickup={true}
                    takeout={false}
                    delivery={true}
                    onSelect={() => {
                        console.log('yes')
                    }} />
            );
        }

        return (
            <SafeAreaView>

                <SearchBar
                    placeholder="Type Here..."
                    platform="android"
                    round="true"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <Text style={styles.title}>Categories</Text>
                <FlatList
                    data={CATEGORIES}
                    renderItem={renderGridItem}
                    numColumns={3}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                />
                <Text style={styles.title}>Filter</Text>
                <Text style={styles.title}>{this.state.filteredData}</Text>
                <FlatList
                    // data={RESTAURANTS}
                    // renderItem={renderRestaurantCard}
                    // numColumns={3}
                    // scrollEnabled={true}
                    // nestedScrollEnabled={true}
                    data={RESTAURANTS}//{this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
                    keyExtractor={item => item}
                    renderItem={renderRestaurantCard}
                />



            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'rubik',
        fontSize: 20,
        padding: 20,
    },
    test: {
        fontSize: 150
    }
});

export default HomeScreen;

// export const APIRESTAURANTS = [
//     new Restaurant(
//         '123nqwenaser', //id  yelp
//         null,//state.data, //title yelp
//         '$$$$', //price yelp
//         0.5, //distance yelp?
//         //cover yelp
//         null,//state.images,
//          //images yelp
//          null,//state.images,
//         true, //curbsidepickup yelp?
//         false, //takeout yelp?
//         true, //delivery yelp?
//         false, // outdoorseating yelp?
//         10, //capacity yelp?
//         //hours yelp
//         null,
//         //tags yelp
//         [
//             'french',
//             'casual',
//             'vegetarian'
//         ],
//         null,//state.phoneNumber,//phone number yelp
//         'https://maps.google.com/?cid=10281119596374313554',// directions google
//         0,//maskScore
//         0,//socialDistancingScore
//         0,//barriersScore
//         //0=yes 1= idk 3= no
//         1,//glovesBool
//         0,//paymentBool
//         3,//surfaceBool
//         3,//tempBool
//         0,//handsanatizerBool
//         1,//utensilsBool
//         4.5, // yelpScore yelp
//         3.4, //googleScore google
//         "https://www.google.com.au/about/careers/locations/sydney/", //website google
//     ),
// ]