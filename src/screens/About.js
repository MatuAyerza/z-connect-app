import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { styles } from "../styles/styles";

export default class About extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.safeArea, styles.aboutItems]}>
        <Text style={styles.whiteText}>Matias Ayerza</Text>
        <Text style={styles.whiteText}>Jim Rattagan</Text>
        <Text style={styles.whiteText}>Juan Martin Lucioni</Text>
      </View>
    );
  }
}