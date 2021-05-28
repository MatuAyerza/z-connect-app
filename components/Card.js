import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { styles, buttons } from "../assets/styles/styles";

class Card extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDisplay: 0,
      nextDisplay: "230px",
      buttonText: "More",
      nextText: "Less",
    };
  }

  viewMore() {
    this.setState({
      currentDisplay: this.state.nextDisplay,
      nextDisplay: this.state.currentDisplay,
      buttonText: this.state.nextText,
      nextText: this.state.buttonText,
    });
  }

  render(){ 
  return (
      <View style={styles.card}>
        <TouchableOpacity onPress={()=>{this.props.deleteCard(this.props.id)}} style={buttons.deleteButton}>
          <Text style={styles.whiteText}>X</Text>
        </TouchableOpacity>
        <Text>{this.props.userInfo.name.first} {this.props.userInfo.name.last}</Text>
        <Text>Email: {this.props.userInfo.email}</Text>
        <Text>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</Text>
        {/* <h3>{this.props.userInfo.name.first + " " +this.props.userInfo.name.last}</h3>
        <img
          className='user-image'
          src= {this.props.userInfo.picture.medium}
          alt={this.props.userInfo.name.first + " " +this.props.userInfo.name.last}
        />
        <p>Email: {this.props.userInfo.email}</p>
        <p>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</p>
        <div className='view-more-wrapper' id='view-more-wrapper' style={{height: this.state.currentDisplay}}>
          <p>Phone: {this.props.userInfo.phone}</p>
          <p>Address: {this.props.userInfo.location.street.name} {this.props.userInfo.location.street.number}</p>
          <p>City: {this.props.userInfo.location.city}, {this.props.userInfo.location.state} ({this.props.userInfo.location.postcode})</p>
          <p>Country: {this.props.userInfo.location.country}</p>
          <p>Register Date: {this.props.userInfo.registered.date.substring(0,10)}</p>
        </div>
        <button className='blue-button' id={'view-more-button-' + this.props.id} onClick={()=>{this.viewMore()}}>View {this.state.buttonText}</button> */}
      </View>
    );
}
}
export default Card