import React,{useState,useEffect} from "react";
import { Animated,View,Text,Image, TouchableWithoutFeedback ,StyleSheet,Dimensions} from "react-native";

const PostBottomSticky = ({increaseFont,decreaseFont,postComment,postShare}) =>{
  const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.tabView}>
            <View style={{flexDirection:"row", alignItems:"center",width:"100%", justifyContent:"space-evenly",}}>
            <TouchableWithoutFeedback onPress={(e)=>increaseFont()}>
            <Image  source={require("../assets/other/fontsplusla.png")} style={{flex: .35, aspectRatio:2.8,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>decreaseFont()}>
            <Image  source={require("../assets/other/fontminusla.png")} style={{flex: .35, aspectRatio:2.8,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>postComment()}>
            <Image  source={require("../assets/other/messegela.png")} style={{flex: .35, aspectRatio:2.8,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>postShare()}>
            <Image  source={require("../assets/other/sharela.png")} style={{flex: .35, aspectRatio:2.8,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    tabView:{
        width:"100%",
        height: 55,
        
        paddingVertical:4,
        flexDirection:"row",
        flex: 1,
        position: "absolute",
        justifyContent: "center",
        bottom: 60,
        zIndex: 1,
        backgroundColor:'#b79972',


    }
})


export default PostBottomSticky;