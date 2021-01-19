import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
const screen = Dimensions.get('window');

export const ScoreSlider = props => {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.title}>{props.safetyTitle}</Text>
      <View style={{ ...styles.row, ...{ width: '100%' } }}>
        <View style={styles.scoreSlider}>
          <Slider
            value={props.score}
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
            disabled={true}
            minimumTrackTintColor={Colors.greyple}
            maximumTrackTintColor='#E0E0E0'
            maximumValue={100}
          />
        </View>
        <Text style={{ ...styles.title, ...{ paddingLeft: 10 } }}>{props.score}%</Text>
        <View style={{ ...styles.row, ...styles.center, ...{ flex: 1 } }}>
          <Ionicons name='person' size={20} color='grey' />
          <Text style={styles.title}>{props.reviewCount}</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreContainer: {
    paddingBottom: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  sliderThumb: {
    height: 30,
    width: 30,
    backgroundColor: Colors.darkColor
  },
  sliderTrack: {
    height: 20,
    borderRadius: 20,
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreSlider: {
    width: '70%'
  },
  title: {
    flex: 1,
    padding: 5,
    fontSize: 18,
    fontFamily: 'rubik'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

