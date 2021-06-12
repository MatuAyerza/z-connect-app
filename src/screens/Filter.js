import React, { Component } from 'react';
import { AsyncStorage, Text, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import { styles } from "../styles/styles";

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
      <SafeAreaView style={styles.safeArea}>
        <TextInput
          // style={styles.inputField}
          onChangeText={(text) => this.setState({ nameHandler: text })}
          placeholder='First Name'
        ></TextInput>
        <TextInput
          // style={styles.inputField}
          onChangeText={(text) => this.setState({ lastNameHandler: text })}
          placeholder='Last Name'
        ></TextInput>
        <TextInput
          // style={styles.inputField}
          keyboardType='number-pad'
          onChangeText={(text) => this.setState({ ageHandler: text })}
          placeholder='Age'
        ></TextInput>
        <TouchableOpacity onPress={this.filterCards}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}