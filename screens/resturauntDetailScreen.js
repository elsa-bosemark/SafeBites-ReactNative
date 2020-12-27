import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ResturauntDetailScreen = props => {
  return (
    <View style={styles.container}>
      <Text>DetailPage</Text>
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
export default ResturauntDetailScreen;