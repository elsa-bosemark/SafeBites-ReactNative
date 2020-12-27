import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RateScreen = props => {
  return (
    <View style={styles.container}>
      <Text>RateScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RateScreen;