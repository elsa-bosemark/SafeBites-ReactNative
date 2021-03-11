import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Colors from "../constants/Colors";
import ProfileImage from "../components/profileImage";
import { Ionicons } from "@expo/vector-icons";

const CommentCard = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.row,
          ...styles.spacer,
          ...{ justifyContent: "space-between", alignItems: "center" },
        }}
      >
        <View style={{ ...styles.row, ...{ alignItems: "center" } }}>
          {/* <ProfileImage size={1} imageUrl={{uri:'https://pitshanger-ltd.co.uk/images/colours/563-Clementine%201495.jpg'}}
              /> */}
          <Text style={styles.smallText}>{props.username}</Text>
        </View>

        <Text>
          {" "}
          {/* {props.date} */}
          {props.date.slice(0, props.date.length - 23)}
        </Text>
      </View>
      <Text style={styles.mediumText}>{props.text}</Text>
      {/* <View style={{ ...styles.row, ...styles.rateContainer }}>
        <View style={styles.row}>
          <Ionicons style={{ color: "#fff" }} name="thumbs-up" size="18" />
          <Text style={{ fontSize: 18, color: "#fff" }}>?</Text>
        </View>
        <View style={styles.row}>
          <Ionicons style={{ color: "#fff" }} name="thumbs-down" size="18" />
          <Text style={{ fontSize: 18, color: "#fff" }}>?</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  rateContainer: {
    width: "50%",
    marginTop: 20,
    backgroundColor: Colors.accentColor,
    color: "#fff",
    padding: 20,
    justifyContent: "space-around",
    borderRadius: 40,
    alignSelf: "flex-end",
  },
  smallText: {
    fontSize: 15,
    paddingLeft: 10,
  },
  mediumText: {
    fontSize: 18,
  },
  container: {
    borderRadius: 10,
    marginLeft: 10,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
  },
  spacer: {
    paddingBottom: 10,
  },
});

export default CommentCard;
