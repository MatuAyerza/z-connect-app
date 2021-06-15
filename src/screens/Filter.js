import React, { Component } from 'react';
import { AsyncStorage, Text, SafeAreaView, TextInput, TouchableOpacity, View, Image} from 'react-native';
import { buttons, styles, menuStyles } from "../styles/styles";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUserList: [],
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
        originalUserList: parsedUserList,
      });
    } catch (error) {
      console.error(error);
    }
  };
  filterCards = () => {
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
    AsyncStorage.setItem("@filterList", stringFilteredCards);
    return this.props.navigation.navigate("View Cards", { list: "@filterList" });
  };

  render() {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerItems]}>
        <Image source={require("@assets/img/logo.png")} style={[menuStyles.image, styles.forceTop]} resizeMethod='resize' resizeMode='center'/>
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