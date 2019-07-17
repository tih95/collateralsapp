import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { View, Text, Button, Image } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SponsorsScreen extends Component {
   render() {
      return (
         <SafeAreaView>
            <Text style={styles.title}>
               Thank you to our generous sponsors for making Collaterals 2019 possible!
            </Text>
            <View>
               <Image source={require('../../assets/img/NeuroVasc_logo.png')}/>
            </View>
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   title: {
      fontSize: 30,
      textAlign: 'center'
   }
})