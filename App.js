import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import app from './appId.js'

export default class App extends React.Component {

  componentDidMount() {
    this._getStore().done()
  }
  _signFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(app, {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    
   this.storage(response)
  }
  }

storage = async (val) => {
  let value = await val.json()
  let store = await AsyncStorage.setItem('User', value.name)
}

_getStore = async () => {
  let value = await AsyncStorage.getItem('User')
  console.log(value)
}
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._signFacebook}>
          <Text>Sign-In with Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
