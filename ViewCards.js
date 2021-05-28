import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { styles, buttons } from "./assets/styles/styles";
import Card from './components/Card'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      originalUserList: [],
      userList: [],
    };
  }

  deleteCard = (idToDelete) => {
    // Cambiar a async y que mande a recycle bin list
    let userList = this.state.userList.filter(
      (user) => user.login.uuid !== idToDelete
    );
    this.setState({
      userList: userList,
    });
  };

  componentDidMount() {
    // Pasar a async storage y mover a pantalla import
    console.log('fetching');
    fetch("https://randomuser.me/api/?results=20")
      .then((r) => r.json())
      .then((resultado) => {
        this.setState({
          originalUserList: resultado.results,
          userList: resultado.results,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style='light' backgroundColor='black'/>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {this.state.userList.map((user, index) => {
            return (
              <Card
                key={user.login.uuid}
                userInfo={user}
                id={user.login.uuid}
                deleteCard={this.deleteCard}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}