import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';

import RetaurantDetail from './restaurantDetailScreen';
import homeScreen from './homeScreen';
import { CATEGORIES } from '../../data/categoryData';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import RestaurantCard from '../../components/restaurantCard';
import Colors from '../../constants/Colors';

state = {
  filteredData: null,
}

class RestaurantCategoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      catId : this.props.navigation.getParam('categoryId'),
      restTitle: this.props.navigation.getParam('title'),
      transactions : this.props.navigation.getParam('transactions'),
      price : this.props.navigation.getParam('price'),
      cover : this.props.navigation.getParam('cover'),
      restaurantCoordinates : this.props.navigation.getParam('restaurantCoordinates'),
      userCoordinates : this.props.navigation.getParam('userCoordinates'),
      phoneNumber : this.props.navigation.getParam('phoneNumber'),
      address : this.props.navigation.getParam('address'),
      yelpUrl : this.props.navigation.getParam('yelpUrl'),

      
    }
  }

  //search states
  state = {
    search: '',
    nameList: [],

  };
  //SEARCH
  // updateSearch = (search) => {
  //   this.setState({ search: search });

  //   let filteredRestaurants = displayedRestaurantsArray.filter(function (item) {
  //     return item.includes(search);
  //   });

  //   this.setState({ filteredRestaurants: filteredRestaurants });
  // };


  //RENDER
  render() {
    //Search
    // const { search, nameList } = this.state;
    console.log('this is the title asdfasdf  ' + this.state.restTitle)
    console.log('transaction  ' + this.state.transactions)

    //I go through the names of the restuarants and make a new array based on if they have the transaction/cat

    let displayedRestaurantsArray = [];
    const displayedRestaurants = this.state.restTitle.map((rest, index) => {
      transactions[index].forEach(trans => {
        if (trans.indexOf(catId) >= 0) {
          displayedRestaurantsArray.push(rest);
        }
      })
    });

    //This gets the index interms of the entire rest array so that the images, price ect correspond correctly to the title
    const actualIndex = (item) => { return this.state.restTitle.indexOf(item) }

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
                price={this.state.price[actualIndex(item)]}
                cover={this.state.cover[actualIndex(item)]}
                transactions={this.state.transactions[actualIndex(item)]}
                restaurantCoordinates={this.state.restaurantCoordinates[actualIndex(item)]}
                userCoordinates={this.state.userCoordinates}
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

}

//this is a changeing screen (has mutiple cats) therefore I make into a function and can asscess the catId
RestaurantCategoryScreen.navigationOptions = navigationData => {

  //const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === this.state.catId);
  
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