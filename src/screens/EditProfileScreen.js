import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { View, TextField, Text, Button } from 'react-native-ui-lib';

import firebase, { firestore } from 'react-native-firebase';

import Loader from '../custom/Loader';

export default class EditProfileScreen extends Component {
   constructor(props) {
      super(props);

      this.state = {
         username: '',
         newPassword: '',
         loading: false,
         errorMessage: null
      }
   }

   _handleSaveChanges = () => {
      this.setState({loading: true})
      firebase.auth().currentUser.updateProfile({displayName: this.state.username})
         .then(() => {
            if (this.state.newPassword !== '') {
               firebase.auth().currentUser.updatePassword(this.state.newPassword)
                  .then(() => {
                     this.setState({loading: false})
                     firebase.auth().signOut().then(() => this.props.navigation.navigate('AuthLoading'))
                  }).catch((e) => {
                     if (e.code === 'auth/weak-password') {
                        this.setState({loading: false, errorMessage: 'Password is too weak'})
                     }
                     else {
                        this.setState({loading: false, errorMessage: e.message})
                     }
                  })
            }
            else {
               this.props.navigation.state.params.refresh();
               this.setState({loading: false})
               this.props.navigation.goBack();
            }
         })
   }

   componentDidMount() {
      this.setState({
         username: firebase.auth().currentUser.displayName
      })
   }

   render() {
      return (
         <SafeAreaView style={styles.container}>
            <Loader loading={this.state.loading} />
            <Text style={styles.title}>Edit Profile</Text>
            <View style={styles.inputFields}>
               <TextField 
                  floatingPlaceholder={true}
                  floatOnFocus={true}
                  floatingPlaceholderColor={{focus: 'black'}}
                  placeholder='Name'
                  color='black'
                  value={this.state.username}
                  autoCorrect={false}
                  onChangeText={username => this.setState({ username })}
               />
               <TextField 
                  floatingPlaceholder={true}
                  floatOnFocus={true}
                  floatingPlaceholderColor={{focus: 'black'}}
                  placeholder='New Password'
                  onChangeText={newPassword => this.setState({ newPassword: newPassword, errorMessage: null })}
                  autoCorrect={false}
                  secureTextEntry={true}
                  color='black'
               />
               {this.state.errorMessage &&
               <Text style={{ color: 'red', marginBottom: 10 }}>
                  {this.state.errorMessage}
               </Text>}
               <Text
                  style={{fontStyle: 'italic', color: 'grey'}}>
                  Note: this will sign you out and you will have to login again with new password
               </Text>
               {(firebase.auth().currentUser.displayName === this.state.username)
                     && (this.state.newPassword === '') ? null : 
               <Button 
                  label='Save Changes'
                  onPress={this._handleSaveChanges}
                  style={{marginTop: 15}}
               />}
               
            </View>
            
         </SafeAreaView>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 25
   },
   title: {
      color: 'black',
      textAlign: 'center',
      fontSize: 28,
      letterSpacing: 2,
      fontWeight: '300',
   },
   inputFields: {
      flex: 1,
      width: 300,
      alignSelf: 'center',
      marginTop: 50
   }
})