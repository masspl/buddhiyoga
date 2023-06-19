import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import NetInfo from "@react-native-community/netinfo";
function MagicComponentHeader({navigation, getstorageData,status}){
    const [netStatus,setNetStatus] =React.useState(false);
    React.useEffect(() => {
            NetInfo.fetch().then(async (state) => {
                if(state.isConnected)
                {
                    setNetStatus(true)
                }
            })
    })
    return(
        <View style={{width:"100%",height: 70,borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:"#D5C0A4", paddingHorizontal: 10}}>
           <View style={{flexDirection:"row", alignItems:"center",width:"100%", justifyContent:"center", position: 'relative'}}>
             <View style={{position: 'absolute', zIndex: 9999,}}>
                {
                    netStatus?
                    (status?
                    <TouchableWithoutFeedback onPress={()=>getstorageData()}>
                        <Image  source={require("../assets/other/booksla.png")} style={{width: 40, height: 40}} />
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={()=>getstorageData()} disabled>
                        <Image  source={require("../assets/other/booksla.png")} style={{width: 40, height: 40,opacity:0.3}} />
                    </TouchableWithoutFeedback>)
                    :
                    <Image  source={require("../assets/other/booksla.png")} style={{width: 40, height: 40,opacity:0.3}} />
                }
            </View>
             <View style={{position: 'absolute', right: 5}}>
             <TouchableWithoutFeedback onPress={()=>navigation.goBack(null)}>
            <Image  source={require("../assets/other/crossla.png")} style={{width: 30, height: 30, opacity: .8}} />
            </TouchableWithoutFeedback>
            </View>
             </View>
             
        </View>
        
        
    )
}

export default MagicComponentHeader;