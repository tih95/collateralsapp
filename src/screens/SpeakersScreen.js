import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ActionSheet, Button, View } from 'react-native-ui-lib';

import SpeakerList from '../custom/SpeakerList';

import * as data from '../data.json';

export default class SpeakersScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      speakers: [],
      pickerVisible: false
    }
  }

  _sortByMode = (mode) => {
    let speakerArr = data.speakers;

    if (mode === 'name') {
      speakerArr.sort((a, b) => {
        let aVar = a.name.toLowerCase();
        let bVar = b.name.toLowerCase();
  
        if (aVar > bVar) {
          return 1;
        }
        else if (aVar < bVar) {
          return -1;
        }
        else {
          return 0;
        }
      })
    }
    else if (mode === 'country') {
      speakerArr.sort((a, b) => {
        let aVar = a.country.toLowerCase();
        let bVar = b.country.toLowerCase();
  
        if (aVar > bVar) {
          return 1;
        }
        else if (aVar < bVar) {
          return -1;
        }
        else {
          return 0;
        }
      })
    }
    this.setState({speakers: speakerArr})
  }

  componentDidMount() {
    let speakerArr = [];

    speakerArr = data.speakers;

    // sort by country
    speakerArr.sort((a, b) => {
      let aVar = a.name.toLowerCase();
      let bVar = b.name.toLowerCase();

      if (aVar > bVar) {
        return 1;
      }
      else if (aVar < bVar) {
        return -1;
      }
      else {
        return 0;
      }
    })
    this.setState({speakers: speakerArr});
 }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <View right>
          <Button
            style={{margin: 10}}
            size="small"
            label={'Sort By'}
            onPress={() => {
              this.setState({
                pickerVisible: true
              })
            }}
          />
          <ActionSheet
            visible={this.state.pickerVisible}
            title='Sort by...'
            cancelButtonIndex={3}
            options={[
              {label: 'Name', onPress: () => this._sortByMode('name')},
              {label: 'Country', onPress: () => this._sortByMode('country')},
              {label: 'Cancel', onPress: () => this.onDismiss},
            ]}
            onDismiss={() => this.setState({pickerVisible: false})}
          >
          </ActionSheet>
        </View>
        <SpeakerList data={this.state.speakers} navigation={this.props.navigation}/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  }
})
