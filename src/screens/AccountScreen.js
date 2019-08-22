import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import firebase from 'react-native-firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
    }
  }

  static navigationOptions = {
    headerTitle: <Text style={{color: 'white', fontSize: 25, fontWeight: '100',}}>Account</Text>, 
  };

  componentDidMount() {
    this.setState({
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email
    })
  }

  // called when the editprofilescreen saves changes and calls the method before navigation
  // back
  _refresh = () => {
    this.setState({
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email
    })
  }

  _signOut = () => {
    firebase.auth().signOut().then(() => this.props.navigation.navigate('AuthLoading'));
  }

  _goToEditProfile = () => {
    this.props.navigation.navigate('EditProfile', {refresh: this._refresh});
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.accountInfoText}>{this.state.displayName}</Text>
        <Text style={{color: 'black', textAlign: 'center'}}>{this.state.email}</Text>
        <View style={styles.touchableView}>
          <TouchableOpacity
            style={{marginBottom: 25}}
            onPress={this._goToEditProfile}>
            <Text style={{fontSize: 20, fontWeight: '200'}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <Button color={'white'} style={styles.signOutButton} label="Sign out" onPress={this._signOut} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    marginTop: 25
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: '300',
  },
  accountInfoText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    marginTop: 40,
    marginBottom: 5
  },
  signOutButton: {
    position: 'absolute',
    bottom: 50,
    width: 300,
    alignSelf: 'center'
  },
  touchableView: {
    flex: 1,
    marginTop: 50,
    marginLeft:25
  }
})
