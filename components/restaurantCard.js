import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getDistance } from "geolib";

import CatIcon from "./catIcon";
import Colors from "../constants/Colors";
import SafetyScore from "../components/handSanatizer";
import * as firebase from "firebase";
import "firebase/firestore";
import PriceTag from '../components/priceTag';

const RestaurantCard = (props) => {
  const [favorite, setFavorite] = useState("heart-outline");
  const [fav, setFav] = useState([]);
  const [calledOnce, setCalledOnce] = useState(false);
  //if on andoid and has ripple effect then use that (looks better)
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  async function getFavorites() {
    if (
      firebase.auth().currentUser != null &&
      firebase.auth().currentUser != undefined
    ) {
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
      setFav(myArr);

      if (myArr.includes(props.title)) {
        setFavorite("heart");
      }
    }
  }

  var restaurantDistance;

  if (
    props.userCoordinates != null &&
    props.userCoordinates != undefined &&
    props.restaurantCoordinates != null &&
    props.restaurantCoordinates != undefined
  ) {
    restaurantDistance = getDistance(
      props.userCoordinates,
      props.restaurantCoordinates
    );
  }
  if (!calledOnce) {
    getFavorites();
    setCalledOnce(true);
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={styles.container}>
          <View style={styles.row}>
            {/* Image */}
            <Image style={styles.image} source={{ uri: props.cover }} />

            {/* Info */}
            <View style={{ flex: 1 }}>
            <View
                style={{ ...styles.row, ...{ flex: 1, alignItems: "center" } }}

              >
                <PriceTag price={props.price}/>
                {/* <View style={styles.tag}>
                  <Text
                    style={[styles.text, styles.mediumText, styles.whiteText]}
                  >
                    {props.price}
                  </Text>
                </View> */}
                <View style={{ ...styles.row, ...{ alignItems: "center" } }}>
                  <Ionicons
                    style={styles.icon}
                    name="md-location-sharp"
                    size={25}
                    color={Colors.accentColor}
                  />
                  <Text style={[styles.text, styles.mediumText]}>
                    {Number((restaurantDistance / 1000).toFixed(1))} km
                  </Text>
                </View>
              </View>


              <CatIcon
                style={{ alignItem: "flex-end"}}
                cat={props.transactions}
              />
              
            </View>

            {/* Hand Sanatizer */}
            <SafetyScore score={props.safetyScore ? props.safetyScore : "?"} size={1} />
          </View>

          <View style={styles.row}>
            {/* Heart =>Favorites */}
            <TouchableOpacity
              onPress={() => {
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
                        .doc(props.title)
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
                        .doc(props.title)
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
            >
              <Ionicons
                style={{
                  ...styles.icon,
                  ...{ paddingTop: 10, paddingRight: 10 },
                }}
                name={favorite}
                size={25}
                color={favorite === "heart" ? "#c90404" : Colors.grey}
              />
            </TouchableOpacity>
            {/* Title */}
            <Text style={[styles.text, styles.title]}>{props.title}</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontFamily: "rubik",
  },
  title: {
    alignItems: "flex-start",
    paddingTop: 10,
    fontSize: 20,
  },
  image: {
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
  },
  smallText: {
    fontSize: 15,
  },
  mediumText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 18,
  },
  tag: {
    padding: 10,
    backgroundColor: Colors.accentColor,
    borderRadius: 5,
    height: 40,
  },
  whiteText: {
    color: "white",
  },
  icon: {
    paddingBottom: 5,
  },
});

export default RestaurantCard;
