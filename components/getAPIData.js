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
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { CATEGORIES } from '../../data/categoryData';
import Colors from '../../constants/Colors';
import CategoryGridTile from '../../components/categoryGridTile';

import Location from './getLocation';


import { headers } from '../../constants/secret'

//global variables (access by this.state and set by this.setState)
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

class APIData extends React.Component{
    //ATHENA
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
    //update the search field 
    updateSearch = (search) => {
        this.setState({ search: search });

        let filteredData = this.state.data.filter(function (item) {
            return item.includes(search);
        });

        this.setState({ filteredData: filteredData });
    };

    //ATHENA END

};


export default APIData;