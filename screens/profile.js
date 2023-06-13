import React from "react";
import { View,Text,StyleSheet,SafeAreaView } from "react-native";
import Hamburger from '../components/hamburger';
import ProfileManagement from "../components/ProfileManagement";
import Register from "../components/Register";

function Profile(props){
    console.log(props);
    
    const resetGame=(e)=>{
        setGameState(1);
      }
      const about=(e)=>{
        alert("about game");
    
      }

      
    return (
        <>
        <SafeAreaView>
        <Hamburger navigation={props.navigation} resetFunction={resetGame} resetStatus={false} infoFunction={about}/>
        <View style={styles.mains}>
            <View >
                {/* <Text>Register</Text> */}
                {/* <ProfileManagement /> */}

                <Register postId={props.route.params!=undefined ? props.route.params.postId:undefined} navigation={props.navigation}/>
            </View>
           
        </View>
        </SafeAreaView>
        </>
    )
}
export default Profile;

const styles = StyleSheet.create({
    mains:{
        paddingHorizontal: 15,
        backgroundColor: 'rgba(183,153,114,0.25)',
        height: '100%',
    }
})