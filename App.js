import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Google from "expo-google-app-auth";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { BASE_URL, ANDROID_DEV } from './src/config/Constants';
import { AsyncStorage } from 'AsyncStorage';

export default class App extends Component {
constructor(props){
  super(props)
  this.state = {
    login: false
  }

}

save = async (param) => {
  try {
    const key = await AsyncStorage.setItem(STORAGE_KEY, param)
  } catch (e) {
    console.error("Can't Load Key")
  }
}

logout = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  this.setState({login:false})
}


handleGoogleLogin = async () => {
    const googleToken = await signInWithGoogleAsync();
    socialLoginAsync("google-oauth2", googleToken, "", "")
      .then(json => {
        if (json.token !== undefined) {
          // this.save(json.token);
          this.setState({login:true})
          // console.log("Api token : ", json.token);
        } else {
          this.setState({ error: Object.values(json), password: "" });
          console.log("login-app App.js signInWithGoogleAsync Error:", json);
        }
      })
      .catch(error => {
        console.log("Google error : ", error);
      });
  };

  render(){
    return (
      <View style={styles.container}>
        { this.state.login ? 
        (<View style={styles.accountBox}>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={{ flexDirection: 'row' }}>
            <Text style={styles.accountText}>Logout</Text>
          </TouchableOpacity>
        </View>):
        (<View style={styles.accountBox}>
            <TouchableOpacity
              onPress={this.handleGoogleLogin}
              style={{ flexDirection: 'row' }}>
              <AntDesign
                name={'google'}
                size={20}
                style={{ color: 'black' }}
              />
              <Text style={styles.accountText}>Google</Text>
            </TouchableOpacity>
          </View>)
        }
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
  },accountBox: {
    flexDirection: 'row',
    marginTop: 10
  },
  accountText: {
    fontSize: 17,
    lineHeight: 19,
    color: 'black',
    paddingLeft: 10,
  },
  lineBox: {
    borderRightWidth: 2,
    marginHorizontal: 20
  }
});

async function socialLoginAsync(socialType, accessToken, firstName, lastName) {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      provider: socialType,
      access_token: accessToken,
      first_name: firstName,
      last_name: lastName
    })
  };

  try {
    const response = await fetch(
      BASE_URL + "rest-auth/social-login/",
      requestOptions
    );
    const json = await response.json();
    console.log("response", BASE_URL + "rest-auth/social-login/", json);
    return Promise.resolve(json);
  } catch (error) {
    console.log(`login-app App.js socialLoginAsync Error: ${error}`);
    return Promise.reject(error);
  }
}

async function signInWithGoogleAsync() {
  try {
    const { type, idToken, accessToken } = await Google.logInAsync({
      androidClientId: ANDROID_DEV,
      scopes: ["openid", "profile", "email"]
    });

    if (type === "success") {
      console.log("login-app App.js signInWithGoogleAsync Token:", accessToken);
      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.log(`login-app App.js signInWithGoogleAsync Error: ${error}`);
    return error;
  }
}