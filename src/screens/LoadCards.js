import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, TextInput, TouchableOpacity, View, Text, ActivityIndicator, Alert} from 'react-native';
import { styles, buttons, menuStyles } from "../styles/styles"; 
import { loadUserData } from "../api/userData"

export default class LoadCards extends Component {
  constructor() {
    super();
    this.state = {
      originalUserList: [],
      userList: [],
      number: 20,
      showModal: false,
      activity: false,
    };
  }

  getCards = async (number) => {
    try {
      this.setState({activity: true})
      let results = await loadUserData(number)
      let jsonString = JSON.stringify(results);
      AsyncStorage.setItem("@userList", jsonString);
      this.setState({ activity: false });
      return Alert.alert(
        "Cards Loaded",
        this.state.number + " cards have been loaded",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "View Cards", onPress: () => this.props.navigation.navigate("View Cards", { list: "@userList" })},
        ]
      );
    } 
    catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerItems]}>
        <View style={styles.filterHeader}>
          <Text style={styles.headerText}>Load Cards</Text>
        </View>
        <View style={styles.filterWrapper}>
          <View style={styles.inputWrapper}>
            <Text>Number of Cards</Text>
            <TextInput style={styles.inputField} placeholder= "Enter number of cards" keyboardType="number-pad" onChangeText={(number) => this.setState({ number: number })}></TextInput>
          </View>
          {this.state.activity
          ? <ActivityIndicator 
            size={80}
            color='#2196F3'
          />
          : 
          <TouchableOpacity style={buttons.filterButton} onPress={()=>{this.getCards(this.state.number)}}>
            <Text style={styles.whiteText}>Load Cards</Text>
          </TouchableOpacity>
          }
        </View>
      </SafeAreaView>
    );
  }
}