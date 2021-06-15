import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, TextInput, TouchableOpacity, View, Text, Image, Modal} from 'react-native';
import { styles, buttons, menuStyles } from "../styles/styles"; 
import { loadUserData } from "../api/userData"

export default class LoadCards extends Component {
  constructor() {
    super();
    this.state = {
      originalUserList: [],
      userList: [],
      number: 20,
      showModal: false
    };
  }

  getCards = async(number) => {
    let results = await loadUserData(number)
    let jsonString = JSON.stringify(results);
    AsyncStorage.setItem("@userList", jsonString);
    return this.setState({ showModal: true });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  navigateToView = () => {
    this.hideModal()
    return this.props.navigation.navigate("View Cards", { list: "@userList" });
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
          <TouchableOpacity style={buttons.filterButton} onPress={()=>{this.getCards(this.state.number)}}>
            <Text style={styles.whiteText}>Load Cards</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={this.state.showModal} transparent={true} onRequestClose={this.hideModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity style={buttons.deleteButton} onPress={this.hideModal}>
                <Text style={styles.whiteText}>X</Text>
              </TouchableOpacity>
              <Text>{this.state.number} cards have been loaded</Text>
              <TouchableOpacity style={buttons.modalButton} onPress={this.navigateToView}>
                <Text style={styles.whiteText}>View More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}