import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Spinner, Header, Card , CardSection} from './component/common';
import LoginForm from './component/LoginForm';


class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyAnuzz9LoeReqV1w5fmJh8i-a4E0i5Gw04',
        authDomain: 'auth-1a637.firebaseapp.com',
        databaseURL: 'https://auth-1a637.firebaseio.com',
        projectId: 'auth-1a637',
        storageBucket: 'auth-1a637.appspot.com',
        messagingSenderId: '531153733608'
      }
    );

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        } else {
        this.setState({ loggedIn: false });
      }
    });
}

onButtonPress() {
  firebase.auth().signOut();
}

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (<View style={{ flexDirection: 'row' }}>
                      <Button onPress={this.onButtonPress.bind(this)}>Logout</Button>
                  </View>
              );

      case false:
        return <LoginForm />;

      default:
          return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        { this.renderContent() }

      </View>
    );
  }
}

export default App;
