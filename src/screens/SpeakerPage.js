import React, { Component } from 'react';
import { Linking, StyleSheet, SafeAreaView } from 'react-native';
import { Text, View, Button, Image } from 'react-native-ui-lib';

import Flags from '../Flags';

export default class SpeakerPage extends Component {
   constructor(props) {
      super(props);

      this.speakerInfo = this.props.navigation.state.params.speaker;
   }

   static navigationOptions = {
      headerTitle: <Text style={{color: 'white', fontSize: 25, fontWeight: '100',}}>Speaker</Text>, 
   };

   render() {
      let icon = Flags[this.speakerInfo.country];

      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.titleRow}>
               <Image 
                  source={icon}
                  style={styles.image}
               />
               <View>
                  <Text style={{fontSize: 28, fontWeight: '200'}}>{this.speakerInfo.name}</Text>
                  <Text>{this.speakerInfo.country}</Text>
               </View>
            </View>
            <View style={styles.mainBody}>
               <Text style={{fontSize: 20, fontWeight: '200'}}>Description</Text>
               <Text style={{marginBottom: 10}}>{this.speakerInfo.description}</Text>
               <Text style={{fontSize: 20, fontWeight: '200', marginBottom: 10}}>Speaking Time: {this.speakerInfo.sessionTime}</Text>
               <Text style={{fontSize: 20, fontWeight: '200', marginBottom: 10}}>Session Title: {this.speakerInfo.sessionTitle}</Text>
               <Button 
                  onPress={() => Linking.openURL(`${this.speakerInfo.link}`)} 
                  link
                  label={'Learn more here'}   
               />
            </View>
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   image: {
      width: 60,
      height: 60,
      marginRight: 10
   },
   titleRow: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
   },
   mainBody: {
      flex: 6,
      flexDirection: 'column',
      paddingLeft: 10,
   },
   container: {
      flex: 1,
      justifyContent: 'flex-start'
   }
})