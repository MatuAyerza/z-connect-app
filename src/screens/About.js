import React, { Component } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { styles, menuStyles } from "../styles/styles";

export default class About extends Component {
  constructor() {
    super();
    this.state = {};
  }

  clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerItems]}>
        <Image source={require("@assets/img/logo.png")} style={menuStyles.image} resizeMethod='resize' resizeMode='center'/>
        <View style={styles.aboutItems}>
          <Text style={[styles.whiteText, styles.centerText]}>Z-Connect is an app that lets you load, view and comment user cards</Text>
          <Text style={styles.whiteText}>Developed by</Text>
          <Text style={styles.whiteText}>Matias Ayerza</Text>
          <Text style={styles.whiteText}>Jim Rattagan</Text>
          <Text style={styles.whiteText}>Juan Martin Lucioni</Text>
          <TouchableOpacity style={menuStyles.menuButton} onPress={this.clearAppData}>
            <Text>Delete Data</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}