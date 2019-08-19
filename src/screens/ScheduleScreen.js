import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image, Text, View, Button, ActionSheet, Toast } from 'react-native-ui-lib';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from 'react-native-firebase';

import Flags from '../Flags';

import * as data from '../data.json';

export default class ScheduleScreen extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('users');

    this.state = {
      events: [],
      favoriteEvents: [],
      mode: 'day1',
      pickerVisible: false,
      showFavoriteToast: false,
      showUnfavoriteToast: false
    }
  }

  static navigationOptions = {
    headerTitle: <Text style={{color: 'white', fontSize: 25, fontWeight: '100',}}>Schedule</Text>, 
  };

  // render each of the schedule cards
  _renderItem = ({ item }) => {
    let speakers = item.speakers;
    let countries = [];

    countries = item.country.split(/[&,]/).map(item => item.trim());
    
    // is speakers is empty then return null otherwise return all list of speakers
    if (item.speakers.length === 0) {
      speakers = null;
    }
    else {
      speakers = speakers.map((speaker) => {
        return (
            <Text style={{marginTop: 3, fontStyle: 'italic'}}>{speaker.name}</Text>
        )
      })
      speakers.unshift(
        <Text style={{textDecorationLine: 'underline'}}>Speakers</Text>);
    }
    
    // if countries is empty return null, otherwise, return all countries and flags
    if (countries.length <= 0) {
      countries = null;
    }
    else {
      flags = countries.map(country => {
        return (
          <Image
            source={Flags[country]}
            style={{height: 20, width: 20, marginTop: 4}}
          />
        )
      })
    }

    return (
      <View style={styles.container}>
        <View style={styles.time}>
          <Text style={{fontWeight: '600', letterSpacing: 1}}>{moment.unix(item.startTime).format('HH:mm')}</Text>
          <Text style={{letterSpacing: 1, fontSize: 10}}>{moment.unix(item.startTime).format('MMM, Do')}</Text>
        </View>
        <View style={styles.lineContainer}>
          {flags}
          <View style={{marginTop: 4, width: 1, flex: 1, backgroundColor: 'black'}}></View>
        </View>
        <View style={styles.eventContainer}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text 
              style={{fontWeight: '600', fontSize: 16, marginBottom: 5, letterSpacing: 1}}>
              {item.country}
            </Text>
            
          </View>
          <View style={{paddingLeft: 10}}>
            {speakers}
          </View>
          <View style={{width: 30}}>
            <TouchableOpacity 
              style={{width: 30}}
              onPress={this.handleFavorites.bind(this, item)}>
              <Icon name={this.isEventInFavorites(item) ? 'md-star' : 'md-star-outline'} 
                size={30} 
                style={{width: 30}}>
              </Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}></View>
        </View>
      </View>
    );
  };

  _keyExtractor = item => item.country;

  isEventInFavorites = (event) => {
    let favorites = this.state.favoriteEvents;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].country === event.country) {
        return true;
      }
    }
    return false;
  }

  handleFavorites = (event) => {
    let faves = [];

    if (this.isEventInFavorites(event)) {
      this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          snapshot.forEach(doc => {
            faves = doc.get('favoriteEvents');
            let filteredFaves = faves.filter(item => item.country !== event.country);
            filteredFaves.sort((a, b) => {
              if (a.day > b.day) {
                return 1;
              }
              else if (a.day < b.day) {
                return -1;
              }
              else if (a.startTime > b.startTime) {
                return 1;
              }
              else if (a.startTime < b.startTime) {
                return -1;
              }
              else {
                return 0;
              }
            })
            this.ref.doc(doc.id).update({favoriteEvents: filteredFaves}).then(() => {
              this.setState({favoriteEvents: filteredFaves, showUnfavoriteToast: true});
            });
          })
      });
    }
    else {
      this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          snapshot.forEach(doc => {
            faves = doc.get('favoriteEvents');
            faves.push(event);

            this.ref.doc(doc.id).update({favoriteEvents: faves}).then(() => {
              this.setState({favoriteEvents: faves, showFavoriteToast: true});
            });
          })
      });
    }
  }

  filterList = (mode) => {
    if (mode === 'favorites') {
      this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          snapshot.forEach(doc => {
            faves = doc.get('favoriteEvents');
            faves.sort((a, b) => {
              if (a.day > b.day) {
                return 1;
              }
              else if (a.day < b.day) {
                return -1;
              }
              else if (a.startTime > b.startTime) {
                return 1;
              }
              else if (a.startTime < b.startTime) {
                return -1;
              }
              else {
                return 0;
              }
            })
            this.setState({
              events: faves,
              mode: 'favorites'
            })
          })
      });
    }
    else if (mode === 'day1') {
      let filtered = data.events.filter((item) => {
        return item.day === 1;
      })
      this.setState({
        events: filtered,
        mode: 'day1'
      })
    }
    else {
      let filtered = data.events.filter((item) => {
        return item.day === 2;
      })
      this.setState({
        events: filtered,
        mode: 'day2'
      })
    }
  }

  componentDidMount() {
    let eventArray = [];
    let faves = [];

    eventArray = data.events.filter((item) => {
      return item.day === 1
    });
    
    this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        faves = doc.get('favoriteEvents');
      })
      this.setState({events: eventArray, favoriteEvents: faves});
    });
  }

  render() {
    return (
        <SafeAreaView style={styles.mainContainer}>
          <Toast 
            visible={this.state.showFavoriteToast}
            position={'bottom'}
            backgroundColor={'black'}
            message='Favorited!'
            autoDismiss={1500}
            onDismiss={() => this.setState({showFavoriteToast: false})}
          />
          <Toast 
            visible={this.state.showUnfavoriteToast}
            position={'bottom'}
            backgroundColor={'black'}
            message='Unfavorited!'
            autoDismiss={1500}
            onDismiss={() => this.setState({showUnfavoriteToast: false})}
          />
          <View
            style={styles.topRow}>
            <Text
              style={{fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
              {this.state.mode === 'day1' ? 'Showing Day 1' : this.state.mode === 'day2' ? 'Showing Day 2' : 'Showing Favorites'}
            </Text>
            <Button
              style={{marginRight: 10}}
              size="small"
              label={'Filter'}
              onPress={() => {
                this.setState({
                  pickerVisible: true
                })
              }}
            />
            <ActionSheet
              visible={this.state.pickerVisible}
              title='Filter by...'
              cancelButtonIndex={3}
              options={[
                {label: 'Day 1', onPress: () => this.filterList('day1')},
                {label: 'Day 2', onPress: () => this.filterList('day2')},
                {label: 'Favorites', onPress: () => this.filterList('favorites')}
              ]}
              onDismiss={() => this.setState({pickerVisible: false})}
            >
            </ActionSheet>
          </View>
          <FlatList
            data={this.favoriteMode ? this.state.favoriteEvents : this.state.events}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10
  },
  time: {
      justifyContent: 'center',
      paddingLeft: 8,
      paddingRight: 8,
  },
  lineContainer: {
    alignItems: 'center',
    marginRight: 8
  },
  eventContainer: {
    flex: 1,
    marginRight: 8
  },
  separator: {
    height: 0.75,
    backgroundColor: 'grey',
    marginTop: 6,
    marginBottom: 6
  },
  topRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#CFD8DC', 
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  }
})

