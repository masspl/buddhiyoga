import React,{useState,useEffect} from "react";
import { Animated,Text,ScrollView,Easing,View, SafeAreaView,Dimensions,TouchableOpacity} from "react-native";
import {AI_URL}  from '@env';
import Hamburger from "./hamburger";
import Postsheader from '../components/postsheader';
// import LoadingSpinner from "./LoadingSpinner";
import Loader from "./loader";
const ChatGPT=({navigation})=>{
    console
  const { width, height } = Dimensions.get('window');
  const [aiData, setaiData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [color, setColor]=useState(false);
  const [clicked, setClicked]=useState();
  const [isRotating, setRotation] = useState(true);
  const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
// console.log(lengthValueHolder);

    // const [aiResult,setAiResult]=useState("");
    // useEffect(()=>{
    //    if(aiResult.length<=0) 
    //    {
    //     callChatGPTData();
    //    }
    // });
    async function callChatGPTData(data) {  
        // console.log(AI_URL)
        try {
            setisLoading(true);
            setRotation(true);
            fetch("http://69.57.163.217:8000/aiapi/getTextFromOpenAIApi", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"textToAI":data}),
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(JSON.stringify(responseData));
                setaiData(responseData);
                setisLoading(false);
                setRotation(false);
                increaseLengthFunction();
            })
            .done();
        } 
        catch (error) {
        console.error(error);
        setisLoading(false);
        }
       
      }
    async function clickHandler(data) {
        
        await callChatGPTData(data);
        setColor(true);
        setClicked(data);
    }

    useEffect(()=>{
        if(isRotating==true)
        {
         stopincreaseLengthFunction();
        }
        else
        {
         increaseLengthFunction();
        }
     },[isRotating]);

    const increaseLengthFunction = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }

    const stopincreaseLengthFunction = () =>{
        
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }

    const lengthData = lengthValueHolder.interpolate({
        inputRange:[0,1],
        outputRange:[500,0]
    });
    // console.log(lengthData);
    const viewLengthStyle= {
        transform: [{translateY: isRotating ? 500 : 0}]
    }
console.log(viewLengthStyle);

    const cellStr=['janma','krodha','kama','vaikuntha'];

    const renderAiData = (
    <Animated.View style={[{height: 400,backgroundColor: '#fff', padding: 10,borderTopEndRadius: 20, borderTopStartRadius: 20, justifyContent: 'flex-start',flexDirection: 'column', flex: 1},viewLengthStyle]}>
        <Text style={{color: 'rgba(88, 44, 36,1)', fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderBottomColor: 'rgba(88, 44, 36,0.2)', borderBottomWidth: 1,paddingBottom: 15}}>{clicked}</Text>
        <ScrollView style={{}}>
    <Text style={{color: '#b79972', margin: 0, padding: 0, textAlign: "justify"}}>{aiData}</Text>
    </ScrollView>
  </Animated.View>
  ); 
    return(
        <>
        <SafeAreaView style={{backgroundColor:"#cfc19f", width: width,height: height,flex: 1, flexDirection: "column",justifyContent: 'space-between'}}>
             {/* <Hamburger /> */}
             <Postsheader navigation={navigation}/>
             {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
                
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row',alignContent: 'center', alignItems: 'center',flexWrap: 'wrap'}}>
                {cellStr.map((cell, index)=>
                
                 <View key={index} style={{width: "48%", padding: 20}}>
                <TouchableOpacity onPress={(e) => clickHandler(cell)} disabled={isLoading}>
                    <Text style={{fontSize: 16,color: 'rgba(88, 44, 36,1)', textTransform: 'capitalize',fontWeight: 'bold',backgroundColor: '#b79972',textAlign: 'center', paddingHorizontal: 10, height: 120,lineHeight: 120, borderRadius: 10, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, elevation: 10, shadowColor: '#b79972'}}>{cell}</Text>
                    </TouchableOpacity>
                 </View>
                 )}
            </View>
            <View style={{height: 400, position: 'relative'}}>
            <ScrollView style={{}}>

            <View style={{}}>
            {isLoading ? <Loader /> : renderAiData}
            </View>
            
            </ScrollView>
            </View>
        </SafeAreaView>
         </>
    );
}

export default ChatGPT;