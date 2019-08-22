import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { View, Text, Button, Image } from 'react-native-ui-lib';
import Grid from 'react-native-grid-component';

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

   _renderItem = data => (
      <Image source={data.url} style={styles.item}/>
    );
  
    _renderPlaceholder = () => <View style={styles.item} />;

   render() {
      return (
         <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
               Thank you to these organizations for your endorsements!
            </Text>
            <Grid
               renderItem={this._renderItem}
               renderPlaceholder={this._renderPlaceholder}
               style={styles.list}
               data={imageUrls}
               numColumns={1}
               keyExtractor={(item, index) => index.toString()}/>
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   title: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 20
   },
   item: {
      flex: 1,
      margin: 30,
      alignSelf: 'center'
   }, 
   list: {
      flex: 1,
      
   }
})