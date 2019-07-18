/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {  createSwitchNavigator,
          createStackNavigator,
          createAppContainer } from 'react-navigation';

import LogoTitle from './src/custom/LogoTitle';


// Screens
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SpeakersScreen from './src/screens/SpeakersScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import AccountScreen from './src/screens/AccountScreen';
import QRReaderScreen from './src/screens/QRReaderScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SpeakerPage from './src/screens/SpeakerPage';
import HomeScreen from './src/screens/HomeScreen';
import SponsorsScreen from './src/screens/SponsorsScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    SpeakerList: SpeakersScreen,
    Speaker: SpeakerPage,
    Schedule: ScheduleScreen,
    CheckIn: QRReaderScreen,
    AccountInfo: AccountScreen,
    EditProfile: EditProfileScreen,
    Settings: SettingsScreen,
    Sponsors: SponsorsScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#37474F'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    }
  }
)

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRoute: 'Login'
  }
)

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRoute: 'AuthLoading'
  }
));

export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}
