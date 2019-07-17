import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image, ListItem } from 'react-native-ui-lib';

import Flags from '../Flags';

export default class SpeakerList extends Component {

    constructor(props) {
      super(props);

      this.state = {
        extra: ''
      }
    }

    _moveToSpeakerPage = (speaker) => {
      this.props.navigation.navigate('Speaker', {speaker: speaker});
    }

   _keyExtractor = (item) => item.name;
 
   _renderItem = ({item}) => {
     let icon = Flags[item.country];
     console.log('rendering item');
 
     return(
       <TouchableOpacity
        onPress={this._moveToSpeakerPage.bind(this, item)}>
        <ListItem containerStyle={styles.listItem}>
          <ListItem.Part left containerStyle={styles.listItemLeft}>
            <Image 
              source={icon}
              style={styles.image}
            />
          </ListItem.Part>
          <ListItem.Part middle column>
            <ListItem.Part>
              <Text style={{fontWeight: '700'}}>
                {item.name}
              </Text>
              <Text style={{marginLeft: 10, marginRight: 10}}>
                {item.location}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text style={{fontStyle: 'italic'}}>{item.country}</Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </TouchableOpacity>
     )
   }
 
   render() {
     console.log(this.props.data)
     return (
       <View style={styles.speakerListContainer}>
         <FlatList
           data={this.props.data}
           extraData={this.props.data[0]}
           key={this.props.data}
           renderItem={this._renderItem}
           keyExtractor={this._keyExtractor}
         />
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   text: {
      color: 'white'
    },
    speakerListContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    image: {
      height: 30,
      width: 30,
    },
    listItemLeft: {
      marginRight: 10,
      marginLeft: 10
    },
    listItem: {
      backgroundColor: 'white'
    }
 })