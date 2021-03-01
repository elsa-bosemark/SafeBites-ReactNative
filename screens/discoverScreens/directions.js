import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";

import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
import {
  getUserLocation,
  getRestaurantCoords,
  getNames,
} from "../../config/data";

export default class RnDirectionsApp extends Component {
  index = this.props.navigation.getParam("index");

  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      userLoc: undefined,
      restauarntLoc: undefined,
    };
  }
  //HYPOTHETICALLY< THIS WORKS BUT YOU HAVE TO PROVIDE A CREDIT CARD EVEN THOUGH IT DOESN"T COST MONEY.
  async componentDidMount() {
    let userLoc = await getUserLocation();
    this.setState({ userLoc: userLoc });
    let restaurantName = await getNames();
    console.error(this.state.userLoc);
    let restauarntLoc = await getRestaurantCoords();
    this.getDirections(
      `${userLoc[0]}, ${userLoc[1]}`,
      `${restauarntLoc[this.index].latitude},${
        restauarntLoc[this.index].longitude
      }`
    );
    this.setState({
      restauarntLoc: {
        latitude: restauarntLoc[this.index].latitude,
        longitude: restauarntLoc[this.index].longitude,
        title: restaurantName[this.index],
        subtitle: "let's go here",
      },
    });
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyCi0HQ1zcQmm8ZeKqFSNKkxq0yfWOt6nC8`
      );
      let respJson = await resp.json();
      console.error(respJson);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState({ coords: coords });
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  render() {
    console.warn(this.state.userLoc + " user lo");
    return (
      <View>
        <MapView
          style={styles.map}
          loadingEnabled={this.state.userLoc == undefined}
          region={{
            latitude:
              this.state.userLoc != undefined ? this.state.userLoc[0] : 37.9,
            longitude:
              this.state.userLoc != undefined ? this.state.userLoc[1] : -122,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          annotations={this.state.restauarntLoc}
          showsUserLocation={true}
        >
          <MapView.Marker
            id={
              this.state.restauarntLoc != undefined
                ? this.state.restauarntLoc.title
                : "TITLE"
            }
            coordinate={
              this.state.restauarntLoc != undefined
                ? {
                    latitude: this.state.restauarntLoc.latitude,
                    longitude: this.state.restauarntLoc.longitude,
                  }
                : { latitude: 37.9, longitude: -122 }
            }
            title={
              this.state.restauarntLoc != undefined
                ? this.state.restauarntLoc.title
                : " TITLE"
            }
            subtitle={
              this.state.restauarntLoc != undefined
                ? this.state.restauarntLoc.subtitle
                : "subtitle"
            }
          ></MapView.Marker>

          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

AppRegistry.registerComponent("RnDirectionsApp", () => RnDirectionsApp);
