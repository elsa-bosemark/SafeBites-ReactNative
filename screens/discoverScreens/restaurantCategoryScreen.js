import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';

import RetaurantDetail from './restaurantDetailScreen';
import homeScreen from './homeScreen';
import { CATEGORIES } from '../../data/categoryData';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import RestaurantCard from '../../components/restaurantCard';
import Colors from '../../constants/Colors';


const RestaurantCategoryScreen = props => {
  //search states
  // state = {
  //   search: '',
  //   nameList: [],

  // };
  //SEARCH
  // updateSearch = (search) => {
  //   this.setState({ search: search });

  //   let filteredRestaurants = displayedRestaurantsArray.filter(function (item) {
  //     return item.includes(search);
  //   });

  //   this.setState({ filteredRestaurants: filteredRestaurants });
  // };

  //   //Search
  //   const { search, nameList } = this.state;



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

  //This gets the index interms of the entire rest array so that the images, price ect correspond correctly to the title
  const actualIndex = (item) => { return restaurantData.indexOf(item) }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search..."
            //onChangeText={this.updateSearch}
            //value={search}
            color='black'
            platform={Platform.OS === 'android' ? 'android' : 'ios'}
            containerStyle={{
              backgroundColor: '',
            }}
            inputContainerStyle={{
              borderRadius: 10,
              backgroundColor: 'white'
            }}
          />
        </View>

        <FlatList
          data={displayedRestaurantsArray}//data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : displayedRestaurantsArray}
          renderItem={({ item, index }) => (
            <RestaurantCard
              title={item}
              price={price[actualIndex(item)]}
              cover={cover[actualIndex(item)]}
              transactions={transactions[actualIndex(item)]}
              restaurantCoordinates={restaurantCoordinates[actualIndex(item)]}
              userCoordinates={userCoordinates}
              onSelect={() => {
              }} />
          )}
          size="large"
          keyExtractor={item => item}
          refreshing={false}
          style={styles.list}
        />
      </ScrollView>

    </View>

  );
}

//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantCategoryScreen.navigationOptions = navigationData => {
  //fetching nessary information (kinda repeating what I did in restaurantCategoryScreen)
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: 'rubik',
    fontSize: 20,
    padding: 20,
  },
  list: {
    width: '100%',
  },
  searchBar: {
    width: '100%',
    padding: Platform.OS === 'android' ? 10 : 0,
  }
});
export default RestaurantCategoryScreen;