import React from "react";
import { View, StyleSheet, Text } from "react-native";

const OpenHours = (props) => {
  let hoursArray = [];
  const openhours = props.hours[0].forEach((value, index) => {
    let day;
    switch (props.hours[0].open[index].day) {
      case 0:
        return (day = "Mon");
        break;
      case 1:
        return (day = "Tue");
        break;
      case 2:
        return (day = "Wed");
        break;
      case 3:
        return (day = "Thu");
        break;
      case 4:
        return (day = "Fri");
        break;
      case 5:
        return (day = "Sat");
        break;
      case 6:
        return (day = "Sun");
        break;
      default:
        day = "Unknown";
    }

    hoursArray.push(
      <View>
        <Text>{day}</Text>
        <Text>
          {props.hours.open[index].start +
            " - " +
            props.hours.open[index].start}
        </Text>
      </View>
    );
  });
  return hoursArray;
};

const styles = StyleSheet.create({});

export default OpenHours;
