import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';


const Tags = props => {

  let tagArray = [];
  const tag = props.restTags.forEach((value) => {
    tagArray.push(
      <View style={styles.tag}>
        <Text style={{ ...styles.text, ...{ fontSize: 19, color: 'white' } }}>{value.title}</Text>
      </View>
    )
  });
    return tagArray;
}

const styles = StyleSheet.create({
  tag: {
    padding: 10,
    backgroundColor: Colors.accentColor,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontFamily: 'rubik',
  },

});

export default Tags;