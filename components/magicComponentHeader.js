import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import NetInfo from "@react-native-community/netinfo";
function MagicComponentHeader({navigation, getstorageData,status,totalDays}){
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
                    <TouchableWithoutFeedback onPress={()=>alert("Please connect to internet...")}>
                    <Image  source={require("../assets/other/booksla.png")} style={{width: 40, height: 40,opacity:0.3}} />
                    </TouchableWithoutFeedback>
                }
            </View>
            <View style={{position: 'absolute', left: 5, borderColor: 'rgba(88, 44, 36,1)', borderWidth: 0.8, borderRadius: 7}}>
                <Text style={{ fontSize: 12, color: '#fff', backgroundColor: 'rgba(88, 44, 36,1)', paddingHorizontal: 10, paddingVertical: 2, borderTopLeftRadius: 7, borderTopRightRadius: 7}}>Days</Text>
                <Text style={{ fontSize: 17, color: 'rgba(88, 44, 36,1)', textAlign: 'center', }}>{totalDays}</Text>
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



