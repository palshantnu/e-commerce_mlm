import React, { useState } from "react";
import { Button, Text, View ,Modal,ScrollView,Dimensions} from "react-native";
import UseraddScreen from "../screens/UseraddScreen";


const ModalDialog = (props) => {
const {width,height}=Dimensions.get('window');
      
       

  return (
    <ScrollView>
    <View style={{height:height/2 }}>
    {/* <Button title="Show modal" onPress={toggleModal} /> */}

    <Modal
     visible={props.open}
    transparent={true}
    animationType={'fade'}
    // visible={props.open}
    onRequestClose={props.close()}
    >
      <View>
        <UseraddScreen/>

        {/* <Button title="Hide modal" onPress={toggleModal} /> */}
      </View>
    </Modal>
  </View></ScrollView>
  )
}

export default ModalDialog;