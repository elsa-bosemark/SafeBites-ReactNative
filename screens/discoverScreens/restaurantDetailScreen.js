import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
  Linking,
  Dimensions,
  Alert,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getDistance } from "geolib";
import { Ionicons } from "@expo/vector-icons";
import { getData, storeCurrentRestaurant } from "../../config/data";
import * as firebase from "firebase";
import "firebase/firestore";

import CatIcon from "../../components/catIcon";
import Colors from "../../constants/Colors";
import Divider from "../../components/divider";
import { ScoreSlider } from "../../components/slider";
import CircleButton from "../../components/circleButton";
import DefaultButton from "../../components/defaultButton";
import SafetyCard from "../../components/safetyCard";
import Title from "../../components/title";
import ServisRating from "../../components/servisRating";
import YelpServisRating from "../../components/yelpServisRating";
import Credit from "../../components/credit";
import { Tags } from "../../components/tags";
import OpenHours from "../../components/openHours";
// import PhotoSlider from '../../components/photoSlider/photoSlider';
import SafetyScore from "../../components/handSanatizer";
import { callNumber } from "../../config/Call";

const RestaurantDetailScreen = (props) => {
  const [masks, setMasks] = useState(0);
  const [handSanitizer, setHandSanitizer] = useState(0);
  const [shields, setShields] = useState(0);
  const [sanitizeAfter, setSanitizeAfter] = useState("");
  const [tempChecks, setTempChecks] = useState("");
  const [signs, setSigns] = useState("");
  const [feelSafe, setFeelSafe] = useState(0);
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [calledOnce, setCalledOnce] = useState(false);
  const [favorite, setFavorite] = useState("heart-outline");
  ("fav");
  //getting all params
  const restIndex = props.navigation.getParam("restIndex");
  const restTitles = props.navigation.getParam("title");
  const transactions = props.navigation.getParam("transactions");
  const price = props.navigation.getParam("price");
  const cover = props.navigation.getParam("cover");
  const restaurantCoordinates = props.navigation.getParam(
    "restaurantCoordinates"
  );
  const userCoordinates = props.navigation.getParam("userCoordinates");
  const phoneNumber = props.navigation.getParam("phoneNumber");
  const address = props.navigation.getParam("address");
  const yelpUrl = props.navigation.getParam("yelpUrl");

  const yelpRating = props.navigation.getParam("yelpRating");
  const yelpReviewCount = props.navigation.getParam("yelpReviewCount");
  const photos = props.navigation.getParam("photos");
  const openHours = props.navigation.getParam("openHours");
  const tags = props.navigation.getParam("tags");

  const getData = async () => {
    let myDB = firebase.firestore();
    let doc = await myDB.collection("reviews").doc(restTitles[restIndex]).get();
    // let _comments = await myDB.collection('reviews').doc(restTitles[restIndex]).collection('comments').doc()
    if (doc.exists) {
      let usersRated = doc.data().usersRated;
      setUserRating(usersRated);

      setMasks(Math.round(doc.data().masks / usersRated));
      setHandSanitizer(Math.round(doc.data().handSanitizer / usersRated));
      setShields(Math.round(doc.data().shields / usersRated));
      setSanitizeAfter(doc.data().sanitizeSurfaces);
      setTempChecks(doc.data().tempChecks);
      setSigns(doc.data().safetySigns);
      setFeelSafe(Math.round(doc.data().safety / usersRated));
      // setComments()
    } else {
      setUserRating("?");
      setMasks("?");
      setHandSanitizer("?");
      setShields("?");
      setSanitizeAfter("?");
      setTempChecks("?");
      setSigns("?");
      setFeelSafe("?");
    }
  };
  storeCurrentRestaurant(restTitles[restIndex]);
  const getFavorites = async () => {
    var myArr = [];
    var index = 0;
    if (
      firebase.auth().currentUser != null &&
      firebase.auth().currentUser != undefined
    ) {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("reviews")
        .get();
      let docs = snapshot.docs.map((doc) => doc.data());
      let docNames = snapshot.docs.map((doc) => doc.id);
      docs.forEach((element) => {
        for (var key in element) {
          if (element[key] == "heart") {
            myArr.push(docNames[index]);
          }
        }
        index += 1;
      });
      if (myArr.includes(restTitles[restIndex])) {
        setFavorite("heart");
      }
    }
  };
  //Calculate the distance of rest
  const restaurantDistance = getDistance(
    userCoordinates,
    restaurantCoordinates[restIndex]
  );
  //open link function
  const openLink = (url) =>
    Linking.openURL(url).catch(() => {
      Alert.alert("Sorry, something went wrong.", "Please try again later.");
    });

  async function getComments() {
    var myArr = [];
    const snapshot = await firebase
      .firestore()
      .collection("reviews")
      .doc(restTitles[restIndex])
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
  if (!calledOnce) {
    getComments();
    setCalledOnce(true);
    getData();
    getFavorites();
  }

  const screenWidth = Math.round(Dimensions.get("window").width);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image style={styles.image} source={{ uri: cover[restIndex] }} />
            {/* Restaurant Title */}
            <Title text={restTitles[restIndex]} />
            <View style={styles.row}>
              {/* Transactions */}
              <View style={{ flex: 1 }}>
                <CatIcon cat={transactions[restIndex]} />

                {/* Price and Distance */}
                <View
                  style={{
                    ...styles.row,
                    ...{ marginTop: 15, marginBottom: 15 },
                  }}
                >
                  <View style={styles.tag}>
                    <Text
                      style={{
                        ...styles.text,
                        ...{ fontSize: 19, color: "white" },
                      }}
                    >
                      {price[restIndex]}
                    </Text>
                  </View>
                  <View style={{ ...styles.row, ...{ alignItems: "center" } }}>
                    <Ionicons
                      style={styles.icon}
                      name="md-location-sharp"
                      size={35}
                      color={Colors.primaryColor}
                    />
                    <Text style={{ ...styles.text, ...{ fontSize: 20 } }}>
                      {Number((restaurantDistance / 1000).toFixed(1))} km
                    </Text>
                  </View>
                </View>

                {/* Extra Info*/}
                {/* <OpenHours hours={openHours[restIndex]}/> */}
                <Text style={styles.title}>Max capacity: ???</Text>
                <Text style={styles.title}>Open hours: ???</Text>
              </View>
              {/* Rating Score*/}
              <View style={{ flex: 1, alignItems: "center" }}>
                <SafetyScore score={feelSafe} size={1.5} />
              </View>
            </View>
            {/* Make tags into a diff comp being an array*/}
            <Text style={styles.title}>Tags:</Text>
            <View style={{ flexDirection: "row" }}>
              <Tags restTags={tags[restIndex]} />
            </View>
          </View>
          <Credit logo={require("../../assets/yelpStars/yelpLogo.png")} />
          <Divider />
          <DefaultButton
            text="Rate"
            buttonColor={Colors.primaryColor}
            textColor="#fff"
            onSelect={() => {
              setCalledOnce(false);
              props.navigation.navigate("Rate");
            }}
          />
          <Divider />
          <View style={styles.card}>
            {/* Favorites, Call and Directions */}

            <View style={{ felx: 1 }}>
              <View style={{ ...styles.row, ...{ alignItems: "center" } }}>
                <CircleButton
                  icon={favorite}
                  color={favorite === "heart" ? "#c90404" : Colors.grey}
                  title="Favorite"
                  onSelect={() => {
                    if (
                      firebase.auth().currentUser != null &&
                      firebase.auth().currentUser != undefined
                    ) {
                      if (favorite == "heart") {
                        setFavorite("heart-outline");
                        let myDB = firebase.firestore();
                        let thisUser = firebase.auth().currentUser.email;
                        if (thisUser) {
                          myDB
                            .collection("users")
                            .doc(thisUser)
                            .collection("reviews")
                            .doc(restTitles[restIndex])
                            .set(
                              {
                                favorite: "heart-outline",
                              },
                              { merge: true }
                            );
                        }
                      } else {
                        setFavorite("heart");
                        let myDB = firebase.firestore();
                        let thisUser = firebase.auth().currentUser.email;

                        if (thisUser) {
                          myDB
                            .collection("users")
                            .doc(thisUser)
                            .collection("reviews")
                            .doc(restTitles[restIndex])
                            .set(
                              {
                                favorite: "heart",
                              },
                              { merge: true }
                            );
                        }
                      }
                    } else {
                      Alert.alert(
                        "Login",
                        "Sorry! To use features like saving favorite restaurants, you have to login! "
                      );
                    }
                  }}
                />
                <CircleButton
                  icon="call"
                  color={Colors.grey}
                  title="Call"
                  onSelect={() => {
                    // Linking.openURL(`tel://+14156068631`);
                    // console.error(phoneNumber[restIndex]);
                    callNumber(phoneNumber[restIndex]);
                  }}
                />
                <CircleButton
                  icon="map"
                  color={Colors.grey}
                  title="Direction"
                  onSelect={() => {
                    Alert.alert("TODO");
                  }}
                />
                <CircleButton
                  icon="attach"
                  color={Colors.grey}
                  title="Website"
                  onSelect={() => {
                    Alert.alert("TODO");
                  }}
                />
              </View>
            </View>
          </View>
          <Divider />
          {/* Slider Rating */}
          <View style={styles.card}>
            <Title text="Covid Prevention Rating" />
            {/* Sliders */}
            <ScoreSlider
              safetyTitle="There is enforcement and use of masks "
              score={masks}
              reviewCount={userRating}
            />
            <ScoreSlider
              safetyTitle="Hand sanitizers are available "
              score={handSanitizer}
              reviewCount={userRating}
            />
            <ScoreSlider
              safetyTitle="There are sheilds/physical barriers"
              score={shields}
              reviewCount={userRating}
            />
            {/* Yes or no Info  OPTIONS: yes, no, or idk*/}
            <SafetyCard
              text="Surfaces are sanitized after each patron"
              result={sanitizeAfter}
              reviewCount={userRating}
            />
            <SafetyCard
              text="Staff give tempature checks to customers"
              result={tempChecks}
              reviewCount={userRating}
            />
            <SafetyCard
              text="Signage promoting safety is visible"
              result={signs}
              reviewCount={userRating}
            />
            {/* <SafetyCard text='' result=''/> */}
          </View>

          <Divider />

          {/* Comments */}
          <View style={styles.card}>
            <Title text="Comments" />
            {/* <Text>{comments}</Text> */}
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
          </View>

          <Divider />

          {/* service Review */}
          <View style={styles.card}>
            <Title text="Food and Service Review" />
            <YelpServisRating
              text="Yelp"
              rating={yelpRating[restIndex]}
              reviewCount={yelpReviewCount[restIndex]}
              onSelect={() => {
                openLink(yelpUrl[restIndex]);
              }}
            />
            <ServisRating text="Google" rating={3} reviewCount={100} />
          </View>

          <Divider />
          <View style={styles.card}>
            <Title text="Order or Reserve Now" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantDetailScreen.navigationOptions = (navigationData) => {
  // const restTitles = navigationData.navigation.getParam('title');
  // const restIndex = navigationData.navigation.getParam('restIndex');
  //console.log('rest  '+restIndex);
  return {
    headerTitle: "Restaurant",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 100,
    padding: 10,
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  circleTitle: {
    flex: 1,
    alignItems: "flex-start",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  scoreImage: {
    width: 100,
    height: 150,
  },
  text: {
    fontFamily: "rubik",
  },
  restTitle: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
    fontSize: 25,
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
    padding: 5,
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    //justifyContent: 'space-between',
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  bottomSpace: {
    marginBottom: 20,
  },
  tag: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    margin: 5,
  },
});
export default RestaurantDetailScreen;
