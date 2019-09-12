import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { View, Text, Button, Image } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';

let imageUrls = [
   {url: require('../../assets/img/ninds_logo.png')},
   {url: require('../../assets/img/stryker_logo.png')},
   {url: require('../../assets/img/medtronic_logo.png')},
   {url: require('../../assets/img/NeuroVasc_logo.png')},   
   {url: require('../../assets/img/cerenovus-logo.png')}
]

export default class SponsorsScreen extends Component {
   static navigationOptions = {
      headerTitle: <Text style={{color: 'white', fontSize: 25, fontWeight: '100',}}>Sponsors</Text>, 
    };

   _keyExtractor = item => item.url;

   render() {
      return (
         <SafeAreaView
            style={styles.container}
         >
            <Text style={styles.title}>
               Thank you to our generous sponsors for making Collaterals 2019 possible!
            </Text>
            <FlatList
               data={imageUrls}
               renderItem={({item}) => <Image style={{marginBottom: 20}} source={item.url}/>}
               keyExtractor={this._keyExtractor}
            />
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      alignItems: 'center'
   },
   title: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 20
   }
})