import React, { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { markers, mapStandardStyle } from "../data/mapData";
import Color from "../constants/Colors";
import RestaurantCard from "../components/restaurantCard";
import { setCalledOnce } from "../config/updateData";

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
  getData,
  getUserLocation,
  getNames,
  getCover,
  getPhoneNumbers,
  getRestaurantCoords,
  getRestaurantLoc,
  getYelpUrl,
  getPrice,
  getTransactions,
  getRating,
  getReviewCount,
  getPhotos,
  getTags,
} from "../config/data";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

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

const ExploreScreen = (props) => {
  const [userLocation, setUserLocation] = useState(undefined);
  const [names, setNames] = useState(undefined);
  const [covers, setCovers] = useState(undefined);
  const [phoneNumbers, setPhoneNumbers] = useState(undefined);
  var [restCOORDS, setrestCOORDS] = useState(undefined);
  const [restaurantLoc, setRestaurantLoc] = useState(undefined);
  const [URL, setURL] = useState(undefined);
  const [transactions, setTransactions] = useState(undefined);
  const [ratings, setRatings] = useState(undefined);
  const [reviewCount, setReviewCount] = useState(undefined);
  const [photos, setPhotos] = useState(undefined);
  const [tags, setTags] = useState(undefined);
  const [PRICE, setThisPrice] = useState(undefined);

  const _getData = async () => {
    let userLoc = await getUserLocation();
    let _names = await getNames();
    let covers = await getCover();
    let phoneNumber = await getPhoneNumbers();
    let restCoord = await getRestaurantCoords();
    let restLoc = await getRestaurantLoc();
    let url = await getYelpUrl();
    let price = await getPrice();
    let transaction = await getTransactions();
    let rating = await getRating();
    let reviewCount = await getReviewCount();
    let photos = await getPhotos();
    let tags = await getTags();
    setNames(_names);

    // useEffect(() => {
    setNames(_names);
    setCovers(covers);
    setRestaurantLoc(restLoc);
    setURL(url);
    setTransactions(transaction);
    setRatings(rating);
    setReviewCount(reviewCount);
    setPhotos(photos);
    setTags(tags);
    setUserLocation(userLoc);
    setThisPrice(price);
    setrestCOORDS(restCoord);
  };
  _getData();
  const initialMapState = {
    markers,
    categories: [
      {
        name: "Pickup",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="food-fork-drink"
            size={18}
            color={Color.accentColor}
          />
        ),
      },
      {
        name: "Delivery",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="motorbike"
            size={18}
            color={Color.accentColor}
          />
        ),
      },
      {
        name: "Takeout",
        icon: (
          <MaterialCommunityIcons
            name="table-chair"
            style={styles.chipsIcon}
            size={18}
            color={Color.accentColor}
          />
        ),
      },
      {
        name: "Outdoor Seating",
        icon: (
          <MaterialCommunityIcons
            name="weather-sunny"
            style={styles.chipsIcon}
            size={15}
            color={Color.accentColor}
          />
        ),
      },
    ],
    region: {
      //This should be based on location of user
      latitude: userLocation == undefined ? 37.1 : userLocation[0],
      longitude: userLocation == undefined ? -122.1 : userLocation[1],
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= restCOORDS.length) {
        index = restCOORDS.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const coordinate = restCOORDS ? restCOORDS[index] : [31.7, -122.1];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            },
            350
          );
        }
      }, 10);
    });
  });
  var interpolations;
  if (restCOORDS) {
    interpolations = restCOORDS.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];

      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });

      return { scale };
    });
  } else {
    interpolations = state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];

      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });

      return { scale };
    });
  }
  const Markers = () => {
    if (restCOORDS != undefined) {
      var markerArray = [];
      //only 20 for now bc rendering ALL 50 of them is too much
      for (var i = 0; i < 20; i++) {
        markerArray.push(
          <MapView.Marker
            key={i}
            coordinate={restCOORDS[i]}
            onPress={(e) => onMarkerPress(e)}
          >
            <Animated.View style={[styles.markerWrap]}>
              <Animated.Image
                source={require("../assets/map_marker.png")}
                style={[styles.marker]}
                resizeMode="cover"
              />
            </Animated.View>
          </MapView.Marker>
        );
      }
      return markerArray;
    } else {
      return null;
    }
  };
  const _scrollView = React.useRef(null);
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollToIndex({ animated: true, index: markerID });
  };

  const _map = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        region={{
          //This should be based on location of user
          latitude: userLocation == undefined ? 37.1 : userLocation[0],
          longitude: userLocation == undefined ? -122.1 : userLocation[1],
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        }}
        style={{ height: "70%" }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}
        showsUserLocation={true}
      >
        <Markers></Markers>
      </MapView>
      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View> */}
      {/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <FlatList
        horizontal={true}
        data={names}
        ref={_scrollView}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.restcard}>
              <RestaurantCard
                title={item}
                price={PRICE ? PRICE[index] : "??"}
                cover={covers ? covers[index] : null}
                safetyScore={9}
                transactions={transactions ? transactions[index] : ""}
                restaurantCoordinates={
                  restCOORDS
                    ? [restCOORDS[index].latitude, restCOORDS[index].longitude]
                    : [12, 23]
                }
                userCoordinates={userLocation}
                onSelect={() => {
                  var coords = [];
                  if (restCOORDS) {
                    for (var i = 0; i < names.length; i++) {
                      coords.push([
                        restCOORDS[i].latitude,
                        restCOORDS[i].longitude,
                      ]);
                    }
                  }
                  setCalledOnce(false);
                  props.navigation.navigate({
                    routeName: "RetaurantDetail",
                    params: {
                      //pass restaurant DATA
                      restIndex: index,
                      title: names,
                      price: PRICE,
                      cover: covers,
                      transactions: transactions,
                      restaurantCoordinates: coords,
                      userCoordinates: userLocation,
                      phoneNumber: phoneNumbers,
                      yelpUrl: URL,
                      yelpRating: ratings,
                      yelpReviewCount: reviewCount,
                      photos: photos,
                      tags: tags,
                    },
                  });
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item}
        refreshing={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%" },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
    height: 40,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
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
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    backgroundColor: "transparent",
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
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  restcard: {
    backgroundColor: Color.primaryColor,
  },
});

export default ExploreScreen;
