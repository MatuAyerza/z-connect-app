import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, Animated, Alert, AsyncStorage } from 'react-native';
import { styles, menuStyles } from "../styles/styles";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      disabled: true,
      style: menuStyles.menuButtonInactive,
    };
  }

  rotationValue = new Animated.Value(0);
  filterRotationValue = new Animated.Value(0)
  recycleRotationValue = new Animated.Value(0)

  getCards = async () => {
    try {
      let userList = await AsyncStorage.getItem("@userList");
      let parsedUserList = userList != null ? JSON.parse(userList) : null;
      if (parsedUserList != null) {
        return this.setState({
          disabled: false,
          userList: parsedUserList,
          style: menuStyles.menuButton,
        });
      } else {
        return this.setState({
          disabled: true,
          style: menuStyles.menuButtonInactive,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  noCardsAlert = () => {
    Alert.alert("No Cards Loaded", "No cards have been imported", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Go to Import Cards",
        onPress: () => this.props.navigation.navigate("Load Cards"),
      },
    ]);
  }

  viewCardsHandler = () => {
    if (this.state.disabled == false) {
      this.props.navigation.navigate("View Cards", { list: "@userList" });
    } else {
      this.rotationValue.setValue(0);
      Animated.timing(this.rotationValue, {
        toValue: 8,
        duration: 250,
        useNativeDriver: true,
      }).start(this.noCardsAlert);
    }
  };

  filterHandler = () => {
    if (this.state.disabled == false) {
      this.props.navigation.navigate("Filter");
    } else {
      this.filterRotationValue.setValue(0);
      Animated.timing(this.filterRotationValue, {
        toValue: 8,
        duration: 250,
        useNativeDriver: true,
      }).start(this.noCardsAlert);
    }
  };

  recycleHandler = () => {
    if (this.state.disabled == false) {
      this.props.navigation.navigate("Recycle", { list: "@recycleList" });
    } else {
      this.recycleRotationValue.setValue(0);
      Animated.timing(this.recycleRotationValue, {
        toValue: 8,
        duration: 250,
        useNativeDriver: true,
      }).start(this.noCardsAlert);
    }
  };

  viewSpin = this.rotationValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: ["0deg", "30deg", "0deg", "-30deg", "0deg", "30deg", "0deg", "-30deg", "0deg"],
  });

  filterSpin = this.filterRotationValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: ["0deg", "30deg", "0deg", "-30deg", "0deg", "30deg", "0deg", "-30deg", "0deg"],
  });

  recycleSpin = this.recycleRotationValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: ["0deg", "30deg", "0deg", "-30deg", "0deg", "30deg", "0deg", "-30deg", "0deg"],
  });

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCards();
    })
  }

  componentWillUnmount() {
    this._unsubscribe()
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Image source={require("@assets/img/logo.png")} style={menuStyles.image} resizeMethod='resize' resizeMode='center'/>
        <View style={menuStyles.menuContainer}>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('Load Cards')}>
            <Text>Import Cards</Text>
          </TouchableOpacity>
          <Animated.View style={[{transform: [{rotate: this.viewSpin }], height: 100, width: '40%'}]}>
            <TouchableOpacity onPress={this.viewCardsHandler} style={[this.state.style, {width: '100%'}]}>
                <Text style={styles.whitetext}>View Cards</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[{transform: [{rotate: this.filterSpin }], height: 100, width: '40%'}]}>
            <TouchableOpacity onPress={this.filterHandler} style={[this.state.style, {width: '100%'}]}>
                <Text style={styles.whitetext}>Filter/Search</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[{transform: [{rotate: this.recycleSpin }], height: 100, width: '40%'}]}>
            <TouchableOpacity onPress={this.recycleHandler} style={[this.state.style, {width: '100%'}]}>
                <Text style={styles.whitetext}>Recycle Bin</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('About')}>
            <Text>About</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}