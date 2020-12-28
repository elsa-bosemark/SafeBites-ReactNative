import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const ProfileScreen = props => {
  return (
    <SafeAreaView>

      <Text style={styles.title}>Categories</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontFamily: 'rubik',
    fontSize: 20,
    padding: 20, 
},
});
export default ProfileScreen;