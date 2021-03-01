import React from "react";
import { Button, Alert, View } from "react-native";
import * as firebase from "firebase";
import RootNavigation from "../../config/RootNavigation";
import { Text } from "react-native";

import SettingCard from "../../components/settingCard";

export default class Settings extends React.Component {
  state={
    error: ""
  }
  constructor(props) {
    super(props);
  }
  render() {
    if (firebase.auth().currentUser) {
      return (
        <View>
          <SettingCard
            text="Sign Out"
            onSelect={() => {
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
          <SettingCard
            text="Delete Account"
            onSelect={() => {
              Alert.alert(
                "Are you sure?",
                "This is very dangerous! If you delete your account, you can no longer access it. You will no longer be able to access all your ratings, favorites, and comments!",
                [
                  {
                    text: "Cancel",
                    onPress: () =>
                      Alert.alert(
                        "phew, that was a close call",
                        "thanks for sticking with us :)"
                      ),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      var user = firebase.auth().currentUser;
                      user
                        .delete()
                        .then(function () {
                          Alert.alert(
                            "Successfully deleted account",
                            "We're sad to see you go. Come back later!"
                          );
                          this.props.navigation.goBack();
                          RootNavigation.navigate("Home");
                        })
                        .catch(error => {
                          this.setState({error: error.message})
                        });
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          />
          <Text style={{padding: 20, color: "red"}}>{this.state.error}</Text>
        </View>
      );
    } else {
      return <Text>Oops! You shouldn't be here....</Text>;
    }
  }
}
