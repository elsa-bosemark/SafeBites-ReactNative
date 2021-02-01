import React, { useState, useEffect, PureComponent } from "react";
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
import Spacer from "../../components/spacer";
import DefaultButton from "../../components/defaultButton";

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
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [num, setNum] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const [nameList, setNameList] = useState([]);
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

  class LoginInput extends React.Component {
    constructor() {
      super();
      this.state = { value: "", email: "", error: "" };
    }

    update = (e) => {
      this.setState({ value: e });
    };

    updateEmail = (e) => {
      this.setState({ email: e });
    };

    validate = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === false) {
        return false;
      } else {
        return true;
      }
    };

    login = (email, password) => {
      const validator = this.validate(email);
      if (email == "" || password == "") {
        this.setState({ error: "please fill in all fields" });
      } else if (!validator) {
        this.setState({ error: "please enter a valid email address" });
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            setLoginVisible(false);
            setSignupVisible(false);

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
    render() {
      return (
        <View>
          <TextInput
            onChangeText={this.updateEmail}
            value={this.state.email}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="enter email"
            placeholderTextColor={Colors.darkGrey}
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={this.update}
            value={this.state.value}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="enter password"
            placeholderTextColor={Colors.darkGrey}
          />
          <TouchableOpacity
            style={{
              ...styles.closedButton,
              backgroundColor: Colors.primaryColor,
              width: 200,
            }}
            onPress={() => this.login(this.state.email, this.state.value)}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
          <View style={{ height: 10 }} />
          <Text style={(styles.textStyle, { color: "#c90404" })}>
            {this.state.error}
          </Text>

          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={() => {
              setLoginVisible(false);
              setSignupVisible(true);
            }}
          >
            <Text style={(styles.textStyle, { color: Colors.darkGrey })}>
              Don't have an account? Sign up here!
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  class SignupInput extends React.Component {
    constructor() {
      super();
      this.state = {
        password: "",
        email: "",
        error: "",
        firstName: "",
        lastName: "",
      };
    }

    updatePassword = (e) => {
      this.setState({ password: e });
    };

    updateEmail = (e) => {
      this.setState({ email: e });
    };

    updateFirstName = (e) => {
      this.setState({ firstName: e });
    };

    updateLastName = (e) => {
      this.setState({ lastName: e });
    };

    validate = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === false) {
        return false;
      } else {
        return true;
      }
    };

    signup = (email, password, firstName, lastName) => {
      const validator = this.validate(email);
      if (email == "" || password == "") {
        this.setState({ error: "please fill in all fields" });
      } else if (!validator) {
        this.setState({ error: "please enter a valid email address" });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
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
            );
          })
          .catch((error) => {
            this.setState({ error: error });
            console.error(error);
          });
      }
    };

    render() {
      return (
        <View>
          <TextInput
            onChangeText={this.updateFirstName}
            value={this.state.value}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="enter first name"
            placeholderTextColor={Colors.darkGrey}
          />
          <TextInput
            onChangeText={this.updateLastName}
            value={this.state.value}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="enter last name"
            placeholderTextColor={Colors.darkGrey}
          />
          <TextInput
            onChangeText={this.updateEmail}
            value={this.state.email}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="enter email"
            placeholderTextColor={Colors.darkGrey}
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={this.updatePassword}
            value={this.state.value}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="enter password"
            placeholderTextColor={Colors.darkGrey}
          />
          <TouchableOpacity
            style={{
              ...styles.closedButton,
              backgroundColor: Colors.primaryColor,
              width: 200,
            }}
            onPress={() =>
              this.signup(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName
              )
            }
          >
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
          <View style={{ height: 10 }} />
          <Text style={(styles.textStyle, { color: "#c90404" })}>
            {this.state.error ? this.state.error : ""}
          </Text>
          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={() => {
              setLoginVisible(true);
              setSignupVisible(false);
            }}
          >
            <Text style={(styles.textStyle, { color: Colors.darkGrey })}>
              Have an account already? Login here!
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

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

    setNameList(names);
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
        setLoginVisible(false);
        setNum(1);
      }
    } else {
      if (num == 0) {
        setUser(false);
        setLoginVisible(true);
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
                  var coordArray = [];
                  favRestCoords.forEach((element) => {
                    coordArray.push(Object.values(element));
                  });

                  if (
                    favRestCoords != null &&
                    favRestCoords != undefined &&
                    favRestCoords.length > 0
                  ) {
                    return (
                      <RestaurantCard
                        title={item}
                        price={favPrice[index]}
                        cover={favCover[index]}
                        transactions={favTransactions[index]}
                        restaurantCoordinates={coordArray[index]}
                        userCoordinates={userLocation}
                        onSelect={() => {
                          props.navigation.navigate({
                            routeName: "RetaurantDetail",
                            params: {
                              //pass restaurant DATA
                              restIndex: index,
                              title: favorites,
                              price: favPrice,
                              cover: favCover,
                              transactions: favTransactions,
                              restaurantCoordinates: coordArray,
                              userCoordinates: userLocation,
                              phoneNumber: favPhoneNumber,
                              yelpUrl: favURL,
                              yelpRating: favRating,
                              yelpReviewCount: favReviewCount,
                              photos: favPhotos,
                              tags: [favTags[index]],
                            },
                          });
                        }}
                      />
                    );
                  } else {
                    return (
                      <RestaurantCard
                        title={item}
                        price={favPrice[index]}
                        cover={favCover[index]}
                        transactions={favTransactions[index]}
                        restaurantCoordinates={[0, 0]}
                        userCoordinates={userLocation}
                        onSelect={() => {
                          alert("todo!");
                        }}
                      />
                    );
                  }
                }}
                keyExtractor={(item) => item}
              />
              <View style={{ height: 500 }}></View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else {
      if (loginVisible) {
        return (
          <View style={styles.centeredView}>
            <Text style={styles.title}>
              You must login to have a profile page
            </Text>
            <Text style={styles.title}>Login</Text>
            <Spacer />
            <View style={{ height: 10 }} />
            <LoginInput />
          </View>
        );
      } else if (signupVisible) {
        return (
          <View style={styles.centeredView}>
            <Text style={styles.title}>
              You must login to have a profile page
            </Text>
            <Text style={styles.title}>Signup</Text>
            <Spacer />
            <View style={{ height: 10 }} />
            <SignupInput />
          </View>
        );
      } else {
        //uh oh
        return <Text>You must login first to have a profile page</Text>;
      }
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
    //justifyContent: "center",
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
    alignSelf: "center",
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
    width: 300,
    marginTop: 5,
  },
});

export default ProfileScreen;
