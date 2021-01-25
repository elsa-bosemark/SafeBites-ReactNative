import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, Image } from 'react-native';
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
      <View style={styles.container}>

        <View style={[styles.card, styles.row]}>
          {/* image placeholder */}
          <Image style={styles.profileImage} source={{ url: 'https://pitshanger-ltd.co.uk/images/colours/563-Clementine%201495.jpg', }} />
          <View>
            {/* username */}
            <Text style={styles.title}>{`hello, ${name}`}</Text>

            <View style={[styles.greyCard, styles.row]}>
              <View>
                <Text style={styles.infoText}>reviews</Text>
                <Text style={styles.num}>4</Text>
              </View >
              <View >
                <Text style={styles.infoText}>photos</Text>
                <Text style={styles.num}>1</Text>
              </View>
            </View>

          </View>

        </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontFamily: 'rubik',
    fontSize: 20,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  greyCard:{
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
  }
});
export default ProfileScreen;