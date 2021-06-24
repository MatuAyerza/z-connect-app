import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import { buttons, styles } from "../styles/styles";
import Card from '../components/DeletedCard'
export default class Recycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      activity: false,
      showModal: false,
    };
  }

  restoreCard = async (idToRestore) => {
    try{
      let restoreList = await AsyncStorage.getItem("@userList");
      let parsedRestoreList = restoreList != null ? JSON.parse(restoreList) : [];
      let userListAsync = this.state.userList.filter(
        (user) => user.login.uuid == idToRestore
      );
      parsedRestoreList.push(userListAsync[0])
      let restoreString = JSON.stringify(parsedRestoreList);
      await AsyncStorage.setItem("@userList", restoreString);
      let userList = this.state.userList.filter(
        (user) => user.login.uuid !== idToRestore
      );
      let jsonString = JSON.stringify(userList);
      await AsyncStorage.setItem("@recycleList", jsonString);
      this.setState({
        userList: userList,
      });
    }
    catch (error) {
      console.error(error);
    }
  };

  restoreAll = async () => {
    try {
      let restoreList = await AsyncStorage.getItem("@userList");
      let parsedRestoreList = restoreList != null ? JSON.parse(restoreList) : [];
      if (this.state.userList.length !== 0) {
        this.state.userList.forEach((user) => {
          parsedRestoreList.push(user);
        });
        let restoreString = JSON.stringify(parsedRestoreList);
        await AsyncStorage.setItem("@userList", restoreString);
        this.setState({
          userList: [],
        });
        await AsyncStorage.removeItem("@recycleList");
        return Alert.alert("Cards Restored", "All cards have been restored");
      } else {
        return Alert.alert("No Cards To Restore", "There are no cards left to restore");
      }
    } catch (error) {
      console.error(error);
    }
  }

  permanentDelete = async (idToDelete) => {
    try {
      let userList = this.state.userList.filter(
        (user) => user.login.uuid !== idToDelete
      );
      this.setState({
        userList: userList,
      });
      let deletedData = JSON.stringify(userList);
      await AsyncStorage.setItem("@recycleList", deletedData);
    } catch (error) {
      console.error(error);
    }
  }
  
  componentDidMount() {
    this.getCards(this.props.route.params.list);
  }

  getCards = async (list) => {
    try {
      this.setState({ activity: true });
      let userList = await AsyncStorage.getItem(list);
      this.setState({activity: !this.state.activity})
      let parsedUserList = userList != null ? JSON.parse(userList) : [];
      return this.setState({
        userList: parsedUserList,
        activity: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  extractor = (item, idx) => {
    return idx.toString();
  };

  renderItem = ({ item }) => (
    <Card key={item.login.uuid} userInfo={item} id={item.login.uuid} restoreCard={this.restoreCard} permanentDelete={this.permanentDelete} />
  );

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        {this.state.activity
        ? <ActivityIndicator 
            size={80}
            color='#2196F3'
          />
        : 
        <React.Fragment>
          <FlatList
            data={this.state.userList}
            renderItem={this.renderItem}
            keyExtractor={this.extractor}
            contentContainerStyle={styles.cardContainer}
            ></FlatList>
          <TouchableOpacity style={[buttons.restoreAllButton, styles.centerItems]} onPress={this.restoreAll}>
            <Text style={[styles.whiteText, styles.centerText]}>Restore All</Text>
          </TouchableOpacity>
        </React.Fragment>
        }
      </SafeAreaView>
    );
  }
}