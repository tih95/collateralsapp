import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export default class SettingsScreen extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Settings</Text>
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 25,
   },
   title: {
      color: 'black',
      textAlign: 'center',
      fontSize: 28,
      letterSpacing: 2,
      fontWeight: '300',
   },
})