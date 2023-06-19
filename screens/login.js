import React,{useState,useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Animated,
    Button,
    Easing,
    Text,
    TouchableWithoutFeedback,
  } from 'react-native';
  import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { handImage } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JSON_VALIDATE} from '@env';
const Login = () =>{
    const [isRotating, setRotation] = useState(true);
    const [rotateValueHolder,setRotateHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [fadeAnim] = useState(new Animated.Value(isRotating ? 1 : 1));
    // useEffect(()=>{
    //     // console.log(isRotating)
    //    if(isRotating==true)
    //    {
    //     startImageRotateFunction();
    //     stopincreaseLengthFunction();
    //     fadeOutView()
    //    }
    //    else
    //    {
    //     stopImageRotateFunction();
    //     increaseLengthFunction();
    //     fadeInView();
    //    }
    // },[isRotating]);
    const [jsonStatus,setJsonStatus]=useState(true);
    // useEffect(()=>{
    //     if(!jsonStatus)
    //         {
    //             updateJSONCcontent();
    //         }
    // },[jsonStatus]);

    const updateJSONCcontent = async ()=>{
        // var json_file =require('./assets/game/buddhiyogaEngine.json'); 
        // alert(json_file[json_file.length - 1].version);
        NetInfo.fetch().then(async (state) => {
            if(state.isConnected)
            {
            let data = {
                  method: 'POST',
                  credentials: 'same-origin',
                  mode: 'same-origin',
                  headers: {
                    'Accept':       'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Basic YnVkZGhpeW9nYTpHZEpSIDdYeFUgdHQ5YyBlSFZ2IFZCcnIgVHhEdg=='
                  },
                };
                let response=  fetch(JSON_VALIDATE,data)
                  .then(response => response.json()) 
                  .then(async(json) =>{
                    console.log(json);
                //    if(json.code===200){
                //     await AsyncStorage.removeItem('@bufferPlayerMove');
                //    }
                //    else if(json.code===-919){
                //     console.error('Error');
                //    }
                  })
                }
      });
    }
    const startImageRotateFunction = () =>{
       
        Animated.timing(rotateValueHolder,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: true 
        }).start()

    }
    const stopImageRotateFunction = () =>{
        Animated.timing(rotateValueHolder,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).stop();
    }

    const increaseLengthFunction = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const fadeInView = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(fadeAnim,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const fadeOutView = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(fadeAnim,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const stopincreaseLengthFunction = () =>{
        
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','360deg']
    });
    const lengthData = lengthValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['10%','90%']
    });
    const viewLengthStyle={
        width: lengthData
    }

    const checkOnPress = ()=>{
        setRotation(!isRotating);
    }

    return(
        <>
        <View style={styles.screen}>
           {/* logo */}
           <TouchableWithoutFeedback onPress={()=>checkOnPress()}>
           <Animated.Image  style={[styles.logo,
           {transform : [{rotate:RotateData}]}
            ]}
            source={require("../assets/login/buddiyogaLogo.png")}>
            </Animated.Image>
            </TouchableWithoutFeedback>
            {/* line */}
            <Animated.View style={[styles.logoShadow,viewLengthStyle]}></Animated.View>
            {/* button */}
         <Animated.View style={{width: 300,marginVertical: 25,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim,}}>
        <Link to={{screen:"Game"}}>
        <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0}}><Text style={{color: '#fff',fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Start Game</Text>
        </TouchableOpacity>
        </Link>
        </Animated.View >
        
        </View>
        <View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                            <Image source={require("../assets/login/MinistryEducation.png")} style={{width:103,height:90}}/>
                            <Image source={require("../assets/login/IKS.png")} style={{width:100,height:100}}/>
                            <Image source={require("../assets/login/buddhiyoga_logo.png")} style={{width:80,height:90}}/>
                        </View>
            </View>
        </>
    )   
}
const styles = StyleSheet.create({
    screen:{
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"80%",
        // opacity:0.7
    },
    logo:{
    width:290,
    height: 100,
    marginBottom:6
    },
    logoShadow:{
        height: 2,
        backgroundColor: "black",
        opacity:0.5,
        shadowOffset: { width: 2, height: 6 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 15, 
    }
});
export default Login;