import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends Component {
   constructor(props) {
      super(props);
  
      this.state = {

      }
    }
  
    componentDidMount() {

    }

    render() {
       return (
         <SafeAreaView  style={styles.gridView}> 
            <View>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SpeakerList')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-microphone"
                        size={70} >
                     </Icon>
                     <Text>Speakers</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Schedule')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-calendar"
                        size={70} >
                     </Icon>
                     <Text>Schedule</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AccountInfo')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-person"
                        size={70} >
                     </Icon>
                     <Text>Account</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <View>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('CheckIn')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-qr-scanner"
                        size={70} >
                     </Icon>
                     <Text>Check in</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Sponsors')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-business"
                        size={70} >
                     </Icon>
                     <Text>Sponsors</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Endorsements')} >
                  <View style={styles.iconSquare}>
                     <Icon name="md-ribbon"
                        size={70} >
                     </Icon>
                     <Text>Endorsements</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
       )
    }
}

const styles = StyleSheet.create({
   gridView: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
   },
   iconSquare: {
      alignItems: 'center',
      marginBottom:10,
      padding: 30
   }
})