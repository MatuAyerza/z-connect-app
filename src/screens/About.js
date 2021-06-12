import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, SafeAreaView, FlatList, Button} from 'react-native';
import { styles, buttons } from "../styles/styles";
import Card from '../components/Card'

export default class About extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Matias Ayerza</Text>
        <Text>Jim Rattagan</Text>
        <Text>Juan Martin Lucioni</Text>
      </View>
    );
  }
}