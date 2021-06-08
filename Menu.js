import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { styles, buttons, menuStyles } from "./src/styles/styles";

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
          <TouchableOpacity style={menuStyles.menuButton}>
            <Text>Import Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton}>
            <Text>View Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton}>
            <Text>Filter/Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton}>
            <Text>Recylce Bin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuStyles.menuButton}>
            <Text>About</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}