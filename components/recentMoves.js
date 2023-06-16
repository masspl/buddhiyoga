import React,{useState,useEffect, useRef} from "react";
import { Animated,Text,ScrollView,Easing,View, SafeAreaView,Dimensions,TouchableWithoutFeedback, Image, TextInput,StyleSheet} from "react-native";
import MagicComponentHeader from "./magicComponentHeader";
import {AI_URL,SAVE_CHATGPT_RESPONSE}  from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "./loader";
import '../globalVariables';
import Dice1 from "../assets/game/dice/updated/dice1.png";
import Dice2 from "../assets/game/dice/updated/dice2.png";
import Dice3 from "../assets/game/dice/updated/dice3.png";
import Dice4 from "../assets/game/dice/updated/dice4.png";
import Dice5 from "../assets/game/dice/updated/dice5.png";
import Dice6 from "../assets/game/dice/updated/dice6.png";
import Dice7 from "../assets/game/dice/updated/dice7.png";
import Dice8 from "../assets/game/dice/updated/dice8.png";
import Dice9 from "../assets/game/dice/updated/dice9.png";
import RenderHtml from 'react-native-render-html';
const RecentMoves=(props)=>{
      
    const { width, height } = Dimensions.get('window');
    const [aiData, setaiData] = useState();
    const [isLoading, setisLoading] = useState(false);
    const [clickedStatus, setClickedStatus] = useState(true);
    const [fetched, setFetched] = useState(false);
    const [cellsContains,setCellsContains]=useState([]);
    const [Numbers,setNumbers]=useState(3);
    const [rowTapped,setRowTapped]=useState(false);
    const [source,setNewHtml]=useState({html:"Loading..."});
    const [upvote, setUpvote]=useState(false);
    const [downvote, setDownvote]=useState(false);
    const [commentshow, setCommentshow]=useState(false);
    const [postComment, setPostComment]=useState("");
    const [deviceData, setDeviceData]=useState();
    const [cellData,setCellData]=useState([]);
    const [isRotating, setRotation] = useState(true);
    const [isRotation, setisRotation] = useState(true);
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));

   
    const cellIndex = useRef();

   
    // useEffect(()=>{
    //    if(isRotating==true)
    //    {
    //     stopincreaseLengthFunction();
    //    }
    //    else
    //    {
    //     increaseLengthFunction();
    //    }
    // },[isRotating]);

    // useEffect(()=>{
    //      setRotation(!isRotation);
    // },[!isRotation]);


    var playerPositions =require('../assets/game/buddhiyogaEngine.json');

    useEffect(()=>{
        if(cellsContains.length <=0)
        {
          getLastMoveData();
        }
    },[cellsContains.length])

    // async function getLastMoveData(data) { 
    //   var arr=[];
    //   var storageData = await  getData('@bufferPlayerMove');
    //   storageData=JSON.parse(storageData);
    //   storageData.slice().reverse().forEach(element => {
    //     if(element.hasOwnProperty('gameState')){
    //       let obj={name:element.gameState.postName,cellNo:element.gameState.player.position,diceFace:element.gameState.dice.iDiceFace};
    //       arr.push(obj);
    //     }
    //   });
    //     setCellsContains(arr);
    //   }

    async function getLastMoveData(data) { 
      var arr=[];
      var storageData = await  getData('@playerMove');
      storageData=JSON.parse(storageData);
      storageData.slice().reverse().forEach(element => {
          let obj={name:element.postName,cellNo:element.player.position,diceFace:element.dice.iDiceFace};
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
      cellIndex.current=-1
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
            console.log(responseData);
            setNewHtml({html:responseData});
            setaiData(responseData);
            setFetched(true);
            setisLoading(false);
            var bufferPlayerMoves=[];
            var bufferStates={};
            var device={prompt:prompt,response:responseData};
            setDeviceData(device);
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

    const tagsStyles = {
      body: {
        whiteSpace: 'normal',
        color: 'black',
        // backgroudColor:'#F2D997',
        fontSize: 17,
        paddingVertical: 10,
      },
      a: {
        color: 'black'
      }
      };

    

    const upVote = ()=>{
        if(upvote){
          setUpvote(false);
          setCommentshow(false);
        }
      else{
          setDownvote(false);
          setUpvote(true);
          setCommentshow(true);
      }
    }
    const downVote = ()=> {
      
      if(downvote){
            setDownvote(false);
            setCommentshow(false);
      }
      else{
        setUpvote(false);
        setDownvote(true);
        setCommentshow(true);

      }
          
    }
        
    const increaseLengthFunction = () =>{
      Animated.AnimatedInterpolation
      Animated.timing(lengthValueHolder,{
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false 
      }).start();
    }

    const stopincreaseLengthFunction = () =>{
      
      Animated.AnimatedInterpolation
      Animated.timing(lengthValueHolder,{
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false 
      }).start();
    }

    const lengthData = lengthValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: [100, 0]
    });

    const viewLengthStyle={
      height: lengthData
    }
        
    // const cellInformaion=(cellNo,index)=>{
    //   cellIndex.current=index;
    //   console.log(playerPositions[cellNo].info.quote[0].name);

    //   // if(isRotating==true)
    //   // setisRotation(false);
    //   // setRotation(!isRotating);
    //   // setRowTapped(true);
    //   setCellData(playerPositions[cellNo].info.quote[0].name);
    // }
    const rowTappedStatus=useRef(false);
    const cellInformaion=(cellNo,index)=>{
      if(clickedStatus)
      {
      if(cellIndex.current===index)
        {
          rowTappedStatus.current=true;
          setRowTapped(!rowTapped)
        }
      cellIndex.current=index;
      var randNumber=Math.floor(Math.random(playerPositions[cellNo].info.quote.length));
      setCellData(playerPositions[cellNo].info.quote[randNumber].name);
      }
    }
    const submitButonHandler = async () => {
      // alert("akjsdaskldjsalkd");
        var deviceId= await AsyncStorage.getItem('@deviceID');
        // console.log(typeof(deviceId));
        var vote='';
        if(upvote)
         vote='Upvote';
        else
        vote='Downvote';

        var prompt={data: deviceData, vote: vote, commenttext: postComment};
          try {
            setisLoading(true);
            await fetch(SAVE_CHATGPT_RESPONSE, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              device:deviceId,
              prompt:prompt,
            }),
            })
            .then(async(response) => {
              var responseData=await response.json();
              // alert("response");
            setisLoading(false);
            props.navigation.goBack(null)
            console.log(responseData);
            
          })
          .done();
        } 
        catch (error) {
          console.error(error);
          setisLoading(false);
        }
    

    }
    const renderAiData = (
        <Animated.View style={[{height: 400,backgroundColor: '#fff', paddingHorizontal: 10,borderRadius: 20, justifyContent: 'flex-start',flexDirection: 'column', flex: 1}]}>
        <Text style={{color: 'rgba(88, 44, 36,1)', fontSize: 20, fontWeight: 'bold', textAlign: 'center', borderBottomColor: 'rgba(88, 44, 36,0.2)', borderBottomWidth: 1,paddingBottom: 0, lineHeight: 50}}>A thought trail</Text>
        <ScrollView style={{height: 350, paddingVertical: 0}}>
            <RenderHtml
              source={source}
	            tagsStyles={tagsStyles}
                  />
                  
                  <View style={{width: "100%", padding: 10, margin: 0, flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(0,0,0,0.4)', borderTopWidth: 1}}>
                    <TouchableWithoutFeedback style={{}} onPress={() => upVote()}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
                      
                        {upvote ?
                      <Image source={require('../assets/other/upvote96X96fl.png')} style={{width: 28, height: 28}} />
                      :
                      <Image source={require('../assets/other/upvote96X96la.png')} style={{width: 28, height: 28}} />
                    }
                      
                      <Text style={{marginHorizontal: 5, color: upvote ? 'rgba(88, 44, 36,1)' : 'rgba(0,0,0,0.5)'}}>Upvote</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => downVote()}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 10}}>
                      {downvote ? 
                        <Image source={require('../assets/other/downvote96X96fl.png')} style={{width: 28, height: 28}} />
                        :
                        <Image source={require('../assets/other/downvote96X96la.png')} style={{width: 28, height: 28}} />
                      }
                      <Text style={{marginHorizontal: 5, color: downvote ? 'rgba(88, 44, 36,1)' : 'rgba(0,0,0,0.5)'}}>Downvote</Text>
                    </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {commentshow ? 
                  <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',paddingHorizontal: 10, paddingBottom: 10}}>
                  <TextInput
                          multiline={true}
                          style={styles.input}
                          autoCapitalize='none'
                          autoCorrect={false}
                          placeholder="Type here..."
                          value={postComment}
                          onChangeText={newValue => setPostComment(newValue)}
                          placeholderTextColor={'rgba(0,0,0,0.4)'}
                          
                        />
                         <TouchableWithoutFeedback style={{}} onPress={()=>submitButonHandler()}>
                              <View style={{width: '25%',backgroundColor: '#563229', marginVertical: 10, borderRadius: 10, paddingHorizontal: 10}}>
                              <Text style={[{width: '100%',textAlign: 'center',  color: '#fff',lineHeight: 40,padding: 0},styles.btnstext]}>Submit</Text>
                              {/* <Loader/> */}
                              </View>
                              </TouchableWithoutFeedback>
                              </View>
                  :
                  <></>
                  }
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
                    <>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, marginVertical: 5, width: '100%' }}>
                    <TouchableWithoutFeedback key={index} onPress={()=>cellInformaion(cell.cellNo,index)}>
                    <View key={index} style={{ alignItems: 'center', flex: 1, flexDirection: 'row', width: "100%", paddingVertical: 0, backgroundColor: index >= Numbers ? '#fff' : 'rgba(183,153,114,1)', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1, elevation: 10, shadowColor: '#b79972'}}>
                      
                      <View style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4, flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 10, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.5)' }}>
                        <Text style={{ fontSize: 12, color: '#fff' }}>Cell No</Text>
                        <Text style={{ fontSize: 25, color: '#fff' }}>{cell.cellNo}</Text>
                      </View>
                      <Text style={{ width: '75%', fontSize: 16, color: index >= Numbers ? 'rgba(88, 44, 36,1)' : '#fff', textTransform: 'capitalize', fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10, }}>{cell.name}</Text>
                     
                    </View>
                    </TouchableWithoutFeedback>
                     <Animated.View style={[{width: '100%', backgroundColor: '#fff', borderBottomEndRadius: 10, borderBottomStartRadius: 10},cellIndex.current===index ? (rowTapped ? {height: 0}:{height: 100} ): {height: 0}]}>
                     <View style={{padding: 10,}}>
                       <Text style={{color: '#000'}}>{cellData}</Text>
                     </View>
                   </Animated.View> 
                   </View>
                   </>
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
                </>
            :
            <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Loader/>
            </View>
        }
        </SafeAreaView>
         </>
    );
}

export default RecentMoves;

const styles = StyleSheet.create({
  input :{
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginVertical: 0,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    paddingHorizontal: 10, 
    fontSize: 12,
    width: '65%',
    paddingVertical: 5,
    color: '#000',
},
});