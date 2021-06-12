import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { styles, buttons, menuStyles } from "../styles/styles";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style='light' backgroundColor='black' />
        <Image source={require("@assets/img/logo.png")} style={menuStyles.image} resizeMethod='resize' resizeMode='center'/>
        <View style={menuStyles.menuContainer}>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('Load Cards')}>
            <Text>Import Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('View Cards')}>
            <Text>View Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('Filter')}>
            <Text>Filter/Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('Recycle')}>
            <Text>Recylce Bin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton} onPress={() => this.props.navigation.navigate('About')}>
            <Text>About</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}