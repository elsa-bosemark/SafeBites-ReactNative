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
  authVisible: true,
  signupVisible: false,
  loginVisible: false,

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

  login = (email, password) => {
    if (email == "" || password == "") {
      this.setState({ error: "please fill in all fields" });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          // this.setState({ authVisible: false })
          this.setState({
            authVisible: false,
            loginVisible: false,
            signupVisible: false,
          });
          Alert.alert(
            "Successfully Signed Up!",
            "Thanks for signing up!",
            [
              {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        })
        .catch((error) => {
          this.setState({ error: error });
        });
    }
  };

  signup = (email, password, firstName, lastName) => {
    if (email == "" || password == "") {
      this.setState({ error: "please fill in all fields" });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            authVisible: false,
            loginVisible: false,
            signupVisible: false,
          });
          var myDB = firebase.firestore();
          var doc = myDB.collection("users").doc(`${email}`).get();
          if (!doc.exists) {
            console.log("No document");
            myDB.collection("users").doc(`${email}`).set({
              firstName: firstName,
              lastName: lastName,
            });
          }

          Alert.alert(
            "Successfully Signed Up!",
            "Thanks for signing up!",
            [
              {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          ); // this.props.navigation.navigate('Home')
        })
        .catch((error) => {
          this.setState({ error: error });
          console.error(error);
        });
    }
  };
  //screen did load
  componentDidMount() {
    this.getLocationAsync();
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
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.setState({
          authVisible: false,
          loginVisible: false,
          signupVisible: false,
        });
      }
    });
  }

  constructor(props) {
    super(props);
  }
  //fetch yelp api
  fetchApiCall = () => {
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
    axios
      .get(
        `https://api.yelp.com/v3/businesses/search?term=&latitude=${this.state.location.latitude}&longitude=${this.state.location.longitude}&limit=50&radius=400`,
        { headers: headers }
      )
      .then((response) => {
        storeData(response.data.businesses);
        didSetApi = true;
        response.data.businesses
          .forEach((element) => {
            names.push(element.name);
            phoneNums.push(element.display_phone);
            _cover.push(element.image_url);
            _restaurantLocation.push(element.location);
            _yelpUrl.push(element.url);
            _price.push(element.price);
            _transactions.push(element.transactions);
            _restaurantCoordinates.push(element.coordinates);
            _yelpRating.push(element.rating);
            _yelpReviewCount.push(element.review_count);
            _photos.push(element.photos);
            _openHours.push(element.hours);
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
  };
  //get location of user's phone
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    const { latitude, longitude } = location.coords;
    this.setState({ location: { latitude, longitude } });
    storeUserLocation([latitude, longitude]);
    this.fetchApiCall();
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
              Alert.alert(
                "Please wait",
                "Our data is currently loading. Please wait a couple seconds until you can search by categories! Thanks so much!"
              );
            } else {
              this.props.navigation.navigate({
                routeName: "RestaurantCategory",
                params: {
                  categoryId: itemData.item.id,
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

    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.authVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You haven't logged in yet! You can't rate anything yet.
              </Text>
              <TouchableOpacity
                style={{
                  ...styles.closedButton,
                  backgroundColor: Colors.accentColor,
                }}
                onPress={() => {
                  this.setState({
                    authVisible: !this.state.authVisible,
                    loginVisible: !this.state.loginVisible,
                  });
                }}
              >
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.closedButton }}
                onPress={() => {
                  this.setState({
                    signupVisible: !this.state.signupVisible,
                    authVisible: !this.state.authVisible,
                  });
                }}
              >
                <Text
                  style={{ ...styles.textStyle, color: Colors.primaryColor }}
                >
                  Signup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.closedButton }}
                onPress={() => {
                  this.setState({ authVisible: !this.state.authVisible });
                }}
              >
                <Text
                  style={{ ...styles.textStyle, color: Colors.primaryColor }}
                >
                  Continue as Guest
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.loginVisible ? this.state.loginVisible : false}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>LOGIN</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter email"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter password"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handlePassword}
              />
              <TouchableOpacity
                style={{
                  ...styles.closedButton,
                  backgroundColor: Colors.primaryColor,
                  width: 100,
                }}
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }
              >
                <Text style={styles.textStyle}> Submit </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.closedButton, width: 100 }}
                onPress={() => {
                  this.setState({
                    loginVisible: !this.state.loginVisible,
                    authVisible: !this.state.authVisible,
                  });
                }}
              >
                <Text
                  style={{ ...styles.textStyle, color: Colors.primaryColor }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <Text>{this.state.error}</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.signupVisible ? this.state.signupVisible : false}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>SIGNUP</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter first name"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handleFirstName}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter last name"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handleLastName}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter email"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="enter password"
                placeholderTextColor={Colors.grey}
                autoCapitalize="none"
                onChangeText={this.handlePassword}
              />
              <TouchableOpacity
                style={{
                  ...styles.closedButton,
                  backgroundColor: Colors.primaryColor,
                  width: 100,
                }}
                onPress={() => {
                  this.signup(
                    this.state.email,
                    this.state.password,
                    this.state.firstName,
                    this.state.lastName
                  );
                }}
              >
                <Text style={styles.textStyle}> Submit </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.closedButton, width: 100 }}
                onPress={() => {
                  this.setState({
                    signupVisible: !this.state.signupVisible,
                    authVisible: !this.state.authVisible,
                  });
                }}
              >
                <Text
                  style={{ ...styles.textStyle, color: Colors.primaryColor }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <Text>{this.state.error}</Text>
            </View>
          </View>
        </Modal>

        <Text style={styles.title}>Categories</Text>
        <ScrollView>
          <FlatList
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            keyExtractor={(item) => item}
          />
        </ScrollView>

        <Text style={styles.title}>Find</Text>
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
          />
        </View>

        <ActivityIndicator animating={this.state.loading} />

        <FlatList
          data={
            this.state.filteredRestaurants &&
            this.state.filteredRestaurants.length > 0
              ? this.state.filteredRestaurants
              : this.state.title
          }
          renderItem={({ item, index }) => {
            //const restaurantDistance = getDistance(
            //   this.state.location,
            //   this.state.restaurantCoordinates[index]
            //);
            return (
              //  <Text style={{ marginBottom: 10 }}>{item}</Text>

              <RestaurantCard
                title={item}
                price={this.state.price[index]}
                cover={
                  this.state.cover[actualIndex(item)]
                    ? this.state.cover[actualIndex(item)]
                    : null
                }
                transactions={this.state.transactions[actualIndex(item)]}
                restaurantCoordinates={
                  this.state.restaurantCoordinates[actualIndex(item)]
                }
                userCoordinates={this.state.location}
                // curbsidePickup={true}
                // takeout={false}
                // delivery={true}
                onSelect={() => {
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
            );
          }}
          size="large"
          keyExtractor={(item) => item}
          refreshing={false}
          style={{ marginBottom: 350 }}
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
    padding: 20,
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
});
export default HomeScreen;
