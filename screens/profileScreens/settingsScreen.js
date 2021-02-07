import React from "react";
import { Button, Alert } from "react-native";
import * as firebase from "firebase";
import RootNavigation from "../../config/RootNavigation";
import { Text } from "react-native";

import SettingCard from "../../components/settingCard"

export default class Settings extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      return (
        <View>
          <SettingCard text="Sign Out" onSelect={() => {
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
          }}/>
        </View>
      );
    } else {
      return <Text>Oops! You shouldn't be here....</Text>;
    }
  }
}



//   <Button
//   title="Logout"
//   onPress={() => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         Alert.alert("Successfully logged out", "See you later!");
//         this.props.navigation.goBack();
//         RootNavigation.navigate("Home");
//       })
//       .catch((error) => {
//         // An error happened.
//         console.error(error);
//         Alert.alert("ERROR SIGNING OUT", error);
//       });
//   }}
// />

