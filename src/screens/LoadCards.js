import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, TextInput, TouchableOpacity, View, Text, Image} from 'react-native';
import { styles, buttons, menuStyles } from "../styles/styles"; 
import { loadUserData } from "../api/userData"

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
  }
  render() {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerItems]}>
        <Image source={require("@assets/img/logo.png")} style={[menuStyles.image, styles.forceTop]} resizeMethod='resize' resizeMode='center'/>
        <View style={styles.filterWrapper}>
          <View style={styles.inputWrapper}>
            <Text>Number of Cards</Text>
            <TextInput style={styles.inputField} placeholder= "Enter number of cards" keyboardType="number-pad" onChangeText={(number) => this.setState({ number: number })}></TextInput>
          </View>
          <TouchableOpacity style={buttons.filterButton} onPress={()=>{this.getCards(this.state.number)}}>
            <Text style={styles.whiteText}>Load Cards</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}