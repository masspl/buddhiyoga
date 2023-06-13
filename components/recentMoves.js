import React,{useState,useEffect} from "react";
import { Animated,Text,ScrollView,Easing,View, SafeAreaView,Dimensions,TouchableOpacity} from "react-native";
import MagicComponentHeader from "./magicComponentHeader";
import {AI_URL}  from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "./loader";
import '../globalVariables';
import { TouchableWithoutFeedback } from "react-native";
import Dice1 from "../assets/game/dice/updated/dice1.png";
import Dice2 from "../assets/game/dice/updated/dice2.png";
import Dice3 from "../assets/game/dice/updated/dice3.png";
import Dice4 from "../assets/game/dice/updated/dice4.png";
import Dice5 from "../assets/game/dice/updated/dice5.png";
import Dice6 from "../assets/game/dice/updated/dice6.png";
import Dice7 from "../assets/game/dice/updated/dice7.png";
import Dice8 from "../assets/game/dice/updated/dice8.png";
import Dice9 from "../assets/game/dice/updated/dice9.png";

const RecentMoves=(props)=>{
      
    const { width, height } = Dimensions.get('window');
    const [aiData, setaiData] = useState();
    const [isLoading, setisLoading] = useState(false);
    const [clickedStatus, setClickedStatus] = useState(true);
    const [fetched, setFetched] = useState(false);
    const [cellsContains,setCellsContains]=useState([]);
    const [Numbers,setNumbers]=useState(3);
    const [rowTapped,setRowTapped]=useState(false);

    var playerPositions =require('../assets/game/buddhiyogaEngine.json');

    useEffect(()=>{
        if(cellsContains.length <=0)
        {
          getLastMoveData();
        }
    },[cellsContains.length])

    async function getLastMoveData(data) { 
      var arr=[];
      var storageData = await  getData('@playerMove');
      storageData=JSON.parse(storageData);
      storageData.slice().reverse().forEach(element => {
        // console.log(element)
          let obj={name:element.postName,cellNo:element.player.position,diceFace:element.dice.iDiceFace};
          console.log(obj);
          arr.push(obj);
      });
        setCellsContains(arr);
      }
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null) {
          // value previously stored
          return value;
        }
        else
        {
          return null;
        }
      } catch(e) {
        // error reading value
        console.log("Error While fetching Data")
      }
    }

    const storeData = async (key,value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (e) {
        // saving error
      }
    }

const getStorageData=async ()=>{
    setClickedStatus(false);
      var recentCellStr= cellsContains.slice(0, Numbers);
        var prompt=JSON.stringify({"textToAI":recentCellStr, lang: global.config.GL_LANG_CODE});
        try {
          setisLoading(true);
          await fetch(AI_URL, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
          },
          body: prompt,
          })
          .then(async(response) => {
            var responseData=await response.json();
            setaiData(responseData);
            setFetched(true);
            setisLoading(false);
            var bufferPlayerMoves=[];
            var bufferStates={};
            var device={prompt:prompt,response:responseData};
            bufferStates.aiRequest=device;
            var bufferStorageData=await getData('@bufferPlayerMove');
            if(bufferStorageData===null)
              {
                bufferPlayerMoves.push(bufferStates);
                storeData('@bufferPlayerMove',bufferPlayerMoves);
              }
              else{
                bufferStorageData=JSON.parse(bufferStorageData);
                bufferStorageData.push(bufferStates);
                storeData('@bufferPlayerMove',bufferStorageData);
              }
            
          })
          .done();
      } 
      catch (error) {
      // console.error(error);
      setisLoading(false);
      }
}
    
const cellInformaion=(index)=>{
  alert(playerPositions[index].info.name);
}
    const renderAiData = (
        <Animated.View style={[{height: 400,backgroundColor: '#fff', paddingHorizontal: 10,borderTopEndRadius: 20, borderTopStartRadius: 20, justifyContent: 'flex-start',flexDirection: 'column', flex: 1}]}>
        <Text style={{color: 'rgba(88, 44, 36,1)', fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderBottomColor: 'rgba(88, 44, 36,0.2)', borderBottomWidth: 1,paddingBottom: 0, lineHeight: 50}}>A thought trail</Text>
        <ScrollView style={{height: 350, paddingVertical: 0}}>
            <Text style={{color: '#000', margin: 0, padding: 0, textAlign: "justify"}}>{aiData}{'\n\n'}</Text>
        </ScrollView>
  </Animated.View>
  ); 
    return(
        <>
        <SafeAreaView style={{backgroundColor: 'rgba(183,153,114,0.25)', width: width,height: height,flex: 1, flexDirection: "column",justifyContent: 'space-between'}}>
          {
            cellsContains.length > 0 ? 
          
             <><MagicComponentHeader navigation={props.navigation} getstorageData={getStorageData} status={clickedStatus}/>
             <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', padding: 10 }}>
                <ScrollView style={{ width: '100%', height: '100%' }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', padding: 0, width: '100%' }}>

                    {cellsContains.map((cell, index) => 
                    <TouchableWithoutFeedback key={index} onPress={()=>cellInformaion(cell.cellNo)}>
                    <View key={index} style={{ alignItems: 'center', flex: 1, flexDirection: 'row', width: "100%", paddingVertical: 0, backgroundColor: index >= Numbers ? '#fff' : 'rgba(183,153,114,1)', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1, elevation: 10, shadowColor: '#b79972', marginVertical: 5 }}>
                      
                      <View style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4, flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 10, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.5)' }}>
                        <Text style={{ fontSize: 12, color: '#fff' }}>Cell No</Text>
                        <Text style={{ fontSize: 25, color: '#fff' }}>{cell.cellNo}</Text>
                      </View>
                      <Text style={{ width: '75%', fontSize: 16, color: index >= Numbers ? 'rgba(88, 44, 36,1)' : '#fff', textTransform: 'capitalize', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10, }}>{cell.name}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    )}
                  </View>
                </ScrollView>
                  </View>
            {
              (isLoading || fetched) &&
              <View style={{ height: 440, position: 'relative', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#b79972' }}>
                      <View style={{ backgroundColor: '#fff', width: '100%', justifyContent: 'center', flexDirection: 'row', borderRadius: 10 }}>
                      <View>
                        {fetched?renderAiData:<Loader/>}
                      </View>
                  </View>
                </View>
            }
            {
              rowTapped &&
              <View>
                <Image source={diceFace} style={{width:"95%",height:"100%"}} resizeMode="contain"/>
              </View>
            }
                  
                </>
            :
            <View>
            <Loader/>
            </View>
        }
        </SafeAreaView>
         </>
    );
}

export default RecentMoves;