import React from "react";
import { Button, Alert } from "react-native";
import * as firebase from "firebase";
import RootNavigation from "../../config/RootNavigation";
import { Text } from "react-native";

export default class Settings extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <Button
          title="Logout"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                Alert.alert("Successfully logged out", "See you later!");
                this.props.navigation.goBack();
                RootNavigation.navigate("Home");
              })
              .catch((error) => {
                // An error happened.
                console.error(error);
                Alert.alert("ERROR SIGNING OUT", error);
              });
          }}
        />
      );
    } else {
      return <Text>Oops! You shouldn't be here....</Text>;
    }
  }
}
