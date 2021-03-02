import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    Touchable,
    FlatList
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { markers, mapStandardStyle } from '../data/mapData';
import Color from '../constants/Colors';
import RestaurantCard from "../components/restaurantCard";

import {
    storeData,
    storeNames,
    storePrice,
    storePhoneNumbers,
    storeCover,
    storeTransactions,
    storeRestaurantLoc,
    storeYelpUrl,
    storeRestaurantCoords,
    storeRating,
    storeReviewCount,
    storeTags,
    storePhotos,
    storeUserLocation,
} from "../config/data";

state = {
    location: null,
    geocode: null,
    errorMessage: "",
    error: "",
    loading: true,
    refreshing: true,
    filteredData: null,

    title: null,
    cover: null,
    phoneNumber: null,
    restaurantLocations: null,
    address: null,
    yelpUrl: null,
    price: null,
    transactions: null,
    restaurantCoordinates: null,

    yelpRating: null,
    yelpReviewCount: null,
    photos: null,
    openHours: null,
    tags: null,
    authVisible: true,
    signupVisible: false,
    loginVisible: false,
};



const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

updateSearch = (search) => {
    this.setState({ search: search });

    let filteredRestaurants = this.state.title.filter(function (item) {
        return item.includes(search);
    });

    this.setState({ filteredRestaurants: filteredRestaurants });
};


const ExploreScreen = () => {
    // const theme = useTheme();



    const initialMapState = {
        markers,
        categories: [
            {
                name: 'Pickup',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} color={Color.accentColor} />,
            },
            {
                name: 'Delivery',
                icon: <MaterialCommunityIcons style={styles.chipsIcon} name="motorbike" size={18} color={Color.accentColor} />,
            },
            {
                name: 'Reserve',
                icon: <MaterialCommunityIcons name="table-chair" style={styles.chipsIcon} size={18} color={Color.accentColor} />,
            },
            {
                name: 'Outdoor Seating',
                icon: <MaterialCommunityIcons name="weather-sunny" style={styles.chipsIcon} size={15} color={Color.accentColor} />,
            },
        ],
        region: {
            //This should be based on location of user
            latitude: 37.7673519306,
            longitude: -122.42410497,
            //this makes the map 2-d instead of 3-d
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };

    const [state, setState] = React.useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStandardStyle}
            >
                {state.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    );
                })}
            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {state.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.chipsItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* <FlatList
                horizontal={true}
                data={
                    this.state.filteredRestaurants &&
                        this.state.filteredRestaurants.length > 0
                        ? this.state.filteredRestaurants
                        : this.state.title
                }
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ marginBottom: 20 }}>
                            <RestaurantCard
                                title={item}
                                price={this.state.price[index]}
                                cover={
                                    this.state.cover[actualIndex(item)]
                                        ? this.state.cover[actualIndex(item)]
                                        : null
                                }
                                safetyScore={this.state.feelSafe[index]}
                                transactions={this.state.transactions[actualIndex(item)]}
                                restaurantCoordinates={
                                    this.state.restaurantCoordinates[actualIndex(item)]
                                }
                                userCoordinates={this.state.location}
                                onSelect={() => {
                                    setCalledOnce(false);
                                    this.props.navigation.navigate({
                                        routeName: "RetaurantDetail",
                                        params: {
                                            //pass restaurant DATA
                                            restIndex: index,
                                            title: this.state.title,
                                            price: this.state.price,
                                            cover: this.state.cover,
                                            transactions: this.state.transactions,
                                            restaurantCoordinates: this.state.restaurantCoordinates,
                                            userCoordinates: this.state.location,
                                            phoneNumber: this.state.phoneNumber,
                                            address: this.state.address,
                                            yelpUrl: this.state.yelpUrl,

                                            yelpRating: this.state.yelpRating,
                                            yelpReviewCount: this.state.yelpReviewCount,
                                            photos: this.state.photos,
                                            openHours: this.state.openHours,
                                            tags: this.state.tags,
                                        },
                                    });
                                }}
                            />
                        </View>
                    );
                }}
                keyExtractor={(item) => item}
                refreshing={false}
                style={{ height: 50}}
            /> */}
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {state.markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Text>I want the restaurant card here</Text>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 20,
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 20,
        // marginTop: 5,

    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    }
});


export default ExploreScreen;




