import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ScoreSlider = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.safetyTitle}</Text>
      <View style={{ ...styles.row, ...{ width: '100%' } }}>
        <View style={styles.slider}>
          <Slider
            value={props.score}
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
            disabled={true}
            minimumTrackTintColor={Colors.primaryColor}
            maximumTrackTintColor='#E0E0E0'
            maximumValue={100}
          />
        </View>
        <Text style={{ ...styles.title, ...{ paddingLeft: 10 } }}>{props.score}%</Text>
        <View style={{ ...styles.row,...styles.center, ...{ flex:1} }}>
          <Ionicons name='person' size={20} color='grey' />
          <Text style={styles.title}>{props.reviewCount}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingBottom:20
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderThumb: {
    height: 30,
    width: 30,
    backgroundColor: '#015440',
  },
  sliderTrack: {
    height: 20,
    borderRadius: 20,
  },
  slider: {
    width: '70%'
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
});

export default ScoreSlider;