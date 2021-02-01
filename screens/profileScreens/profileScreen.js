import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import "firebase/firestore";
import * as firebase from "firebase";
import RootNavigation from "../../config/RootNavigation";
import Colors from "../../constants/Colors";
import { firebaseConfig } from "../../constants/secret";
import RestaurantCard from "../../components/restaurantCard";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import {
  getCover,
  getNames,
  getPrice,
  getPhoneNumbers,
  getPhotos,
  getRestaurantCoords,
  getRestaurantLoc,
  getReviewCount,
  getRating,
  getTags,
  getTransactions,
  getYelpUrl,
  getUserLocation,
} from "../../config/data";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState({});
  const [calledOnce, setCalledOnce] = useState(false);
  const [user, setUser] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [num, setNum] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const [favPrice, setFavPrice] = useState([]);
  const [favCover, setFavCover] = useState([]);
  const [favURL, setFavURl] = useState([]);
  const [favPhoneNumber, setFavPhoneNumber] = useState([]);
  const [favPhotos, setFavPhotos] = useState([]);
  const [favRestCoords, setFavRestCoords] = useState([]);
  const [favRestLoc, setFavRestLoc] = useState([]);
  const [favReviewCount, setFavReviewCount] = useState([]);
  const [favRating, setFavRating] = useState([]);
  const [favTags, setFavTags] = useState([]);
  const [favTransactions, setFavTransactions] = useState([]);
  const [userLocation, setUserLocation] = useState([]);

  const handleFirstName = (text) => {
    setFirstName(text);
  };
  const handleLastName = (text) => {
    setLastName(text);
  };
  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };
  const login = (email, password) => {
    if (email == "" || password == "") {
      setError("Please fill in all fields");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          setAuthVisible(false);
          setLoginVisible(false);
          setSignupVisible(false);

          Alert.alert(
            "Succesfully Signed Up!",
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
          setError(error);
        });
    }
  };

  const signup = (email, password, firstName, lastName) => {
    if (email == "" || password == "") {
      setError("Please fill in all fields");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setAuthVisible(false);
          setLoginVisible(false);
          setSignupVisible(false);

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
            "Succesfully Signed Up!",
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
          setError(error);
          console.error(error);
        });
    }
  };
  async function getFirebaseData() {
    var myDB = firebase.firestore();
    var doc = await myDB
      .collection("users")
      .doc(`${firebase.auth().currentUser.email}`)
      .get();
    if (doc.exists) {
      setName(doc.data().firstName + " " + doc.data().lastName);
    }
  }

  async function getComments() {
    var myArr = [];
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(`${firebase.auth().currentUser.email}`)
      .collection("comments")
      .get();
    let docs = snapshot.docs.map((doc) => doc.data());
    docs.forEach((element) => {
      for (var key in element) {
        myArr.push(element[key]);
      }
    });

    setComments(myArr);
  }
  async function getFavorites() {
    var myArr = [];
    var index = 0;
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(`${firebase.auth().currentUser.email}`)
      .collection("reviews")
      .get();
    let docs = snapshot.docs.map((doc) => doc.data());
    let docNames = snapshot.docs.map((doc) => doc.id);
    docs.forEach((element) => {
      for (var key in element) {
        if (key == "favorite") {
          if (element[key] == "heart") {
            myArr.push(docNames[index]);
          }
        }
      }
      index += 1;
    });
    setFavorites(myArr);

    var names = await getNames();
    var cover = await getCover();
    var price = await getPrice();
    var phoneNum = await getPhoneNumbers();
    var photos = await getPhotos();
    var restCoords = await getRestaurantCoords();
    var restLoc = await getRestaurantLoc();
    var reviewCount = await getReviewCount();
    var rating = await getRating();
    var tags = await getTags();
    var transactions = await getTransactions();
    var url = await getYelpUrl();
    var userLoc = await getUserLocation();

    var coverArr = [];
    var priceArr = [];
    var phoneArr = [];
    var photoArr = [];
    var coordsArr = [];
    var locArr = [];
    var countArr = [];
    var ratingArr = [];
    var tagArr = [];
    var transactionsArr = [];
    var urlArr = [];

    myArr.forEach((element) => {
      let index = names.indexOf(element);
      coverArr.push(cover[index]);
      priceArr.push(price[index]);
      phoneArr.push(phoneNum[index]);
      photoArr.push(photos[index]);
      coordsArr.push(restCoords[index]);
      locArr.push(restLoc[index]);
      countArr.push(reviewCount[index]);
      ratingArr.push(rating[index]);
      tagArr.push(tags[index]);
      transactionsArr.push(transactions[index]);
      urlArr.push(url[index]);
    });
    console.error(userLoc);

    setFavCover(coverArr);
    setFavPrice(priceArr);
    setFavPhoneNumber(phoneArr);
    setFavPhotos(photoArr);
    setFavRestCoords(coordsArr);
    setFavRestLoc(locArr);
    setFavReviewCount(countArr);
    setFavRating(ratingArr);
    setFavTags(tagArr);
    setFavTransactions(transactionsArr);
    setFavURl(urlArr);
    setUserLocation(userLoc);
  }

  firebase.auth().onAuthStateChanged((userAuth) => {
    if (userAuth) {
      if (num == 0) {
        setUser(true);
        setAuthVisible(false);
        setNum(1);
      }
    } else {
      if (num == 0) {
        setUser(false);
        setAuthVisible(true);
        setNum(1);
      }
    }
  });

  if (!calledOnce) {
    if (user) {
      getFirebaseData();
      getComments();
      setCalledOnce(true);
      getFavorites();
    }
  }

  const Profile = () => {
    if (user) {
      return (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={[styles.card, styles.row]}>
              {/* image placeholder */}
              <Image
                style={styles.profileImage}
                source={{
                  url:
                    "https://pitshanger-ltd.co.uk/images/colours/563-Clementine%201495.jpg",
                }}
              />
              <View>
                {/* username */}
                <Text style={styles.title}>{`hello, ${name}`}</Text>

                <View style={[styles.greyCard, styles.row]}>
                  <View>
                    <Text style={styles.infoText}>reviews</Text>
                    <Text style={styles.num}>{comments.length - 1}</Text>
                  </View>
                  <View>
                    <Text style={styles.infoText}>photos</Text>
                    <Text style={styles.num}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Button
              title="Logout"
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    Alert.alert("Successfully logged out", "See you later!");
                    RootNavigation.navigate("Home");
                  })
                  .catch((error) => {
                    // An error happened.
                    console.error(error);
                    Alert.alert("ERROR SIGNING OUT", error);
                  });
              }}
            />
            <ScrollView>
              <Text style={styles.title}>Comments</Text>
              <View
                style={{
                  width: "80%",
                  borderRadius: 10,
                  alignSelf: "center",
                  borderColor: "black",
                  borderWidth: 0.2,
                }}
              >
                <FlatList
                  data={comments}
                  renderItem={({ item, index }) => {
                    return <Text style={{ paddingLeft: 10 }}>{item}</Text>;
                  }}
                  keyExtractor={(item) => item}
                />
              </View>
              <Text style={styles.title}>Favorites</Text>
              <FlatList
                data={favorites}
                renderItem={({ item, index }) => {
                  console.error(
                    JSON.stringify(favRestCoords[index]) + " rest coords"
                  );
                  return (
                    <RestaurantCard
                      title={item}
                      price={favPrice[index]}
                      cover={favCover[index]}
                      transactions={favTransactions[index]}
                      restaurantCoordinates={[
                        favRestCoords[index].latitude,
                        favRestCoords[index].longitude,
                      ]}
                      userCoordinates={userLocation}
                      onSelect={() => {
                        alert("todo!");
                        // this.props.navigation.navigate({
                        //   routeName: 'RetaurantDetail', params: {
                        //     //pass restaurant DATA
                        //     // restIndex: index,
                        //     // title: this.state.title,
                        //     // price: this.state.price,
                        //     // cover: this.state.cover,
                        //     // transactions: this.state.transactions,
                        //     // restaurantCoordinates: this.state.restaurantCoordinates,
                        //     // userCoordinates: this.state.location,
                        //     // phoneNumber: this.state.phoneNumber,
                        //     // address: this.state.address,
                        //     // yelpUrl: this.state.yelpUrl,

                        //     // yelpRating: this.state.yelpRating,
                        //     // yelpReviewCount: this.state.yelpReviewCount,
                        //     // photos: this.state.photos,
                        //     // openHours: this.state.openHours,
                        //     // tags: this.state.tags,
                        //   }
                        // })
                      }}
                    />
                  );
                }}
                keyExtractor={(item) => item}
              />
              <View style={{ height: 500 }}></View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <Text style={styles.title}>
            You must login to have a profile page!
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={authVisible}
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
                    setAuthVisible(false);
                    setLoginVisible(true);
                  }}
                >
                  <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.closedButton }}
                  onPress={() => {
                    setSignupVisible(true);
                    setAuthVisible(false);
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
                    setAuthVisible(false);
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
            visible={loginVisible}
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
                  onChangeText={handleEmail}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="enter password"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  onChangeText={handlePassword}
                />
                <TouchableOpacity
                  style={{
                    ...styles.closedButton,
                    backgroundColor: Colors.primaryColor,
                    width: 100,
                  }}
                  onPress={() => login(email, password)}
                >
                  <Text style={styles.textStyle}> Submit </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.closedButton, width: 100 }}
                  onPress={() => {
                    setLoginVisible(!loginVisible);
                    setAuthVisible(true);
                  }}
                >
                  <Text
                    style={{ ...styles.textStyle, color: Colors.primaryColor }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
                <Text>{error}</Text>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={signupVisible}
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
                  onChangeText={handleFirstName}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="enter last name"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  onChangeText={handleLastName}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="enter email"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  onChangeText={handleEmail}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="enter password"
                  placeholderTextColor={Colors.grey}
                  autoCapitalize="none"
                  onChangeText={handlePassword}
                />
                <TouchableOpacity
                  style={{
                    ...styles.closedButton,
                    backgroundColor: Colors.primaryColor,
                    width: 100,
                  }}
                  onPress={() => {
                    signup(email, password, firstName, lastName);
                  }}
                >
                  <Text style={styles.textStyle}> Submit </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.closedButton, width: 100 }}
                  onPress={() => {
                    setAuthVisible(true);
                    setSignupVisible(false);
                  }}
                >
                  <Text
                    style={{ ...styles.textStyle, color: Colors.primaryColor }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
                <Text>{error}</Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  };

  return <Profile />;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontFamily: "rubik",
    fontSize: 20,
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    //justifyContent: 'space-between',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  greyCard: {
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
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
export default ProfileScreen;
