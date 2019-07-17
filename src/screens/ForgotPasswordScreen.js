import React, {Component} from 'react';
import { Alert, AppRegistry, Platform, StyleSheet } from 'react-native';
import { Button, Text, TextField, View, Image } from 'react-native-ui-lib';
import firebase from 'react-native-firebase';

import LogoTitle from '../custom/LogoTitle';
import Loader from '../custom/Loader';

export default class ForgotPasswordScreen extends Component {
   constructor(props) {
      super(props)

      this.state = {
         email: '',
         errorMessage: null,
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

   _handleForgotPassword = () => {
      firebase.auth().sendPasswordResetEmail(this.state.email)
         .then((user) => {
            alert('Please check your email')
         }).then(() => {
            this.props.navigation.navigate('Login');
         }).catch((e) => {
            this.setState({errorMessage: e.message})
         })
   }

   render() {
      return (
         <View style={styles.screen}>
            <Text style={styles.title}>Enter user email</Text>
            <View style={styles.formContainer}>
               <TextField
                  placeholder='Email'
                  floatingPlaceholder
                  floatingPlaceholderColor={{focus: "white"}}
                  color='#C0C0C0'
                  underlineColor={{default: '#C0C0C0', focus: 'white'}}
                  onChangeText={email => this.setState( {email: email, errorMessage: null} )}
                  value={this.state.email}
                  floatOnFocus
               />
               {this.state.errorMessage &&
               <Text style={{ color: 'red', marginBottom: 10 }}>
                  {this.state.errorMessage}
               </Text>}
               <Button
                  label="Reset Password"
                  style={{marginTop: 40}}
                  onPress={this._handleForgotPassword}
                  disabled={!this.state.email.length}
               />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   screen: {
     backgroundColor: '#455A64',
     flex: 1,
     alignItems: 'center',
   },
   formContainer: {
     width: 300,
     marginTop: 50,
   },
   title: {
      fontSize: 32,
      color: 'white',
      marginTop: 30
   }
 })
 