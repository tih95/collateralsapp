import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { View, Text, Button, Image } from 'react-native-ui-lib';

let imageUrls = [
   {url: require('../../assets/img/eso_logo.jpg')},
   {url: require('../../assets/img/menasino_logo.jpeg')},
   {url: require('../../assets/img/KSS_logo.png')},
   {url: require('../../assets/img/ncs_logo.png')},
   {url: require('../../assets/img/snis_logo.png')},
   {url: require('../../assets/img/wso_logo.jpg')},
   {url: require('../../assets/img/svin_logo.png')},
   {url: require('../../assets/img/asn_logo.jpeg')}
]

export default class EndorsementScreen extends Component {
   static navigationOptions = {
      headerTitle: <Text style={{color: 'white', fontSize: 25, fontWeight: '100',}}>Endorsements</Text>, 
    };

   _keyExtractor = (item, index) => '{}';

   render() {
      return (
         <SafeAreaView
            style={styles.container}
         >
            <Text style={styles.title}>
               Thank you to these organizations for your endorsements!
            </Text>
            <FlatList
               data={imageUrls}
               renderItem={({item}) => <Image style={{marginBottom: 10}} source={item.url}/>}
               keyExtractor={this._keyExtractor}
            />
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      flex: 1
   },
   title: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 20
   }
})