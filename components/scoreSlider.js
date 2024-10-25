import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Slider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
const screen = Dimensions.get("window");

export const ScoreSlider = (props) => {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>{props.safetyTitle}</Text>
      <View style={{ ...styles.row, ...{ width: "100%" } }}>
        <View style={styles.scoreSlider}>
          <Slider
            value={isNaN(props.score) ? 0 : props.score}
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
            disabled={true}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor={Colors.grey}
            maximumValue={100}
          />
        </View>
        <Text style={{ ...styles.title, ...{ paddingLeft: 10 } }}>
          {`${props.score}`}%
        </Text>

      </View>
      <View style={{...styles.row,...{justifyContent:"flex-start",marginRight:10}}}>
        {/* <Ionicons name="person" size={20} color="grey" /> */}
        <Text>{`${props.reviewCount}`}</Text>
        <Text style={{ fontSize: 12 }}>  reviews</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   marginRight:10,
   marginLeft:10
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  sliderThumb: {
    height: 0,
    width: 0,
  },
  sliderTrack: {
    height: 20,
    borderRadius: 20,
  },
  slider: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreSlider: {
   width:'90%'
  },
  title: {
    fontSize: 15,
    fontFamily: "rubik",
    paddingTop: 10,
    paddingBottom: 0,
  },
  row: {
    flexDirection: "row",
  },
});
