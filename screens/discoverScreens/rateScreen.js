import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { colors } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import 'firebase/firestore';


import RateSlider from '../../components/rateSlider';
import CircleRate from '../../components/circleRate';
import Spacer from '../../components/spacer';
import { getCurrentRestaurant } from '../../config/data';
import Colors from '../../constants/Colors';
import Divider from '../../components/divider';
import DefaultButton from '../../components/defaultButton';

const screen = Dimensions.get('window');
const RateScreen = props => {
  //STATES
  const [yes, changeYes] = useState(false);
  const [idk, changeIDK] = useState(false);
  const [no, changeNo] = useState(false);
  const [tempYes, changeTempYes] = useState(false);
  const [tempIDK, changeTempIDK] = useState(false);
  const [tempNo, changeTempNo] = useState(false);
  const [signYes, changeSignYes] = useState(false);
  const [signIDK, changeSignIDK] = useState(false);
  const [signNo, changeSignNo] = useState(false);
  const [deliveryApps, changeDA] = useState(false);
  const [laminatedMenus, changeLM] = useState(false);
  const [QR, changeQR] = useState(false);
  const [paperMenus, changePM] = useState(false);
  const [delivery, changeDelivery] = useState(false);
  const [takeout, changeTakeout] = useState(false);
  const [outdoorDining, changeOD] = useState(false);
  const [indoorDining, changeID] = useState(false);
  const [curbsidePickup, changeCP] = useState(false);
  const [comment, changeComment] = useState("");
  const [mask, setMasks] = useState(0);
  const [handSan, setHandSan] = useState(0);
  const [shields, setShields] = useState(0);
  const [safety, setSafety] = useState(0);
  function handleValueChanged(score) {
    setMasks(Math.round(score))
  }
  function sanValChanged(score) {
    setHandSan(Math.round(score));
  }
  function shieldValChanged(score) {
    setShields(Math.round(score));
  }
  function safetyValChanged(score) {
    setSafety(Math.round(score) * 10)
  }
  const setData = async () => {
    let currentRestaurant = getCurrentRestaurant();
    let myDB = firebase.firestore();
    let myEmail = firebase.auth().currentUser.email;

    myDB.collection("users").doc(myEmail).collection("reviews").doc(currentRestaurant).set({
      masks: mask,
      handSanitizer: handSan,
      shields: shields,
      //crazy ternary operators:
      sanitizeSurfaces: yes ? "yes" : no ? "no" : idk ? "idk" : "idk",
      tempChecks: tempYes ? "yes" : tempNo ? "no" : tempIDK ? "idk" : "idk",
      safetySigns: signYes ? "yes" : signNo ? "no" : signIDK ? "idk" : "idk",
      order: deliveryApps ? "deliveryApps" : laminatedMenus ? "laminatedMenus" : QR ? "QR" : paperMenus ? "paperMenus" : "idk",
      method: delivery ? "delivery" : takeout ? "takeout" : outdoorDining ? "outdoorDining" : indoorDining ? "indoorDining" : curbsidePickup ? "curbsidePickup" : "idk",
      safety: safety / 10,
      // comments: comment
    }, { merge: true })
    if (comment != "") {
      let myDoc = await myDB.collection("users").doc(myEmail).collection("comments").doc(currentRestaurant).get();
      if (!myDoc.exists) {
        myDB.collection('users').doc(myEmail).collection('comments').doc(currentRestaurant).set({
          [new Date()]: comment
        })
      }
      else {
        var n = new Date();

        myDB.collection('users').doc(myEmail).collection('comments').doc(currentRestaurant).update({
          [n]: comment
        })
      }
    }
    let doc = await myDB.collection("reviews").doc(currentRestaurant).get();
    if (!doc.exists) {
      myDB.collection("reviews").doc(currentRestaurant).set({
        masks: mask,
        handSanitizer: handSan,
        shields: shields,
        //crazy ternary operators:
        sanitizeSurfaces: yes ? "yes" : no ? "no" : idk ? "idk" : "idk",
        tempChecks: tempYes ? "yes" : tempNo ? "no" : tempIDK ? "idk" : "idk",
        safetySigns: signYes ? "yes" : signNo ? "no" : signIDK ? "idk" : "idk",
        order: deliveryApps ? "deliveryApps" : laminatedMenus ? "laminatedMenus" : QR ? "QR" : paperMenus ? "paperMenus" : "idk",
        method: delivery ? "delivery" : takeout ? "takeout" : outdoorDining ? "outdoorDining" : indoorDining ? "indoorDining" : curbsidePickup ? "curbsidePickup" : "idk",
        safety: safety / 10,
        usersRated: 1,
      })
      if (comment != "") {
        var n = new Date();
        myDB.collection("reviews").doc(currentRestaurant).collection("comments").doc(myEmail).set({
          [n]: comment
        })
      }
    }
    else {
      let usersRated = doc.data().usersRated
      myDB.collection("reviews").doc(currentRestaurant).set({
        masks: doc.data().masks + mask,
        handSanitizer: doc.data().handSanitizer + handSan,
        shields: doc.data().shields + shields,
        //THE PROBLEM: the strings below completely overwrite the ones set in the db
        //idk how to make an average of them
        sanitizeSurfaces: yes ? "yes" : no ? "no" : idk ? "idk" : "idk",
        tempChecks: tempYes ? "yes" : tempNo ? "no" : tempIDK ? "idk" : "idk",
        safetySigns: signYes ? "yes" : signNo ? "no" : signIDK ? "idk" : "idk",
        order: deliveryApps ? "deliveryApps" : laminatedMenus ? "laminatedMenus" : QR ? "QR" : paperMenus ? "paperMenus" : "idk",
        method: delivery ? "delivery" : takeout ? "takeout" : outdoorDining ? "outdoorDining" : indoorDining ? "indoorDining" : curbsidePickup ? "curbsidePickup" : "idk",

        safety: doc.data().safety + (safety / 10),
        usersRated: usersRated += 1,
      })
      if (comment != "") {
        var n = new Date();
        myDB.collection("reviews").doc(currentRestaurant).collection("comments").doc(myEmail).update({
          [n]: comment
        })
      }
    }
  }
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Covid Prevention Methods</Text>

          <RateSlider value={mask} onValueChange={handleValueChanged} text="There is enforcement and use of masks" maxVal={100} step={5} />
          <RateSlider value={handSan} onValueChange={sanValChanged} text="Hand sanitizers are available" maxVal={100} step={5} />
          <RateSlider value={shields} onValueChange={shieldValChanged} text="There are shields and/or physical barriers" maxVal={100} step={5} />
          <Spacer height={20} />
          <CircleRate
            text="Surfaces are sanitized after each patron"
            yesSelect={() => {
              changeYes(!yes);
              changeNo(false);
              changeIDK(false);
            }}
            noSelect={() => {
              changeYes(false);
              changeNo(!no);
              changeIDK(false);
            }}
            idkSelect={() => {
              changeYes(false);
              changeNo(false);
              changeIDK(!idk);
            }}
            yes={yes}
            no={no}
            idk={idk}
          />

          <CircleRate
            text="Staff give tempature checks to customers"
            yesSelect={() => {
              changeTempYes(!tempYes);
              changeTempNo(false);
              changeTempIDK(false);
            }}
            noSelect={() => {
              changeTempYes(false);
              changeTempNo(!tempNo);
              changeTempIDK(false);
            }}
            idkSelect={() => {
              changeTempYes(false);
              changeTempNo(false);
              changeTempIDK(!tempIDK);
            }}
            yes={tempYes}
            no={tempNo}
            idk={tempIDK}
          />

          <CircleRate
            text="Signage promoting safety is visible"
            yesSelect={() => {
              changeSignYes(!signYes);
              changeSignNo(false);
              changeSignIDK(false);
            }}
            noSelect={() => {
              changeSignYes(false);
              changeSignNo(!signNo);
              changeSignIDK(false);
            }}
            idkSelect={() => {
              changeTempYes(false);
              changeTempNo(false);
              changeTempIDK(!signIDK);
            }}
            yes={signYes}
            no={signNo}
            idk={signIDK}
          />
          <Spacer height={20} />
        </View>

        <Divider />

        <View style={{ ...styles.card, flex: 1, flexShrink: 1, }}>
          <Text style={styles.title}>Customer Experience</Text>
          <Text style={styles.rulesText}>How did you order?</Text>
          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignContent: "flex-start",
            justifyContent: "flex-start",
            width: screen.width * 0.9,
            alignSelf: 'center',
          }}>
            <TouchableOpacity onPress={() => {
              changeDA(!deliveryApps)
              changeLM(false)
              changeQR(false)
              changePM(false)
            }}>
              <View style={deliveryApps ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Delivery Apps</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDA(false)
              changeLM(!laminatedMenus)
              changeQR(false)
              changePM(false)
            }}>
              <View style={laminatedMenus ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Laminated Menus</Text>
              </View></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDA(false)
              changeLM(false)
              changeQR(!QR)
              changePM(false)
            }}>
              <View style={QR ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>QR Code</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDA(false)
              changeLM(false)
              changeQR(false)
              changePM(!paperMenus)
            }}>
              <View style={paperMenus ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Single Use Paper Menus</Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style={{ ...styles.break, height: 20 }} />

          <Text style={styles.rulesText}>How did you get the food?</Text>
          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignContent: "flex-start",
            justifyContent: "flex-start",
            width: screen.width * 0.9,
            alignSelf: 'center',
          }}>
            <TouchableOpacity onPress={() => {
              changeDelivery(!delivery)
              changeTakeout(false)
              changeOD(false)
              changeID(false)
              changeCP(false)
            }}>
              <View style={delivery ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Delivery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDelivery(false)
              changeTakeout(!takeout)
              changeOD(false)
              changeID(false)
              changeCP(false)
            }}>
              <View style={takeout ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Takeout</Text>
              </View></TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDelivery(false)
              changeTakeout(false)
              changeOD(!outdoorDining)
              changeID(false)
              changeCP(false)
            }}>
              <View style={outdoorDining ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Outdoor Dining</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDelivery(false)
              changeTakeout(false)
              changeOD(false)
              changeID(!indoorDining)
              changeCP(false)
            }}>
              <View style={indoorDining ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, ...{ fontSize: 15, color: 'white' } }}>Indoor Dining</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeDelivery(false)
              changeTakeout(false)
              changeOD(false)
              changeID(false)
              changeCP(!curbsidePickup)
            }}>
              <View style={curbsidePickup ? styles.yesTag : styles.tag}>
                <Text style={{ ...styles.tagText, fontSize: 15, color: 'white' }}>Curbside Pickup</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Spacer height={20} />
          <RateSlider value={safety} onValueChange={safetyValChanged} text="Did you feel safe in the restaurant?" maxVal={10} step={1} />
          <Spacer height={20} />

        </View>
        <Divider />
        <View style={styles.card}>
          <Text style={styles.title}>Comment</Text>
          <View style={{
            margin: 20,
            borderRadius: 10,
            backgroundColor: Colors.grey,
            height: 200
          }}>
            <TextInput style={styles.comment}
              underlineColorAndroid="transparent"
              placeholder="Enter comment here"
              placeholderTextColor="grey"
              autoCapitalize="none"
              multiline={true}
              style={{ marginRight: 10, marginLeft: 10 }}
              onChangeText={(comment) => {
                changeComment(comment);
                //to be done
              }} />
          </View>
        </View>
        <Spacer height={20} />
        <DefaultButton text="Submit" buttonColor={Colors.primaryColor} textColor="#fff" onSelect={() => {
          //store in firebase 
          setData();
          props.navigation.goBack(); //go back
        }} />
      </View >
    </ScrollView>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  break: {
    height: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
    flex: 1,
    padding: 5,
    fontSize: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  rulesText: {
    marginLeft: 30,
    flex: 1,
    fontSize: 20,
    fontFamily: 'rubik'
  },
  tag: {
    padding: 10,
    backgroundColor: Colors.darkGrey,
    borderRadius: 5,
    margin: 5,
    height: 40,
  },
  yesTag: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    margin: 5,
    height: 40,
  },
  tagText: {
    fontFamily: 'rubik',
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  sliderThumb: {
    height: 30,
    width: 30,
    backgroundColor: Colors.darkColor,
  },
  sliderTrack: {
    height: 20,
    borderRadius: 20,
  },

});
export default RateScreen;