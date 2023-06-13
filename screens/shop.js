import React from "react";
import Hamburger from '../components/hamburger';
import { View,Text,StyleSheet,SafeAreaView,Linking, TouchableWithoutFeedback, Dimensions} from "react-native";
import {SHOP_URL} from "@env";
function Shop({navigation}) {
const {width, height}= Dimensions.get('window');



    const resetGame=(e)=>{
        setGameState(1);
      }
      const about=(e)=>{
        alert("about game");
    
      }

    return ( 
        <>
        <SafeAreaView style={{width: width,height: height,flex: 1, flexDirection: "column",justifyContent: 'space-between', backgroundColor: 'rgba(183,153,114,0.25)'}}>
        <Hamburger navigation={navigation} resetFunction={resetGame} resetStatus={false} infoFunction={about}/>
        <View style={styles.mains}>
        <TouchableWithoutFeedback onPress={()=>{Linking.openURL(SHOP_URL)}}>
           <Text style={{fontStyle:"normal",fontWeight:"bold",fontSize:17,textAlign: 'center', color: '#fff',backgroundColor: "rgba(88, 44, 36,1)", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20}}>Click here to visit the SHOP page</Text>
           </TouchableWithoutFeedback>
        </View>
        </SafeAreaView>
        </>
        );
}
const styles = StyleSheet.create({
    mains:{
      paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
        
    }
})

export default Shop;