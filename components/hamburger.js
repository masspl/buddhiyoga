import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Hamburger({navigation,resetFunction,infoFunction,resetStatus,magicStatus,howtoplayFunction}){

    return(
        <View style={{borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',height: 55,width:"100%",marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:'#D5C0A4'}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-evenly"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.toggleDrawer()}>
                <Icon name="bars" size={25} color="#582c24" style={{paddingHorizontal:10}} />
            </TouchableWithoutFeedback>
            <View style={{}}>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{width: 115, height: 40}} />
        </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"10%"}}></View>
            {
                resetStatus &&
            
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"40%",alignItems: 'center'}}>
                {/* info icons */}
                <TouchableWithoutFeedback onPress={(e)=>{resetFunction(e)}}>
                <Image source={require("../assets/other/reset1.png")} style={{width: 35, height: 35, opacity: 1}} />
                </TouchableWithoutFeedback>
                {
                    magicStatus ?
                    <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}}>
                    <Image source={require("../assets/other/magic.png")} style={{width: 45, height: 45, opacity: 1}} />
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}} disabled>
                    <Image source={require("../assets/other/magic.png")} style={{width: 45, height: 45, opacity: 0.4}} />
                    </TouchableWithoutFeedback>
                }
                
                <TouchableWithoutFeedback onPress={(e)=>{howtoplayFunction(e)}}>
                <Image source={require("../assets/other/helpc.png")} style={{width: 35, height: 35}} />
                </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}}>
                <Image source={require("../assets/other/recentmoves1.png")} style={{width: 28, height: 28}} />
                </TouchableWithoutFeedback> */}
            </View>
            }
        </View>
        
        
    )
}

export default Hamburger;