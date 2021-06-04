import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button} from 'react-native';
import { styles, buttons } from "../../assets/styles/styles"; 
import {loadUserData} from "../../assets/api/userData"

export default class LoadCards extends Component {
  constructor() {
    super();
    this.state = {
      originalUserList: [],
      userList: [],
      number: 20,
    };
  }
  getCards = async(number) => {
    let results = await loadUserData(number)
    let jsonString = JSON.stringify(results);
    AsyncStorage.setItem("@userList", jsonString);
    console.log(results);
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style='light' backgroundColor='black'/>
        <TextInput placeholder= "Enter number of cards" keyboardType="number-pad" onChangeText={(number) => this.setState({ number: number })}></TextInput>
        <Button title="Load cards" onPress={()=>{this.getCards(this.state.number)}}></Button>
      </SafeAreaView>
    );
  }
}