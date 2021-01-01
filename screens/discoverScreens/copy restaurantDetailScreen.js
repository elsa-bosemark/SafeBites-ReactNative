import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, TouchableNativeFeedback, Linking, Dimensions } from 'react-native';
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
import YelpServisRating from '../../components/yelpServisRating';
import Credit from '../../components/credit';
import Tags from '../../components/tags';
import OpenHours from '../../components/openHours';
import PhotoSlider from '../../components/photoSlider/photoSlider';

//This is what Athena and Elsa worked through to try and pass the params
state = {
  restIndex: null,
  restTitles: null,
  transactions: null,
  price: null,
  cover: null,
  restaurantCoordinates: null,
  userCoordinates: null,
  phoneNumber: null,
  address: null,
  yelpUrl: null,
  yelpRating: null,
  yelpReviewCount: null,
  photos: null,
  openHours: null,
  tags: null,
}
export default class RestaurantDetailScreen extends React.Component {

  componentDidMount() {
    //this.getLocationAsync()

  }
  this.setState({
    restIndex: this.props.route.params.restIndex,
    restTitles: this.props.route.params.title,
    transactions: this.props.route.params.transactions,
    price: this.props.route.params.price,
    cover: this.props.route.params.cover,
    restaurantCoordinates: this.props.route.params.restaurantCoordinates,
    userCoordinates: this.props.route.params.userCoordinates,
    phoneNumber: this.props.route.params.phoneNumber,
    address: this.props.route.params.address,
    yelpUrl: this.props.route.params.yelpUrl,
    yelpRating: this.props.route.params.yelpRating,
    yelpReviewCount: this.props.route.params.yelpReviewCount,
    photos: this.props.route.params.photos,
    openHours: this.props.route.params.openHours,
    tags: this.props.route.params.tags,
    data: [
      {
        image:
          'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        desc: 'Silent Waters in the mountains in midst of Himilayas',
      },
      {
        image:
          'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
        desc:
          'Red fort in India New Delhi is a magnificient masterpeiece of humans',
      },
      {
        image:
          'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        desc:
          'Sample Description below the image for representation purpose only',
      },
      {
        image:
          'https://images.unsplash.com/photo-1568700942090-19dc36fab0c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        desc:
          'Sample Description below the image for representation purpose only',
      },
      {
        image:
          'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        desc:
          'Sample Description below the image for representation purpose only',
      },
    ],
  });


render() {
  console.log('this is a test   ' + restaurantCoordinates[this.state.restIndex])
  //Calculate the distance of rest
  const restaurantDistance = getDistance(
    this.state.userCoordinates,
    this.state.restaurantCoordinates[this.state.restIndex]
  );
  //open link function
  const openLink = url => Linking.openURL(url).catch(() => {
    Alert.alert("Sorry, something went wrong.", "Please try again later.")
  })

  const screenWidth = Math.round(Dimensions.get('window').width);
  return (
    <SafeAreaView>
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Cover */}
            <PhotoSlider
              data={this.state.data}
              timer={2000}
              imageKey={'image'}
              local={false}
              width={screenWidth}
              separator={0}
              loop={true}
              autoscroll={true}
              currentIndexCallback={index => console.log('Index', index)}
              onPress={item => alert(JSON.stringify(item))}
              indicator
              animation
            />
            {/* <Image style={styles.image} source={{ uri: cover[restIndex] }} /> */}
            {/* Restaurant Title */}
            <Title text={this.state.restTitles[this.state.restIndex]} />
            <View style={[styles.row]}>
              {/* Transactions */}
              <View>
                <CatIcon cat={this.state.transactions[this.state.restIndex]} />
                {/* Price and Distance */}
                <View style={styles.row}>
                  <View style={styles.tag}>
                    <Text style={{ ...styles.text, ...{ fontSize: 19, color: 'white' } }}>{this.state.price[this.state.restIndex]}</Text>
                  </View>
                  <View style={{ ...styles.row, ...{ alignItems: 'center', } }}>
                    <Ionicons name='md-location-sharp' size={35} color={Colors.primaryColor} />
                    <Text style={{ ...styles.text, ...{ fontSize: 20 } }}>{Number((restaurantDistance / 1000).toFixed(1))} km</Text>
                  </View>
                </View>
                {/* Extra Info*/}
                {/* <OpenHours hours={openHours[restIndex]}/> */}
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
            <View style={{ flexDirection: 'row' }}>
              <Tags restTags={this.state.tags[this.state.restIndex]} />
            </View>
          </View>
          <Credit logo={require('../../assets/yelpStars/yelpLogo.png')} />
          <Divider />
          <View style={styles.card}>
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
            <ScoreSlider safetyTitle='Enforcement and use of masks by customers and staff ' score={20} reviewCount={5} />
            <ScoreSlider safetyTitle='Enforcement of Social Distancing ' score={90} reviewCount={5} />
            <ScoreSlider safetyTitle='Sheilds/physical barriers' score={80} reviewCount={5} />
            {/* Yes or no Info  OPTIONS: yes, no, or idk*/}
            <SafetyCard text='Staff wear gloves' result='yes' reviewCount={4} reviewCount={5} />
            <SafetyCard text='Contactless payment' result='no' reviewCount={4} reviewCount={5} />
            {/* <SafetyCard text='' result=''/> */}
          </View>

          <Divider />

          {/* More safety Rating */}
          <View style={styles.card}>
            <Title text='In Person Safety Mesures' />
            <SafetyCard text='Surfaces are sanitized after each patron' result='idk' reviewCount={4} />
            <SafetyCard text='Tempature check of customers' result='yes' reviewCount={4} />
            <SafetyCard text='Hand sanatizer provided' result='no' reviewCount={4} />
            <SafetyCard text='Utensils deliverd in a bag' result='yes' reviewCount={4} />
          </View>

          <Divider />

          {/* Comments */}
          <View style={styles.card}>
            <Title text='Comments' />
          </View>

          <Divider />

          {/* service Review */}
          <View style={styles.card}>
            <Title text='Food and Service Review' />
            <YelpServisRating text='Yelp' rating={this.state.yelpRating[this.state.restIndex]} reviewCount={this.state.yelpReviewCount[restIndex]} onSelect={() => {
              openLink(this.state.yelpUrl[this.state.restIndex])
            }} />
            <ServisRating text='Google' rating={3} reviewCount={100} />
          </View>

          <Divider />
          <View style={styles.card}>
            <Title text='Order or Reserve Now' />
          </View>


        </View>
      </ScrollView>
    </SafeAreaView >

  );
}

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

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  bottomSpace: {
    marginBottom: 20,
  },


});