import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import RetaurantDetail from "./restaurantDetailScreen";
import homeScreen from "./homeScreen";
import { CATEGORIES } from "../../data/categoryData";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import RestaurantCard from "../../components/restaurantCard";
import Colors from "../../constants/Colors";

export default ({ props, navigation }) => {
  //search states
  const [search, updateSearch] = useState("");
  const [filteredRestaurants, updateFilteredRestaurants] = useState([]);

  //SEARCH
  updateSearchBar = (search) => {
    // this.setState({ search: search });
    updateSearch(search);
    let filteredRestaurants = displayedRestaurantsArray.filter(function (item) {
      return item.includes(search);
    });
    updateFilteredRestaurants(filteredRestaurants);

    // this.setState({ filteredRestaurants: filteredRestaurants });
  };
  //   //Search
  //   const { search, nameList } = this.state;

  navigation.navigationOptions = (navigationData) => {
    //fetching nessary information (kinda repeating what I did in restaurantCategoryScreen)
    const catId = navigationData.navigation.getParam("categoryId");
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
    return {
      headerTitle: selectedCategory.title,
    };
  };

  //get all the params
  const restaurantData = navigation.getParam("title");
  const transactions = navigation.getParam("transactions");
  const price = navigation.getParam("price");
  const cover = navigation.getParam("cover");
  const restaurantCoordinates = navigation.getParam("restaurantCoordinates");
  const userCoordinates = navigation.getParam("userCoordinates");
  const phoneNumber = navigation.getParam("phoneNumber");
  const address = navigation.getParam("address");
  const yelpUrl = navigation.getParam("yelpUrl");
  const tags = navigation.getParam("tags");
  const yelpRating = navigation.getParam("yelpRating");
  const yelpReviewCount = navigation.getParam("yelpReviewCount");

  //get params sent by home screen (the catid) will give title and the resurants that fit into the
  const catId = navigation.getParam("categoryId");
  const categoryTitle = navigation.getParam("categoryTitle");
  navigation.state.params.name = categoryTitle;

  //I go through the names of the restuarants and make a new array based on if they have the transaction/cat
  let displayedRestaurantsArray = [];
  const displayedRestaurants = restaurantData.map((rest, index) => {
    transactions[index].forEach((trans) => {
      if (trans.indexOf(catId) >= 0) {
        displayedRestaurantsArray.push(rest);
      }
    });
  });

  //This gets the index interms of the entire rest array so that the images, price ect correspond correctly to the title
  const actualIndex = (item) => {
    return restaurantData.indexOf(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search..."
          onChangeText={updateSearchBar}
          value={search}
          color="black"
          platform={Platform.OS === "android" ? "android" : "ios"}
          containerStyle={{
            backgroundColor: "",
          }}
          inputContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
          }}
        />
      </View>

      <FlatList
        //data={displayedRestaurantsArray}
        data={
          filteredRestaurants && filteredRestaurants.length > 0
            ? filteredRestaurants
            : displayedRestaurantsArray
        }
        renderItem={({ item, index }) => (
          <RestaurantCard
            title={item}
            price={price[actualIndex(item)]}
            cover={cover[actualIndex(item)]}
            transactions={transactions[actualIndex(item)]}
            restaurantCoordinates={restaurantCoordinates[actualIndex(item)]}
            userCoordinates={userCoordinates}
            onSelect={() => {
              navigation.navigate({
                routeName: "RetaurantDetail",
                params: {
                  //pass restaurant DATA
                  restIndex: index,
                  title: displayedRestaurantsArray,
                  //NOTE: the data below is incorrect.
                  //it displays the correct restaurant, BUT the ones below are still using the master list, not the filtered list.
                  price: price,
                  cover: cover,
                  transactions: transactions,
                  restaurantCoordinates: restaurantCoordinates,
                  userCoordinates: userCoordinates,
                  phoneNumber: phoneNumber,
                  address: address,
                  yelpUrl: yelpUrl,
                  tags: tags,
                  yelpRating: yelpRating,
                  yelpReviewCount: yelpReviewCount,
                },
              });
            }}
          />
        )}
        size="large"
        keyExtractor={(item) => item}
        refreshing={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontFamily: "rubik",
    fontSize: 20,
    padding: 20,
  },
  list: {
    width: "100%",
  },
  searchBar: {
    width: "100%",
    padding: Platform.OS === "android" ? 10 : 0,
  },
});
