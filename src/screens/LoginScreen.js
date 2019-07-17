import React, {Component} from 'react';
import { Alert, AppRegistry, Platform, StyleSheet } from 'react-native';
import { View, Text, TextField, Button, AnimatedImage } from 'react-native-ui-lib';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import Loader from '../custom/Loader';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      loading: false
    }
  }


  _handleLogin = () => {
    this.setState({
      loading: true
    })
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({loading: false})
      this.props.navigation.navigate('App');
    })
    .catch(error => this.setState({errorMessage: error.message, loading: false}))


  }

  _showSignUpPage = () => {
    this.props.navigation.navigate('Signup')
  }

  _showForgotPasswordPage = () => {
    this.props.navigation.navigate('ForgotPassword')
  }

  render() {
    return (

      <View style={{backgroundColor: '#455A64', flex: 1, alignItems: 'center'}}>
        <Loader loading={this.state.loading} />
        <AnimatedImage
          style={styles.image}
          source={require('../../assets/img/collateralsLogo.png')}
        />

        <Text style={{fontWeight: '300', color: 'white', fontSize: 32, letterSpacing: 3}}>Collaterals 2019</Text>
        <View style={styles.formContainer}>
          <TextField
            floatingPlaceholder
            floatingPlaceholderColor={{focus: 'white'}}
            placeholder="Email"
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={email => this.setState({ email: email, errorMessage: null })}
            value={this.state.email}
            floatOnFocus
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordRef.focus()}
          />
          <TextField
            ref={passwordRef => this.passwordRef = passwordRef}
            secureTextEntry={true}
            floatingPlaceholder
            floatingPlaceholderColor={{focus: 'white'}}
            placeholder='Password'
            color='#C0C0C0'
            underlineColor={{default: '#C0C0C0', focus: 'white'}}
            onChangeText={password => this.setState({ password: password, errorMessage: null })}
            value={this.state.password}
            floatOnFocus
            returnKeyType="done"
            autoCorrect={false}
          />
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <Button
            label="Sign In"
            color='white'
            onPress={this._handleLogin}
            style={{marginTop: 40}}
            disabled={!this.state.password.length || !this.state.email.length}
          />
        </View>
        <Button
          label="Don't have an account? Register here"
          link={true}
          onPress={this._showSignUpPage}
        />
        <Button
          style={{marginTop: 20}}
          label="Forgot password?"
          link={true}
          onPress={this._showForgotPasswordPage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 210,
    marginTop: 50,
    resizeMode: 'contain'
  },
  formContainer: {
    marginTop: 50,
    marginBottom: 75,
    width: 300
  }
})

AppRegistry.registerComponent('CollateralsApp', () => LoginScreen);
