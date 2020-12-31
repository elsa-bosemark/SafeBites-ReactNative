import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SectionList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { CATEGORIES } from '../../data/categoryData';
import Colors from '../../constants/Colors';
import CategoryGridTile from '../../components/categoryGridTile';
import RestaurantCard from '../../components/restaurantCard';
import Restaurant from '../../models/restaurant'


import { headers } from '../../constants/secret'

//global variables (access by this.state and set by this.setState)
state = {
    location: null,
    geocode: null,
    errorMessage: "",
    title: null,
    error: null,
    loading: false,
    refreshing: true,
    filteredData: null,
    images: null,
    phoneNumber: null,
    restaurantLocations: null,
    address: null,
    yelpUrl: null,
    price: null,
    transactions: null,
    restaurantCoordinates: null,
}

class HomeScreen extends React.Component {

    //-------FUNCTIONS-------
    //more states
    state = {
        search: '',
        nameList: [],

    };
    //screen did load
    componentDidMount() {
        //this.getLocationAsync()

    }
    constructor(props) {
        super(props);
        this.getLocationAsync();
    }
    //fetch yelp api
    fetchApiCall = () => {
        let names = []
        let phoneNums = [];
        let _yelpUrl = [];
        let image = [];
        let addresses = [];
        let _restaurantLocation = [];
        let _price = [];
        let _transactions = [];
        let _restaurantCoordinates = [];
        this.setState({ loading: true });
        fetch(`https://api.yelp.com/v3/businesses/search?term=&latitude=${this.state.location.latitude}&longitude=${this.state.location.longitude}&limit=5`, {
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
                    _yelpUrl.push(element.url)
                    _price.push(element.price)
                    _transactions.push(element.transactions)
                    _restaurantCoordinates.push(element.coordinates)

                    //set state
                    this.setState({
                        title: names,
                        error: responseJSON.error || null,
                        loading: false,
                        refreshing: false,
                        phoneNumber: phoneNums,
                        images: image,
                        yelpUrl: _yelpUrl,
                        restaurantLocations: _restaurantLocation,
                        price: _price,
                        transactions: _transactions,
                        restaurantCoordinates: _restaurantCoordinates,
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
        this.fetchApiCall() //fetch api 
    }

    //get the geocode
    getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location)
        this.setState({ geocode })
    }
    //SEARCH
    updateSearch = (search) => {
        this.setState({ search: search });

        let filteredRestaurants = this.state.title.filter(function (item) {
            return item.includes(search);
        });

        this.setState({ filteredRestaurants: filteredRestaurants });
    };

    render() {
        const { search, nameList } = this.state;

        // find the correct index of the rest for other data (cover, price) so right info on search
        
        const actualIndex = (item) => { return this.state.title.indexOf(item) }
        //console.log('the index of the rest is   '+restIndex)

        const renderGridItem = (itemData) => {
            return (
                <CategoryGridTile
                    title={itemData.item.title}
                    icon={itemData.item.icon}
                    onSelect={() => {
                        this.props.navigation.navigate({
                            routeName: 'RestaurantCategory', params: {
                                categoryId: itemData.item.id,
                                //pass restaurant DATA
                                title: this.state.title,
                                price: this.state.price,
                                cover: this.state.images,
                                transactions: this.state.transactions,
                                restaurantCoordinates: this.state.restaurantCoordinates,
                                userCoordinates: this.state.location,
                                phoneNumber: this.state.phoneNumber,
                                address: this.state.address,
                                yelpUrl: this.state.yelpUrl,
                            }
                        })
                    }} />
            );
        }

        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.title}>Categories</Text>
                    <FlatList
                        data={CATEGORIES}
                        renderItem={renderGridItem}
                        numColumns={3}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                        keyExtractor={item => item}
                    />
                    <Text style={styles.title}>Find</Text>
                    <View style={styles.searchBar}>
                        <SearchBar
                            placeholder="Search..."
                            onChangeText={this.updateSearch}
                            value={search}
                            color='black'
                            platform={Platform.OS === 'android' ? 'android' : 'ios'}
                            containerStyle={{
                                backgroundColor: '',
                            }}
                            inputContainerStyle={{
                                borderRadius: 10,
                                backgroundColor: 'white'
                            }}

                        /></View>

                    <FlatList
                        data={this.state.filteredRestaurants && this.state.filteredRestaurants.length > 0 ? this.state.filteredRestaurants : this.state.title}
                        getItemLayout={(data, index) => (
                            { length: 30, offset: 2 * index, index }
                        )}
                        renderItem={({ item, index }) => (
                            <RestaurantCard
                                title={item}
                                price={this.state.price[actualIndex(item)]}
                                cover={this.state.images[actualIndex(item)]}
                                transactions={this.state.transactions[actualIndex(item)]}
                                restaurantCoordinates={this.state.restaurantCoordinates[actualIndex(item)]}
                                userCoordinates={this.state.location}
                                // curbsidePickup={true}
                                // takeout={false}
                                // delivery={true}
                                onSelect={() => {
                                    this.props.navigation.navigate({
                                        routeName: 'RetaurantDetail', params: {
                                            //pass restaurant DATA
                                            restIndex: index,
                                            title: this.state.title,
                                            price: this.state.price,
                                            cover: this.state.images,
                                            transactions: this.state.transactions,
                                            restaurantCoordinates: this.state.restaurantCoordinates,
                                            userCoordinates: this.state.location,
                                            phoneNumber: this.state.phoneNumber,
                                            address: this.state.address,
                                            yelpUrl: this.state.yelpUrl,
                                        }
                                    })
                                }} />
                        )}
                        size="large"
                        keyExtractor={item => item}
                        refreshing={false}
                        style={styles.dataContainer}
                    />
                </ScrollView>
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
    searchBar: {
        padding: Platform.OS === 'android' ? 10 : 0,
    }
});
export default HomeScreen;

