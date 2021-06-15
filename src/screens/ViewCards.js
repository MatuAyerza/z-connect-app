import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, FlatList, Button, ActivityIndicator} from 'react-native';
import { styles } from "../styles/styles";
import Card from '../components/Card'

export default class ViewCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalUserList: [],
      userList: [],
      activity: false,
      showModal: false,
      modalItem: [],
      modalItemExists: false,
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
    this.getCards(this.props.route.params.list);
  }
  getCards = async (list) => {
    try {
      this.setState({ activity: true });
      let userList = await AsyncStorage.getItem(list);
      this.setState({activity: !this.state.activity})
      let parsedUserList = userList != null ? JSON.parse(userList) : null;
      return this.setState({
        userList: parsedUserList,
        originalUserList: parsedUserList,
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
    <Card key={item.login.uuid} userInfo={item} id={item.login.uuid} deleteCard={this.deleteCard} />
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
        <FlatList
          data={this.state.userList}
          renderItem={this.renderItem}
          keyExtractor={this.extractor}
          contentContainerStyle={styles.cardContainer}
        ></FlatList>
        }
      </SafeAreaView>
    );
  }
}