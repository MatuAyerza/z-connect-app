import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {styles} from './assets/styles/styles'
import LoadCards from './src/screens/LoadCards'
import ViewCards from './src/screens/ViewCards'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Touchable, TouchableOpacity, Button, Platform, AsyncStorage } from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      cards: []
    };
  }

  render() {

    return (
      <ViewCards />
    );
  }
}