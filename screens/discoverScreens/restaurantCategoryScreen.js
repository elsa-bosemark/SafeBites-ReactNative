import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import RetaurantDetail from './restaurantDetailScreen';
import homeScreen from './homeScreen';
import { CATEGORIES } from '../../data/categoryData';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import RestaurantCard from '../../components/restaurantCard';


const RestaurantCategoryScreen = props => {

  //get all the params
  const restaurantData = props.navigation.getParam('title');
  const transactions = props.navigation.getParam('transactions');
  const price = props.navigation.getParam('price');
  const cover = props.navigation.getParam('cover');
  const restaurantCoordinates = props.navigation.getParam('restaurantCoordinates');
  const userCoordinates = props.navigation.getParam('userCoordinates');
  const phoneNumber = props.navigation.getParam('phoneNumber');
  const address = props.navigation.getParam('address');
  const yelpUrl = props.navigation.getParam('yelpUrl');


  //get params sent by home screen (the catid) will give title and the resurants that fit into the
  const catId = props.navigation.getParam('categoryId');

  //I go through the names of the restuarants and make a new array based on if they have the transaction/cat
  let displayedRestaurantsArray = [];
  const displayedRestaurants = restaurantData.map((rest, index) => {
    transactions[index].forEach(trans => {
      if (trans.indexOf(catId) >= 0) {
        displayedRestaurantsArray.push(rest);
      }
    })
  });
  // updateSearch = (search) => {
  //   this.setState({ search: search });

  //   let filteredData = this.state.data.filter(function (item) {
  //     return item.includes(search);
  //   });

  //   this.setState({ filteredData: filteredData });
  // };

  // const { search, nameList } = this.state;

  return (
 
      <View style={styles.container}>
        {/* <SearchBar
        placeholder="Type Here..."
        platform="android"
        round="true"
        onChangeText={this.updateSearch}
        value={search}
      /> */}
        <FlatList
          data={displayedRestaurantsArray}
          renderItem={({ item, index }) => (
            <RestaurantCard
              title={item}
              price={price[index]}
              cover={cover[index]}
              transactions={transactions[index]}
              restaurantCoordinates={restaurantCoordinates[index]}
              userCoordinates={userCoordinates}
              onSelect={() => {
              }} />
          )}
          size="large"
          keyExtractor={item => item}
          refreshing={false}
          style={styles.list}
        />
      </View>

  );
}  

//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantCategoryScreen.navigationOptions = navigationData => {
  //fetching nessary information (kinda repeating what I did in restaurantCategoryScreen)
  const catId = navigationData.navigation.getParam('categoryId');
  console.log(catId)
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'rubik',
    fontSize: 20,
    padding: 20,
  },
  list:{
    width:'100%',
  }
});
export default RestaurantCategoryScreen;