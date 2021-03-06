import React, { Component } from 'react';
import { AsyncStorage, Text, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import { buttons, styles } from "../styles/styles";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      nameHandler: "",
      lastNameHandler: "",
      ageHandler: "",
    };
  }

  componentDidMount() {
    this.getCards();
  }

  getCards = async () => {
    try {
      this.setState({ activity: !this.state.activity });
      let userList = await AsyncStorage.getItem("@userList");
      let parsedUserList = userList != null ? JSON.parse(userList) : null;

      return this.setState({
        userList: parsedUserList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  filterCards = async () => {
    try {
      let filterName = this.state.nameHandler;
      let filterLast = this.state.lastNameHandler;
      let filterAge = this.state.ageHandler;
      let filteredCards = this.state.userList.filter((user) => {
        if (filterAge !== "") {
          return (
            user.name.first.toLowerCase().includes(filterName.toLowerCase()) &&
            user.name.last.toLowerCase().includes(filterLast.toLowerCase()) &&
            user.dob.age == filterAge
          );
        } else {
          return (
            user.name.first.toLowerCase().includes(filterName.toLowerCase()) &&
            user.name.last.toLowerCase().includes(filterLast.toLowerCase())
          );
        }
      });
      let stringFilteredCards = JSON.stringify(filteredCards);
      await AsyncStorage.setItem("@filterList", stringFilteredCards);
      return this.props.navigation.navigate("View Cards", {list: "@filterList",});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerItems]}>
        <View style={styles.filterHeader}>
          <Text style={styles.headerText}>Filter Cards</Text>
        </View>
        <View style={styles.filterWrapper}>
          <View style={styles.inputWrapper}>
            <Text>Enter First Name</Text>
            <TextInput style={styles.inputField} onChangeText={(text) => this.setState({ nameHandler: text })} placeholder='First Name'></TextInput>
          </View>
          <View style={styles.inputWrapper}>
            <Text>Enter Last Name</Text>
            <TextInput style={styles.inputField} onChangeText={(text) => this.setState({ lastNameHandler: text })} placeholder='Last Name'></TextInput>
          </View>
          <View style={styles.inputWrapper}>
            <Text>Enter Age</Text>
            <TextInput style={styles.inputField} keyboardType='number-pad' onChangeText={(text) => this.setState({ ageHandler: text })} placeholder='Age'></TextInput>
          </View>
          <TouchableOpacity onPress={this.filterCards} style={buttons.filterButton}>
            <Text style={styles.whiteText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}