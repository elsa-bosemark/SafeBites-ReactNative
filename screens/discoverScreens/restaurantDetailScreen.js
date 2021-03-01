import React, { useState, useEffect } from "react";
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
  Button,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getDistance, convertDistance } from "geolib";
import { Ionicons } from "@expo/vector-icons";
import { getData, storeCurrentRestaurant } from "../../config/data";
import * as firebase from "firebase";
import "firebase/firestore";

import CatIcon from "../../components/catIcon";
import Colors from "../../constants/Colors";
import Divider from "../../components/divider";
import { ScoreSlider } from "../../components/scoreSlider";
import CircleButton from "../../components/circleButton";
import DefaultButton from "../../components/defaultButton";
import SafetyCard from "../../components/safetyCard";
import Title from "../../components/title";
import ServisRating from "../../components/servisRating";
import YelpServisRating from "../../components/yelpServisRating";
import Credit from "../../components/credit";
import { Tags } from "../../components/tags";
import OpenHours from "../../components/openHours";
import SafetyScore from "../../components/handSanatizer";
import { callNumber } from "../../config/Call";
import CommentStack from "../../components/commentStack";
import { getCalledOnce, setCalledOnce } from "../../config/updateData";
import { call } from "react-native-reanimated";
import PriceTag from "../../components/priceTag";

const RestaurantDetailScreen = (props) => {
  const [masks, setMasks] = useState(0);
  const [handSanitizer, setHandSanitizer] = useState(0);
  const [shields, setShields] = useState(0);
  const [sanitizeAfter, setSanitizeAfter] = useState("");
  const [tempChecks, setTempChecks] = useState("");
  const [signs, setSigns] = useState("");
  const [feelSafe, setFeelSafe] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsUsernames, setCommentsUsernames] = useState([]);
  const [dates, setDates] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [favorite, setFavorite] = useState("heart-outline");
  ("fav");
  const [callOnce, setCallOnce] = useState(0);
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
  const distance = getDistance(
    userCoordinates,
    restaurantCoordinates[restIndex]
  );
  const restaurantDistance = convertDistance(distance, "mi");
  //open link function
  const openLink = (url) =>
    Linking.openURL(url).catch(() => {
      Alert.alert("Sorry, something went wrong.", "Please try again later.");
    });

  async function getComments() {
    var myArr = [];
    var myOtherArr = [];
    var dateArr = [];
    var name;
    const snapshot = await firebase
      .firestore()
      .collection("reviews")
      .doc(restTitles[restIndex])
      .collection("comments")
      .get();

    //let docs = snapshot.docs.map((doc) => doc.data());
    //let docNames = snapshot.docs.map((doc) => doc.id);
    snapshot.docs.map(async (doc) => {
      let data = doc.data();
      for (var key in data) {
        myArr.push(data[key]);
        dateArr.push(key);
        let myDoc = await firebase
          .firestore()
          .collection("users")
          .doc(doc.id)
          .get();
        if (myDoc.exists) {
          name = myDoc.data().firstName + " " + myDoc.data().lastName;
        } else {
          //shouldn't get here, but just in case
          name = "anonymous";
        }
        myOtherArr.push(name);
      }
    });
    setComments(myArr);
    setCommentsUsernames(myOtherArr);
    setDates(dateArr);
  }

  let that = getCalledOnce();
  console.warn(that);
  if (!that) {
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
            {/* Transactions */}

            <View style={styles.row}>
              {/* Price and Distance */}
              <View>
                <View style={styles.row}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <PriceTag price={price[restIndex]} />
                  </View>
                  <View style={{ ...styles.row, ...{ alignItems: "center" } }}>
                    <Ionicons
                      style={styles.icon}
                      name="md-location-sharp"
                      size={25}
                      color={Colors.primaryColor}
                    />
                    <Text style={{ ...styles.text, ...{ fontSize: 17 } }}>
                      {Number(restaurantDistance.toFixed(2))} mi
                    </Text>
                  </View>
                </View>
                {/* Extra Info*/}
                {/* <OpenHours hours={openHours[restIndex]}/> */}
                <Text style={styles.title}>Max capacity: ???</Text>
              </View>

              <View>
                <CatIcon cat={transactions[restIndex]} />
              </View>
            </View>
            {/* Make tags into a diff comp being an array*/}
            <Text style={styles.title}>Open hours: ???</Text>
            <Text style={styles.title}>Tags:</Text>
            <View style={{ flexDirection: "row" }}>
              <Tags restTags={tags[restIndex]} />
            </View>
          </View>
          <Credit logo={require("../../assets/yelpStars/yelpLogo.png")} />
          <Divider />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <DefaultButton
              text="Rate"
              buttonColor={Colors.primaryColor}
              textColor="#fff"
              onSelect={() => {
                if (
                  firebase.auth().currentUser != null &&
                  firebase.auth().currentUser != undefined
                ) {
                  props.navigation.navigate("Rate");
                } else {
                  Alert.alert(
                    "Login",
                    "Sorry! To use features like rating restaurants, you have to login!"
                  );
                }
              }}
            />
          </View>

          <Divider />
          <View style={styles.card}>
            {/* Favorites, Call and Directions */}

            <View style={{ felx: 1 }}>
              <View
                style={{
                  ...styles.row,
                  ...{ alignItems: "center", justifyContent: "space-around" },
                }}
              >
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
                  color={Colors.primaryColor}
                  title="Call"
                  onSelect={() => {
                    // Linking.openURL(`tel://+14156068631`);
                    callNumber(phoneNumber[restIndex]);
                  }}
                />
                <CircleButton
                  icon="map"
                  color={Colors.primaryColor}
                  title="Direction"
                  onSelect={() => {
                    props.navigation.navigate("Directions", {
                      index: restIndex,
                    });
                  }}
                />
                <CircleButton
                  icon="attach"
                  color={Colors.primaryColor}
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

            <View
              style={{ ...styles.row, ...{ justifyContent: "space-around" } }}
            >
              <View>
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
              </View>
              {/* Rating Score*/}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <SafetyScore score={feelSafe} size={1.4} />
              </View>
            </View>

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
          </View>

          <Divider />

          {/* Comments */}
          {/* Only show 2 comments */}
          <View style={styles.card}>
            <Title text="Comments" />
            <FlatList
              data={comments.length > 0 ? comments : "no way"}
              renderItem={({ item, index }) => {
                if (comments.length > 1) {
                  if (index <= 2) {
                    return (
                      <CommentStack
                        text={item}
                        date={dates[index]}
                        username={commentsUsernames[index]}
                      />
                    );
                  }
                } else {
                  if (index == 0) {
                    return <Text>No comments yet!</Text>;
                  } else {
                    return null;
                  }
                }
              }}
              keyExtractor={(item) => item}
            />
            <View style={{ backgroundColor: Colors.darkGrey, padding: 2 }} />
            <View style={{ alignSelf: "flex-end" }}>
              <Button
                color="#000"
                title="All comments..."
                onPress={() => {
                  console.warn(comments);
                  props.navigation.navigate("Comments", {
                    text: comments,
                    date: dates,
                    username: commentsUsernames,
                  });
                }}
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
            {/* <ServisRating text="Google" rating={3} reviewCount={100} /> */}
          </View>

          {/* <Divider />
          <View style={styles.card}>
            <Title text="Order or Reserve Now" />
          </View> */}
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
    fontSize: 18,
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
});
export default RestaurantDetailScreen;
