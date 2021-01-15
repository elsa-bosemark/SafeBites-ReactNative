import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import 'firebase/firestore'
import * as firebase from 'firebase';
const ProfileScreen = props => {
  const [name, setName] = useState("");
  async function getData() {
    var myDB = firebase.firestore();
    console.warn(firebase.auth().currentUser.email);
    var doc = await myDB.collection("users").doc(`${firebase.auth().currentUser.email}`).get();
    if (doc.exists) {
      setName(doc.data().firstName + " " + doc.data().lastName);
      console.warn(doc.data().firstName + " " + doc.data().lastName)
    }
  }
  getData();
  return (
    <SafeAreaView>

      <Text style={styles.title}>{`hello, ${name}`}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'rubik',
    fontSize: 20,
    padding: 20,
  },
});
export default ProfileScreen;