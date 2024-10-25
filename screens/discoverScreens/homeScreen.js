import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableCmp,
  Image,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { headers } from "../../constants/secret";
import Colors from "../../constants/Colors";
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
} from "../../config/data";
import { CATEGORIES } from "../../data/categoryData";
import CategoryGridTile from "../../components/categoryGridTile";
import RestaurantCard from "../../components/restaurantCard";
import { setCalledOnce } from "../../config/updateData";
//global variables (access by this.state and set by this.setState)
export var didSetApi = false;
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

  //website = null // need google
  // googlePhoneNumber = null, // need google
  // googleRating = null, // need google
  // googleReviewCount = null, // need google
  // googleMapsUrl = null, // need google
};

class HomeScreen extends React.Component {
  //-------FUNCTIONS-------
  //more states
  state = {
    search: "",
    nameList: [],
    email: "",
    password: "",
    error: "",
    firstName: "",
    lastName: "",
    passwordVisible: "eye-off-outline",
    usersRated: [],
    feelSafe: [],
    callDataOnce: false,
  };
  handleFirstName = (text) => {
    this.setState({ firstName: text });
  };
  handleLastName = (text) => {
    this.setState({ lastName: text });
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  getFirebaseData = async (names) => {
    names.forEach(async (element) => {
      const doc = await firebase
        .firestore()
        .collection("reviews")
        .doc(element)
        .get();

      if (doc.exists) {
        var _feelSafe = this.state.feelSafe ? this.state.feelSafe : [];
        _feelSafe.push(Math.round(doc.data().safety / doc.data().usersRated));
        this.setState({ feelSafe: _feelSafe });
      } else {
        var _feelSafe = this.state.feelSafe ? this.state.feelSafe : [];
        _feelSafe.push("?");
        this.setState({ feelSafe: _feelSafe });
      }
    });

    // let doc = await myDB.collection("reviews").doc(restTitles[restIndex]).get();
    // // let _comments = await myDB.collection('reviews').doc(restTitles[restIndex]).collection('comments').doc()
    // if (doc.exists) {
    //   let usersRated = doc.data().usersRated;
    //   this.setState({usersRated: usersRated});
    //   this.setState({feelSafe: Math.round(doc.data().safety/usersRated)})

    // } else {
    //   this.setState({usersRated: "?", feelSafe:"?"})
    // }
  };

  //screen did load
  componentDidMount() {
    this.getLocationAsync();
    console.warn("getting location async");
    //this takes longer and since we don't display it, we can do it later
    if (
      this.state.restaurantLocations != null ||
      this.state.response != undefined
    ) {
      this.state.restaurantLocations.forEach((element) => {
        addresses.push(element.display_address);
        this.setState({
          address: addresses,
        });
      });
    }
  }

  constructor(props) {
    super(props);
  }
  //fetch yelp api
  fetchApiCall = () => {
    Alert.alert("Please Wait!", "Please wait for the data to load before using our features (may take a few seconds). Thank you! ");
    let names = [];
    let phoneNums = [];
    let _yelpUrl = [];
    let _cover = [];
    let addresses = [];
    let _restaurantLocation = [];
    let _price = [];
    let _transactions = [];
    let _restaurantCoordinates = [];

    let _yelpRating = [];
    let _yelpReviewCount = [];
    let _photos = [];
    let _tags = [];

    //Not working
    let _openHours = [];

    // this.setState({ loading: true });
    if (this.state.location != null) {
      console.warn("has location");
      console.warn(this.state.location);
      axios
        .get(
          `https://api.yelp.com/v3/businesses/search?term=&latitude=${this.state.location.latitude}&longitude=${this.state.location.longitude}&limit=50`,
          { headers: headers }
        )
        .then((response) => {
          storeData(response.data.businesses);
          didSetApi = true;
          response.data.businesses
            .forEach((element) => {
              names.push(element.name);
              phoneNums.push(element.phone);
              _cover.push(element.image_url);
              _restaurantLocation.push(element.location);
              _yelpUrl.push(element.url);
              _price.push(element.price);
              _transactions.push(element.transactions);
              _restaurantCoordinates.push(element.coordinates);
              _yelpRating.push(element.rating);
              _yelpReviewCount.push(element.review_count);
              _photos.push(element.photos);
              _openHours.push(element.is_closed);
              _tags.push(element.categories);
              this.setState({
                title: names,
                error: response.error || null,
                loading: false,
                refreshing: false,
                phoneNumber: phoneNums,
                cover: _cover,
                restaurantLocations: _restaurantLocation,
                price: _price,
                transactions: _transactions,
                restaurantCoordinates: _restaurantCoordinates,
                yelpUrl: _yelpUrl,

                yelpRating: _yelpRating,
                yelpReviewCount: _yelpReviewCount,
                photos: _photos,
                tags: _tags,
                openHours: _openHours,
              });
              storeNames(names);
              storePhoneNumbers(phoneNums);
              storeCover(_cover);
              storePrice(_price);
              storeTransactions(_transactions);
              storeRestaurantLoc(_restaurantLocation);
              storeRestaurantCoords(_restaurantCoordinates);
              storeYelpUrl(_yelpUrl);
              storeRating(_yelpRating);
              storePhotos(_photos);
              storeTags(_tags);
              storeReviewCount(_yelpReviewCount);
              console.error("JUST FINISHED SETTING AND DONE LOADING");
            })
            .catch((error) => {
              if (error.response) {
                console.error(error.response);
              } else if (error.request) {
                console.error(error.request);
              } else if (error.message) {
                console.error(error.message);
              }
            });
        });
    } else {
      console.warn("location is null");
      this.getLocationAsync();
    }
    setTimeout(() => {
      this.getFirebaseData(names);
    }, 3000);
  };
  //get location of user's phone
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
      Alert.alert(
        "we cannot display anything without permission to access location."
      );
    } else {
      console.warn("has permision");
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      const { latitude, longitude } = location.coords;
      this.setState({ location: { latitude, longitude } });
      storeUserLocation([latitude, longitude]);
      this.fetchApiCall();
      console.log("GETTING STUFF");
    }
  };

  //get the geocode
  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    this.setState({ geocode });
  };
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

    const actualIndex = (item) => {
      return this.state.title.indexOf(item);
    };
    //console.log('the index of the rest is   '+restIndex)

    const renderGridItem = (itemData) => {
      return (
        <CategoryGridTile
          title={itemData.item.title}
          icon={itemData.item.icon}
          onSelect={() => {
            if (this.state.loading) {
              console.warn("STILL LOAIDNG");
              Alert.alert(
                "Please wait",
                "Our data is currently loading. Please wait a couple seconds until you can search by categories! Thanks so much!"
              );
            } else {
              console.warn("done loading");
              this.props.navigation.navigate({
                routeName: "RestaurantCategory",
                params: {
                  categoryId: itemData.item.id,
                  categoryTitle: itemData.item.title,
                  //pass restaurant DATA so it is accessible to detailScreen when on catScreen
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
            }
          }}
        />
      );
    };

    const run = () => {
      console.log("home screen   " + this.state.openHours[0].open[0].day);
    };
    const SafetyCategories = () => {
      if (this.state.search.length > 0) {
        return null;
      } else {
        return (
          <View>
            <Text style={styles.title}>Safety Categories</Text>

            <FlatList
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              renderItem={renderGridItem}
              key={(item) => item}
            />
          </View>
        );
      }
    };
    return (
      <SafeAreaView>
        {/* SCREEN STARTS */}
        {/* BANNER */}

        <View style={styles.banner}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              paddingBottom: 10,
            }}
          >
            See how well restaurants are protecting YOU from COVID
          </Text>

          <View style={styles.searchBar}>
            <SearchBar
              placeholder="Search..."
              onChangeText={this.updateSearch}
              value={search}
              color="black"
              platform={Platform.OS === "android" ? "android" : "ios"}
              containerStyle={{
                backgroundColor: "",
              }}
              inputContainerStyle={{
                borderRadius: 10,
                backgroundColor: "white",
              }}
              cancelButtonProps={{
                color: "white",
              }}
            />
          </View>
        </View>
        <SafetyCategories></SafetyCategories>
        <Text style={styles.title}>Near You</Text>

        <ActivityIndicator animating={this.state.loading} />

        <FlatList
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
          style={{ height: 500 }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "rubik",
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
  },
  searchBar: {
    padding: Platform.OS === "android" ? 10 : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closedButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: Colors.grey,
    borderWidth: 1,
    paddingLeft: 10,
    width: 200,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
  },
  banner: {
    padding: 30,
    backgroundColor: Colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  searchButton: {
    justifyContent: "space-around",
    width: "50%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
export default HomeScreen;
