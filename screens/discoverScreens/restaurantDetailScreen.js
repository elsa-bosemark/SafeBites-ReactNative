import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, TouchableNativeFeedback } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getDistance } from 'geolib';
import { Ionicons } from '@expo/vector-icons';


import CatIcon from '../../components/catIcon';
import Colors from '../../constants/Colors';
import Divider from '../../components/divider';
import ScoreSlider from '../../components/slider';
import CircleButton from '../../components/circleButton';
import DefaultButton from '../../components/defaultButton';
import SafetyCard from '../../components/safetyCard';
import Title from '../../components/title';
import ServisRating from '../../components/servisRating';

const RestaurantDetailScreen = props => {

  const restIndex = props.navigation.getParam('restIndex');
  const restTitles = props.navigation.getParam('title');
  const transactions = props.navigation.getParam('transactions');
  const price = props.navigation.getParam('price');
  const cover = props.navigation.getParam('cover');
  const restaurantCoordinates = props.navigation.getParam('restaurantCoordinates');
  const userCoordinates = props.navigation.getParam('userCoordinates');
  const phoneNumber = props.navigation.getParam('phoneNumber');
  const address = props.navigation.getParam('address');
  const yelpUrl = props.navigation.getParam('yelpUrl');

  //Calculate the distance of rest
  const restaurantDistance = getDistance(
    userCoordinates,
    restaurantCoordinates[restIndex]
  );

  return (
    <SafeAreaView>
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Cover */}
            <Image style={styles.image} source={{ uri: cover[restIndex] }} />
            {/* Restaurant Title */}
            <Title text={restTitles[restIndex]} />
            <View style={[styles.row]}>
              {/* Transactions */}
              <View>
                <CatIcon cat={transactions[restIndex]} />
                {/* Price and Distance */}
                <View style={styles.row}>
                  <View style={styles.tag}>
                    <Text style={{ ...styles.text, ...{ fontSize: 19, color: 'white' } }}>{price[restIndex]}</Text>
                  </View>
                  <View style={{ ...styles.row, ...{ alignItems: 'center', } }}>
                    <Ionicons name='md-location-sharp' size={35} color={Colors.primaryColor} />
                    <Text style={{ ...styles.text, ...{ fontSize: 20 } }}>{Number((restaurantDistance / 1000).toFixed(1))} km</Text>
                  </View>
                </View>
                {/* Extra Info*/}
                <Text style={styles.title}>Max capacity: ???</Text>
                <Text style={styles.title}>Open hours: ???</Text>
              </View>
              {/* Rating Score*/}
              <View >
                <Image style={styles.scoreImage} source={require('../../assets/icon.png')} />
              </View>
            </View>
            {/* Make tags into a diff comp being an array*/}
            <Text style={styles.title}>Tags</Text>
            <View style={styles.tag}>
              <Text style={{ ...styles.text, ...{ fontSize: 19, color: 'white' } }}>Tags</Text>
            </View>
            {/* Favorites, Call and Directions */}
            <View style={{ ...styles.row, ...{ paddingTop: 20, paddingBottom: 10 } }}>
              <CircleButton icon='heart' color='#E0E0E0' title='Favorite' />
              <CircleButton icon='call' color={Colors.primaryColor} title='Call' />
              <CircleButton icon='map' color={Colors.primaryColor} title='Direction' />
              <CircleButton icon='attach' color={Colors.primaryColor} title='Website' />
            </View>
          </View>

          <Divider />

          {/* Rate */}
          <DefaultButton text='Rate' buttonColor={Colors.primaryColor} textColor='white' />

          
          <Divider />

          {/* Slider Rating */}
          <View style={styles.card}>
            <Title text='Covid Prevention Rating' />
            {/* Sliders */}
            <ScoreSlider safetyTitle='Enforcement and use of masks by customers and staff ' score={20} />
            <ScoreSlider safetyTitle='Enforcement of Social Distancing ' score={90} />
            <ScoreSlider safetyTitle='Sheilds/physical barriers' score={80} />
            {/* Yes or no Info  OPTIONS: yes, no, or idk*/}
            <SafetyCard text='Staff wear gloves' result='yes' />
            <SafetyCard text='Contactless payment' result='no' />
            {/* <SafetyCard text='' result=''/> */}
          </View>

          <Divider />

          {/* More safety Rating */}
          <View style={styles.card}>
            <Title text='In Person Safety Mesures' />
            <SafetyCard text='Surfaces are sanitized after each patron' result='idk' />
            <SafetyCard text='Tempature check of customers' result='yes' />
            <SafetyCard text='Hand sanatizer provided' result='no' />
            <SafetyCard text='Utensils deliverd in a bag' result='yes' />
          </View>
          
          <Divider />

          {/* Comments */}
          <View style={styles.card}>
            <Title text='Comments' />
          </View>

          <Divider />

          {/* Servis Review */}
          <View style={styles.card}>
            <Title text='Food and Servis Review' />
            <ServisRating text='Yelp' rating={4.5}/>
            <ServisRating text='Google' rating={3}/>
          </View>

          <Divider />
          <View style={styles.card}>
            <Title text='Order Or Reserve Now' />
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantDetailScreen.navigationOptions = navigationData => {
  // const restTitles = navigationData.navigation.getParam('title');
  // const restIndex = navigationData.navigation.getParam('restIndex');
  //console.log('rest  '+restIndex);
  return {
    headerTitle: 'Restaurant',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  scoreImage: {
    width: 100,
    height: 150,
  },
  text: {
    fontFamily: 'rubik',
  },
  restTitle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    fontSize: 25,
  },
  title: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 5,
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    padding: 10,
    backgroundColor: Colors.accentColor,
    borderRadius: 5,

  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  bottomSpace: {
    marginBottom: 20,
  }

});
export default RestaurantDetailScreen;