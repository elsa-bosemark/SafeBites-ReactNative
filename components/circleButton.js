import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CircleButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.center,
        ...styles.circle,
        ...{ borderColor: props.color },
      }}
      onPress={props.onSelect}
    >
      <Ionicons name={props.icon} size={25} color={props.color} />
      <Text style={{ ...styles.title, ...{ fontSize: 11 } }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 100,
    padding: 10,
    borderWidth: 2,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
  },
});

export default CircleButton;
