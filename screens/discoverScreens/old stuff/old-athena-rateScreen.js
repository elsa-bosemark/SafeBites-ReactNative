import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { colors } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RateSlider } from '../../components/slider';
import Colors from '../../constants/Colors';
import Divider from '../../components/divider';
import * as firebase from 'firebase';
import { Slider } from 'react-native-elements';
import { getCurrentRestaurant } from '../../config/data';
import 'firebase/firestore';

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
    })
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
      var n = new Date();
      myDB.collection("reviews").doc(currentRestaurant).collection("comments").doc(myEmail).set({
        [n]: comment
      })
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
      var n = new Date();
      myDB.collection("reviews").doc(currentRestaurant).collection("comments").doc(myEmail).update({
        [n]: comment
      })
    }
  }
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Covid Prevention Methods</Text>
          <Text style={{ ...styles.title, fontSize: 18, alignSelf: 'center' }}>There is enforcement and use of masks</Text>
          <View style={{
            width: screen.width, justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={styles.slider}>
              <Slider
                value={mask}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                disabled={false}
                minimumTrackTintColor={Colors.grey}
                maximumTrackTintColor='#E0E0E0'
                maximumValue={100}
                onValueChange={handleValueChanged}
                step={5}
                style={{ width: screen.width * 0.5, }}
              />
              <Text style={{
                alignItems: 'flex-start',
                paddingTop: 5,
                marginLeft: 5,
                fontSize: 20,
                width: 51
              }}>{mask}%</Text>
            </View>

          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Disagree</Text>
            <Text style={styles.otherText}>Agree</Text>
          </View>
          <View style={styles.break} />
          <Text style={{ ...styles.title, fontSize: 18, alignSelf: 'center' }}>Hand sanitizers are available</Text>
          <View style={{
            width: screen.width, justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={styles.slider}>
              <Slider
                value={handSan}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                disabled={false}
                minimumTrackTintColor={Colors.grey}
                maximumTrackTintColor='#E0E0E0'
                maximumValue={100}
                onValueChange={sanValChanged}
                step={5}
                style={{ width: screen.width * 0.5, }}
              />
              <Text style={{
                alignItems: 'flex-start',
                paddingTop: 5,
                marginLeft: 5,
                fontSize: 20,
                width: 51
              }}>{handSan}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Disagree</Text>
              <Text style={styles.otherText}>Agree</Text>
            </View>
            <View style={styles.break} />
            <Text style={{ ...styles.title, fontSize: 18, alignSelf: 'center' }}>There are shields and/or physical barriers</Text>
            <View style={{
              width: screen.width, justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={styles.slider}>
                <Slider
                  value={shields}
                  thumbStyle={styles.sliderThumb}
                  trackStyle={styles.sliderTrack}
                  disabled={false}
                  minimumTrackTintColor={Colors.grey}
                  maximumTrackTintColor='#E0E0E0'
                  maximumValue={100}
                  onValueChange={shieldValChanged}
                  step={5}
                  style={{ width: screen.width * 0.5, }}
                />
                <Text style={{
                  alignItems: 'flex-start',
                  paddingTop: 5,
                  marginLeft: 5,
                  fontSize: 20,
                  width: 51
                }}>{shields}%</Text>
              </View>

            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Disagree</Text>
              <Text style={styles.otherText}>Agree</Text>
            </View>
            <View style={styles.break} />
            <View style={styles.row}>
              <Text style={styles.rulesText}>Surfaces are sanitized after each patron</Text>
              <TouchableOpacity onPress={() => {
                changeYes(!yes);
                changeNo(false);
                changeIDK(false);
              }}>
                <View style={styles.button}>
                  <View style={yes ? styles.smallButton : styles.noButton} />
                </View>
                <Text>yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                changeYes(false);
                changeNo(!no);
                changeIDK(false);
              }}>
                <View style={styles.button}>
                  <View style={no ? styles.smallButton : styles.noButton} />
                </View>
                <Text> no</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                changeYes(false);
                changeNo(false);
                changeIDK(!idk);
              }} >
                <View style={styles.button}>
                  <View style={idk ? styles.smallButton : styles.noButton} />
                </View>
                <Text> idk</Text>
              </TouchableOpacity>
            </View >

          </View>
          <View style={styles.break, { height: 20 }} />
          <View style={styles.row}>
            <Text style={styles.rulesText}>Staff give tempature checks to customers</Text>
            <TouchableOpacity onPress={() => {
              changeTempYes(!tempYes);
              changeTempNo(false);
              changeTempIDK(false);
            }}>
              <View style={styles.button}>
                <View style={tempYes ? styles.smallButton : styles.noButton} />
              </View>
              <Text>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeTempYes(false);
              changeTempNo(!tempNo);
              changeTempIDK(false);
            }}>
              <View style={styles.button}>
                <View style={tempNo ? styles.smallButton : styles.noButton} />
              </View>
              <Text> no</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeTempYes(false);
              changeTempNo(false);
              changeTempIDK(!tempIDK);
            }} >
              <View style={styles.button}>
                <View style={tempIDK ? styles.smallButton : styles.noButton} />
              </View>
              <Text> idk</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.break, { height: 20 }} />
          <View style={styles.row}>
            <Text style={styles.rulesText}>Signage promoting safety is visible</Text>
            <TouchableOpacity onPress={() => {
              changeSignYes(!signYes);
              changeSignNo(false);
              changeSignIDK(false);
            }}>
              <View style={styles.button}>
                <View style={signYes ? styles.smallButton : styles.noButton} />
              </View>
              <Text>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeSignYes(false);
              changeSignNo(!signNo);
              changeSignIDK(false);
            }}>
              <View style={styles.button}>
                <View style={signNo ? styles.smallButton : styles.noButton} />
              </View>
              <Text> no</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              changeSignYes(false);
              changeSignNo(false);
              changeSignIDK(!signIDK);
            }} >
              <View style={styles.button}>
                <View style={signIDK ? styles.smallButton : styles.noButton} />
              </View>
              <Text> idk</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.break} />
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
          <View style={{ ...styles.break, height: 20 }} />

          <Text style={{
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10,
            fontSize: 15,
          }}>Did you feel safe in the restaurant?</Text>



          <View style={{
            width: screen.width,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={styles.slider}>
              <Slider
                value={safety}
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
                disabled={false}
                minimumTrackTintColor={Colors.grey}
                maximumTrackTintColor='#E0E0E0'
                maximumValue={10}
                onValueChange={safetyValChanged}
                step={1}
                style={{ flex: 3 }}
              />
              <Text style={{
                alignItems: 'flex-start',
                paddingTop: 5,
                marginLeft: 5,
                fontSize: 20,
                flex: 1,
              }}>{safety}%</Text>
            </View>

          </View>
          <View style={{ ...styles.row, }}>
            <Text style={styles.text}>No</Text>
            <Text style={styles.otherText}>Yes</Text>
          </View>
          <View style={styles.break} />
          <View style={styles.break} />

        </View>
        <Divider />
        <View style={styles.card}>
          <Text style={styles.title}>Comments</Text>
          <View style={{
            margin: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            height: 130
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
        <Button title="submit" onPress={() => {
          //store in firebase 
          setData();
          props.navigation.goBack(); //go back
        }} />
        {/* spacing for keyboard */}
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
        <View style={styles.break} />
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
  text: {
    marginTop: -5,
    marginLeft: 50,
    fontFamily: 'rubik'
  },
  otherText: {
    marginTop: -5,
    marginLeft: screen.width * 0.5 / 1.5,
    fontFamily: 'rubik'
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
  button: {
    backgroundColor: Colors.grey,
    borderRadius: 100,
    height: 25,
    aspectRatio: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    backgroundColor: Colors.darkColor,
    borderRadius: 100,
    height: 15,
    aspectRatio: 1,
  },
  noButton: {

  },
  rulesText: {
    marginLeft: 30,
    flex: 1,
    fontSize: 20,
    fontFamily: 'rubik'
  },
  tag: {
    padding: 10,
    backgroundColor: Colors.grey,
    borderRadius: 5,
    margin: 5,
    height: 40,
  },
  yesTag: {
    padding: 10,
    backgroundColor: Colors.darkColor,
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