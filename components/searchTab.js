
import React from "react";
import { View, StyleSheet, TouchableHighlight,} from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

import Color from "../constants/Colors";

export default class SearchTab extends React.Component {
    render() {
        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                <View style={styles.button}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
                        <View>
                            <FontAwesome5 name="search" size={24} color="#FFF" />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 36,
        backgroundColor: Color.primaryColor,
        position: "absolute",
        marginTop: -40,
        borderWidth: 5,
        borderColor: "#FFFFFF"
    },
});