import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error1) => {
        console.log(error1.code);
        console.log(error1.message);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch((error2) => {
            console.log(error2.code);
            console.log(error2.message);
              this.setState({ error: error2.message, loading: false });
          });
      });
  }

onLoginSuccess() {
  this.setState({
    error: '',
    loading: false,
    email: '',
    password: '' });
}

onLoginFail(error) {
  console.log(error.code);
  console.log(error.message);
    this.setState({ error: error.message, loading: false });
}

renderButton() {
  if (this.state.loading) {
    return <Spinner size="small" />;
  }
  return (<Button onPress={this.onButtonPress.bind(this)}>LogIn</Button>);
}

  render() {
    return (
      <Card>
          <CardSection >
            <Input
              label="Email"
              autoCorrect={false}
              placeholder="user@gmail.com"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </CardSection>
          <CardSection >
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </CardSection>
          <Text style={styles.errorTextSytle}>{this.state.error}</Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextSytle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


export default LoginForm;
