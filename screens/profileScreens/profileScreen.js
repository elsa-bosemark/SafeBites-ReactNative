import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View } from 'react-native';
import 'firebase/firestore'
import * as firebase from 'firebase';
const ProfileScreen = props => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]);
  const [calledOnce, setCalledOnce] = useState(false);

  async function getData() {
    var myDB = firebase.firestore();
    var doc = await myDB.collection("users").doc(`${firebase.auth().currentUser.email}`).get();
    if (doc.exists) {
      setName(doc.data().firstName + " " + doc.data().lastName);
    }
  }

  async function getComments() {
    var myArr = []
    const snapshot = await firebase.firestore().collection('users').doc(`${firebase.auth().currentUser.email}`).collection('comments').get()
    let docs = snapshot.docs.map(doc => doc.data());
    docs.forEach(element => {
      for (var key in element) {
        myArr.push(element[key])
      }
    })

    setComments(myArr);
  }
  if (!calledOnce) {
    getData();
    getComments();
    setCalledOnce(true)
  }
  return (
    <SafeAreaView>
      <Text style={styles.title}>{`hello, ${name}`}</Text>
      <Text style={styles.title}>Comments</Text>
      <View style={{
        width: "80%",
        borderRadius: 10,
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 0.2,
      }}>
        <FlatList
          data={comments}
          renderItem={({ item, index }) => {
            return (
              <Text style={{ paddingLeft: 10 }}>{item}</Text>
            )
          }
          }
          keyExtractor={item => item}
        />
      </View>
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