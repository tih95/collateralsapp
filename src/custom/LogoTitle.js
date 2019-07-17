import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text } from 'react-native-ui-lib';

export default class LogoTitle extends Component {
  render() {
    return (
      <View style={styles.logo}>
        <Image
          source={require('../../assets/img/collateralsLogo.png')}
          style={{width: 30, height: 30}}
        />
        <Text style={styles.text}>Collaterals 2019</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    flexDirection: 'row',
    padding: 15
  },
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '100',
    paddingLeft: 5
  }
})
