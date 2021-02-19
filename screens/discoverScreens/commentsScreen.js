import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CommentStack from "../../components/commentStack";
import Title from "../../components/title";

export default (props) => {
  const comments = props.navigation.getParam("text");
  const dates = props.navigation.getParam("date");
  const commentsUsernames = props.navigation.getParam("username");

  return (
    <View style={{backgroundColor:'#FFF'}}>
      <Title>COMMENTS!</Title>
      <View style={{alignItems: "center"}}>
        <FlatList
          data={comments.length > 0 ? comments : "no way"}
          renderItem={({ item, index }) => {
            if (comments.length > 1) {
                return (
                  <CommentStack
                    text={item}
                    date={dates[index]}
                    username={commentsUsernames[index]}
                  />
                );
              
            } else {
              if (index == 0) {
                return <Text>No comments yet!</Text>;
              } else {
                return null;
              }
            }
          }}
          keyExtractor={(item) => item}
          style={{ width: "90%" }}
        />
      </View>
    </View>
  );
};
