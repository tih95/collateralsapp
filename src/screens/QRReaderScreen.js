import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

import firebase from 'react-native-firebase';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRReaderScreen extends Component {
  constructor(props) {
    super(props)

    this.ref = firebase.firestore().collection('users');

    this.state = {
      checkedIn: false
    }
  }

  componentDidMount() {
    this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        data = doc.data();
      })

      this.setState({checkedIn: data.checkedIn})
    });
  }

  onSuccess = (e) => {
    if (e.data === 'checkin!' && !this.state.checkedIn) {
      this.ref.where('userId', '==', firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          this.ref.doc(doc.id).update({checkedIn: true, checkInTime: new Date()})
        })
        
      });

      this.setState({checkedIn: true});
    }
  }
  
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <View>
            <Text>{this.state.checkedIn ? 'You are checked in!' : 'Please scan the QR code near the front of the entrance'}</Text>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});