import React, {Component} from 'react';
import { Alert, AppRegistry, Platform, StyleSheet } from 'react-native';
import { Button, Text, TextField, View, Image } from 'react-native-ui-lib';
import firebase from 'react-native-firebase';

import LogoTitle from '../custom/LogoTitle';
import Loader from '../custom/Loader';

export default class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
      loading: false,
    }
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#37474F'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  _handleSignUp = () => {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        loading: true
      })
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(cred => {
        cred.user.updateProfile({
          displayName: this.state.name
        });

        let d = new Date();
        d.setHours(0,0,0,0);

        firebase.firestore().collection('users').add({
          userId: cred.user.uid,
          favoriteEvents: [],
          checkedIn: false,
          checkInTime: d
        })
      })
      .then(() => {
        this.setState({
          loading: false
        })
        this.props.navigation.navigate('App');
      })
      .catch(error => this.setState({errorMessage: error.message, loading: false}))

    }
    else {
      Alert.alert('Passwords do not match!');
      this.setState({
        password: '',
        confirmPassword: ''
      })
    }
  }

  render() {
    return(
      <View style={styles.screen}>
        <Loader loading={this.state.loading}/>
        <Text style={{fontWeight: '300', color: 'white', fontSize: 32, letterSpacing: 2, marginTop: 75}}>Create an account</Text>
        <View style={styles.formContainer}>
          <TextField
            placeholder='Name'
            floatingPlaceholder
            floatingPlaceholderColor={{focus: "white"}}
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={name => this.setState( {name} )}
            value={this.state.name}
            floatOnFocus
            returnKeyType="next"
            onSubmitEditing={() => this.emailRef.focus()}
          />
          <TextField
            ref={emailRef => this.emailRef = emailRef}
            placeholder='Email'
            floatingPlaceholder
            floatingPlaceholderColor={{focus: "white"}}
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={email => this.setState( {email} )}
            value={this.state.email}
            floatOnFocus
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordRef.focus()}
          />
          <TextField
            ref={passwordRef => this.passwordRef = passwordRef}
            secureTextEntry={true}
            placeholder='Password'
            floatingPlaceholder
            floatingPlaceholderColor={{focus: "white"}}
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={password => this.setState( {password} )}
            value={this.state.password}
            floatOnFocus
            returnKeyType="next"
            onSubmitEditing={() => this.confRef.focus()}
          />
          <TextField
            ref={confRef => this.confRef = confRef}
            secureTextEntry={true}
            placeholder='Confirm Password'
            floatingPlaceholder
            floatingPlaceholderColor={{focus: "white"}}
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={confirmPassword => this.setState( {confirmPassword} )}
            value={this.state.confirmPassword}
            floatOnFocus
            returnKeyType="done"
          />
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <Button
            label="Sign Up"
            style={{marginTop: 40}}
            onPress={this._handleSignUp}
            disabled={!this.state.email.length || !this.state.password.length
              || !this.state.name.length || !this.state.confirmPassword.length}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#455A64',
    flex: 1,
    alignItems: 'center'
  },
  formContainer: {
    width: 300,
    marginTop: 50,
  }
})
