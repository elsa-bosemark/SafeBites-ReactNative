import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CommentStack = (props) => {
  return (
    <View>
      <View style={{ backgroundColor: Colors.darkGrey, padding: 2 }} />
      <View style={styles.container}>
        <View style={{ ...styles.row, ...styles.spacer }}>
          <Text style={styles.smallText}>{props.username}</Text>
          <Text
            style={
              (styles.smallText,
              { textAlign: "right", marginLeft: 60, marginRight: 15 })
            }
          >
            {" "}
            {props.date}
          </Text>
        </View>
        <Text style={styles.mediumText}>{props.text}</Text>

        <View style={{ ...styles.row, ...styles.rateContainer }}>
          <View style={styles.row}>
            <Ionicons style={{ color: "#fff" }} name="thumbs-up" size="18" />
            <Text style={{ fontSize: 18, color: "#fff" }}> 10</Text>
          </View>
          <View style={styles.row}>
            <Ionicons style={{ color: "#fff" }} name="thumbs-down" size="18" />
            <Text style={{ fontSize: 18, color: "#fff" }}> 10</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rateContainer: {
    width: "50%",
    marginTop: 20,
    backgroundColor: Colors.accentColor,
    color: "#fff",
    padding: 5,
    justifyContent: "space-around",
    borderRadius: 40,
    alignSelf: "flex-end",
  },
  smallText: {
    fontSize: 15,
  },
  mediumText: {
    fontSize: 18,
  },
  container: {
    marginLeft: 10,
    padding: 20,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  spacer: {
    paddingBottom: 10,
  },
});

export default CommentStack;
