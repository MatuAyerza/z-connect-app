import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { styles, buttons } from "../styles/styles";

class Card extends Component{
  constructor(props){
    super(props)
    this.state = {
    };
  }

  recycleRotation = new Animated.Value(0)
  
  restoreHandler = () => {
    Animated.timing(this.recycleRotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(this.delayRestoration);
  }
  
  delayRestoration = () => {
    setTimeout(() => {
      this.props.restoreCard(this.props.id);
    }, 500);
  }
  
  recycleSpin = this.recycleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  recycleCheckSpin = this.recycleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  deleteRotation = new Animated.Value(0)

  deleteHandler = () => {
    Animated.timing(this.deleteRotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(this.delayDeletion);
  }

  delayDeletion = () => {
    setTimeout(() => {
      this.props.permanentDelete(this.props.id);
    }, 500);
  }
  
  deleteSpin = this.deleteRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  deleteCheckSpin = this.deleteRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });
  
  render(){ 
    return (
      <React.Fragment>
        <Animated.View style={[styles.card, styles.restoredCard, {transform: [{rotateX: this.recycleCheckSpin}], backfaceVisibility: 'false'}]}>
          <Text style={styles.headerText}>Card Restored!</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.deletedCard, {transform: [{rotateY: this.deleteCheckSpin}], backfaceVisibility: 'false'}]}>
          <Text style={styles.headerText}>Card Deleted!</Text>
        </Animated.View>
        <Animated.View style={[styles.card, {transform: [{rotateX: this.recycleSpin}, {rotateY: this.deleteSpin}], backfaceVisibility: 'false'}]}>
          <React.Fragment>
            <TouchableOpacity onPress={()=>{this.restoreHandler(this.props.id);}} style={buttons.restoreButton}>
              <Text style={styles.whiteText}>Restore</Text>
            </TouchableOpacity>
            <Image source={{uri: this.props.userInfo.picture.large}} style={styles.profileImage}/>
            <Text>{this.props.userInfo.name.first} {this.props.userInfo.name.last}</Text>
            <Text>Email: {this.props.userInfo.email}</Text>
            <Text>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</Text>
            <View style={styles.cardButtonWrapper}>
              <TouchableOpacity style={buttons.redCardButton} onPress={()=>{this.deleteHandler(this.props.id)}}>
                <Text style={styles.whiteText}>Permamently Delete</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        </Animated.View>
      </React.Fragment>
    );
  }
}
export default Card