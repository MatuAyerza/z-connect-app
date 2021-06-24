import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image, Modal, TextInput, Animated} from 'react-native';
import { styles, buttons } from "../styles/styles";

class Card extends Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      comment: '',
      showCommentModal: false,
      showData: true
    };
  }

  height = new Animated.Value(1)

  deleteHandler = (idToDelete) => {
    this.setState({showData: false})
    Animated.timing(this.height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start(()=> {this.props.deleteCard(idToDelete);})
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  showCommentModal = () => {
    this.setState({
      showCommentModal: true
    })
  }

  hideCommentModal = () => {
    this.setState({
      showCommentModal: false
    })
  }

  commentHandler = () => {
    this.props.commentCard(this.props.id, this.state.comment);
    this.hideCommentModal()
  }
  
  render(){ 
  return (
      <Animated.View style={[styles.card, {transform: [{scaleY: this.height }]}]}>
        {this.state.showData &&
        <React.Fragment>
          <TouchableOpacity onPress={()=>{this.deleteHandler(this.props.id)}} style={buttons.deleteButton}>
            <Text style={styles.whiteText}>X</Text>
          </TouchableOpacity>
          <Image source={{uri: this.props.userInfo.picture.large}} style={styles.profileImage}/>
          <Text>{this.props.userInfo.name.first} {this.props.userInfo.name.last}</Text>
          <Text>Email: {this.props.userInfo.email}</Text>
          <Text>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</Text>
          <View style={styles.cardButtonWrapper}>
            <TouchableOpacity style={buttons.cardButton} onPress={this.showModal}>
              <Text style={styles.whiteText}>View More</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.cardButton} onPress={this.showCommentModal}>
              <Text style={styles.whiteText}>Edit Contact</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={this.state.showModal} transparent={true} animationType='slide' onRequestClose={this.hideModal}>
            <View style={styles.viewMoreModalContainer}>
                <View style={styles.viewMoreModal}>
                  <TouchableOpacity style={buttons.deleteButton} onPress={this.hideModal}>
                    <Text style={styles.whiteText}>X</Text>
                  </TouchableOpacity>
                  <Image source={{uri: this.props.userInfo.picture.large}} style={styles.profileImage}/>
                  <Text>{this.props.userInfo.name.first} {this.props.userInfo.name.last}</Text>
                  <Text>Email: {this.props.userInfo.email}</Text>
                  <Text>Birthday: {this.props.userInfo.dob.date.substring(0,10)} (Age: {this.props.userInfo.dob.age})</Text>
                  <Text>Phone: {this.props.userInfo.phone}</Text>
                  <Text>Address: {this.props.userInfo.location.street.name} {this.props.userInfo.location.street.number}</Text>
                  <Text>City: {this.props.userInfo.location.city}, {this.props.userInfo.location.state} ({this.props.userInfo.location.postcode})</Text>
                  <Text>Country: {this.props.userInfo.location.country}</Text>
                  <Text>Register Date: {this.props.userInfo.registered.date.substring(0,10)}</Text>
                  <Text>Comment: {this.props.userInfo.comment}</Text>
                  <TouchableOpacity style={buttons.cardButton} onPress={this.showCommentModal}>
                  <Text style={styles.whiteText}>Add Comment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal visible={this.state.showCommentModal} transparent={true} animationType='fade' onRequestClose={this.hideCommentModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modal}>
                  <TouchableOpacity style={buttons.deleteButton} onPress={this.hideCommentModal}>
                    <Text style={styles.whiteText}>X</Text>
                  </TouchableOpacity>
                  <View style={styles.inputWrapper}>
                    <Text>Enter Comment</Text>
                    <TextInput style={styles.inputField} onChangeText={(text) => {this.setState({comment: text})}} placeholder="Comment"/>
                  </View>
                  <TouchableOpacity style={styles.inputField} style={buttons.modalButton} onPress={this.commentHandler}>
                    <Text style={styles.whiteText} >Add Comment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </React.Fragment>}
      </Animated.View>
    );
}
}
export default Card