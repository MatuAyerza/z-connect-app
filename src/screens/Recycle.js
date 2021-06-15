import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, SafeAreaView, FlatList, Button} from 'react-native';
import { styles } from "../styles/styles";
import Card from '../components/Card'

export default class Recycle extends Component {
  constructor() {
    super();
    this.state = {
      originalUserList: [],
      userList: [],
      cards: [],
      activity: false,
      showModal: false,
      modalItem: [],
      modalItemExists: false
    };
  }

  deleteCard = (idToDelete) => {
    // Cambiar a async y que mande a recycle bin list
    let userList = this.state.cards.filter(
      (user) => user.login.uuid !== idToDelete
    );
    this.setState({
      cards: userList,
    });
  };

  componentDidMount() {
    
  }
  getCards = async () => {
    try {
      this.setState({ activity: !this.state.activity });
      let userList = await AsyncStorage.getItem("@userList");
      let parsedUserList = userList != null ? JSON.parse(userList) : null;
      return this.setState({
        cards: parsedUserList,
        userList: parsedUserList,
        originalUserList: parsedUserList,
        activity: !this.state.activity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  extractor = (item, idx) => {return idx.toString()};

  renderItem = ({ item }) => 
    (<Card key={item.login.uuid}
      userInfo={item}
      id={item.login.uuid}
      deleteCard={this.deleteCard}
    />);


  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={this.state.cards}
          renderItem={this.renderItem}
          keyExtractor={this.extractor}
          contentContainerStyle={styles.cardContainer}
        ></FlatList>
        <Button title="Show Cards" onPress={this.getCards}> </Button>
      </SafeAreaView>
    );
  }
}