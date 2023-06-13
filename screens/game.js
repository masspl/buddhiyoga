import React,{useState,useRef, useCallback, useMemo, useEffect,createRef} from 'react';
import DeviceInfo, { getType } from "react-native-device-info";
import { getTimeZone } from "react-native-localize";
import Sound from 'react-native-sound';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Button,
  Easing,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
  Dimensions
} from 'react-native';

import { TouchableOpacity } from 'react-native';
import BlockInformation from '../components/blockInformation';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Pinchable from 'react-native-pinchable';

import {
    GestureHandlerRootView,TapGestureHandler,PinchGestureHandler,PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import {useAnimatedGestureHandler} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Dice10 from "../assets/game/dice/updated/dice10.png";
import Dice11 from "../assets/game/dice/updated/dice11.png";
import Dice12 from "../assets/game/dice/updated/dice12.png";

import Hamburger from '../components/hamburger';

const Game= ({navigation}) => {
  
  const postIdCurrent =useRef(551);
  const postIdCellMovement=useRef(551);
  const diceFaceFrame = useRef(null);
  const cellInfoNow=useRef(null);
  const [panEnabled, setPanEnabled] = useState(false);
  const [diceFace,setDiceFace] =useState(Dice7);
  const pinchRef = createRef();
  const panRef = createRef();
  const playerPositionX=useRef(0);
  const playerPositionY=useRef(0);
  const sound=useRef("dice_rolling.mp3");
  const { width, height } = Dimensions.get('window');
  

  const[pinchState,setPinchState]=useState(false);

    // when scale < 1, reset scale back to original (1)
    
  const [gameState,setGameState] =useState(0);
  const [excerpt,setExcerptState] =useState("Loading....");
  const [postName,setPostName] =useState("..");
  const cellInfo = useRef("Loading please wait...");
  const [isRotating, setRotation] = useState(true);
  const [magicStatus, setMagicStatus] = useState(false);
/* Variables for the game  */  
    
  // const position = new Animated.ValueXY({x:0,y:0});

  const [position,setPosition] = useState(new Animated.ValueXY({x:0,y:0}));
  var translateX = new Animated.Value(0);
  var translateY = new Animated.Value(0);
  
  
  const diceSpinValue= new Animated.Value(0);

  const spin = diceSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });

  const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
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
    // console.log("Error While fetching Data")
  }
}

  var initialStates={
    iDisplacement:0,
    iSnakeLadderBase:0,
    iOld_state:0,
    iCurrent_state:0,
    iReverseTo:0,
    iRoll:0,
    iOld_ReverseTo:0,
    player:{
      image: null,
      position: 68,
      targetPosition: 1,
      wallet: 100,
      global_direction: 1,
      current_cell_type: 0
    },
    dice:{
      iDiceFace: 0,
      iDiceRollCount: 0,
      iDiceCurrentRoll: 0,
      ispinValue:1
    },
    diceFace:Dice7


  }

  var saveStates={
    iDisplacement:0,
    iSnakeLadderBase:0,
    iOld_state:0,
    iCurrent_state:0,
    iReverseTo:0,
    iRoll:0,
    iOld_ReverseTo:0,
    player:{
      image: null,
      position: 68,
      targetPosition: 1,
      wallet: 100,
      global_direction: 1,
      current_cell_type: 0
    },
    dice:{
      iDiceFace: 0,
      iDiceRollCount: 0,
      iDiceCurrentRoll: 0,
      ispinValue:1
    },
    diceFace:Dice7


  }
  var playerMove=[];
  const iDisplacement = useRef(0);
  const iSnakeLadderBase = useRef(0);
  const iOld_state = useRef(0);
  const iCurrent_state = useRef(0);
  const iReverseTo = useRef(0);
  const iRoll=useRef(0);
  const iOld_ReverseTo = useRef(0);

  //Player Variable
//   var player = {
//     image: null,
//     position: 68,
//     targetPosition: 1,
//     wallet: 100,
//     global_direction: 1,
//     current_cell_type: 0
// };
const player = useRef({
  image: null,
  position: 68,
  targetPosition: 1,
  wallet: 100,
  global_direction: 1,
  current_cell_type: 0
});
//End of player variable



//Start of Dice Variable
// var dice = {
//   iDiceFace: 0,
//   iDiceRollCount: 0,
//   iDiceCurrentRoll: 0,
//   ispinValue:1
// };
const dice=useRef({iDiceFace: 0,
  iDiceRollCount: 0,
  iDiceCurrentRoll: 0,
  ispinValue:1,
  currentRoll:0})
//End of Dice Variable

function changePage ()
{
  navigation.navigate('Posts',{postId:postIdCurrent.current})
}

/* Variables for the game End */

  var playerPositions =require('../assets/game/buddhiyogaEngine.json');




  var positionConfig = {
    "initCellPos": 68,
    "initPlayerPos": 68,
    "initTargetPos": 68,
    "shortTitle": "BY",
    "retreatCellResult": 6,
    "retreatCellOnCount": 3,
    "initialMoveResult": 6,
    "firstLandingCell": 6,
    "cellDimentionX": 95,
    "cellDimentionY": 95,
    "terminatingCellPos":3
  };

  const diceImage=[
    {
      imageurl:Dice1
    },
    {
      imageurl:Dice2
    },
    {
      imageurl:Dice3
    },
    {
      imageurl:Dice4
    },
    {
      imageurl:Dice5
    },
    {
      imageurl:Dice6
    },
    {
      imageurl:Dice7
    },
    {
      imageurl:Dice8
    },
    {
      imageurl:Dice9
    },
    {
      imageurl:Dice10
    },
    {
      imageurl:Dice11
    },
    {
      imageurl:Dice12
    }
  ];



const initializePawn = ()=>
{
  getData('@saveSate').then((data)=>{
    
      if(data=='null' || data==null || data==undefined )
      {
        dice.current=initialStates.dice;
        iDisplacement.current=initialStates.iDisplacement;
        iSnakeLadderBase.current = initialStates.iSnakeLadderBase;
        iOld_state.current = initialStates.iOld_state
        iCurrent_state.current = initialStates.iCurrent_state;
        iReverseTo.current = initialStates.iOld_ReverseTo;
        iRoll.current=initialStates.iRoll;
        iOld_ReverseTo.current = initialStates.iOld_ReverseTo;
        player.current=initialStates.player;
      
        playerPositionX.current=playerPositions[positionConfig.initCellPos].x;
        playerPositionY.current=playerPositions[positionConfig.initCellPos].y;   
          Animated.timing(position,{
            toValue:{x:playerPositionX.current,y:playerPositionY.current},
            useNativeDriver: true
            }).start();
            setExcerptState(playerPositions[positionConfig.initCellPos].info.quote[0].name);
            setPostName(playerPositions[positionConfig.initCellPos].info.name);
            setDiceFace(Dice7);
            dice.current.iDiceFace=Dice7;
      }
      else
      {
        let savedData=JSON.parse(data);
        dice.current=savedData.dice;
        iDisplacement.current=savedData.iDisplacement;
        iSnakeLadderBase.current = savedData.iSnakeLadderBase;
        iOld_state.current = savedData.iOld_state
        iCurrent_state.current = savedData.iCurrent_state;
        iReverseTo.current = savedData.iOld_ReverseTo;
        iRoll.current=savedData.iRoll;
        iOld_ReverseTo.current = savedData.iOld_ReverseTo;
        player.current=savedData.player;
        postIdCellMovement.current=playerPositions[player.current.position].postID;
        playerPositionX.current=playerPositions[player.current.position].x;
        playerPositionY.current=playerPositions[player.current.position].y;   
          Animated.timing(position,{
            toValue:{x:playerPositionX.current,y:playerPositionY.current},
            useNativeDriver: true
            }).start();
            setExcerptState(playerPositions[player.current.position].info.quote[0].name);
            setPostName(playerPositions[player.current.position].info.name);
            setDiceFace(savedData.dice.iDiceFace);
            dice.current.iDiceFace=savedData.dice.iDiceFace;
      }
  });
 
  
      
}
const stateChangePawn = ()=>
{
  var data=playerPositions[positionConfig.initCellPos].info.name;
  // cellInfo.current.setNativeProps({text:data});
  // console.log("data"+data);


  
  cellInfo.current=data;  
    Animated.timing(position,{
      toValue:{x:playerPositionX.current,y:playerPositionY.current},
      useNativeDriver: true
      }).start();
      
}

  useEffect(()=>{
    
      initializePawn();

  },[gameState]);

  useEffect(()=>{
    stateChangePawn();
    
  },[excerpt]);

  // 
  const diceRoll=()=>{
    // console.log(diceFace);
    if(!isRotating)
    {
      setRotation(!isRotating);
    }
    if(diceFace===8)
    {
      sound.current="snake_bite.mp3";
    }
    else if(diceFace==9)
    {
      sound.current="ladder.mp3";
    }
    else
    {
      sound.current="dice_rolling.mp3";
    }
    const buttonSound = new Sound(sound.current, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
      }
      else{
        buttonSound.play((success) => {
          if (success) {
            // console.log('Sound played successfully');
          } else {
            // console.log('Sound playback failed');
          }
        });
      }
    });
    Animated.timing(
      diceSpinValue,
    {
      toValue: dice.current.ispinValue,
      duration: 200,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  ).start(()=>{
   
    dice.current.iDiceRollCount++;
    let min = 1;
    let max = 7;
    dice.current.iDiceCurrentRoll= min+Math.floor( Math.random() * (max - min));
    // dice.current.iDiceCurrentRoll=1;
    
    if(iSnakeLadderBase.current==0)
    {
      dice.current.currentRoll=dice.current.iDiceCurrentRoll-1;
      // console.log("inside if statement");
      setDiceFace(diceImage[dice.current.iDiceCurrentRoll-1].imageurl)
      dice.current.iDiceFace=diceImage[dice.current.iDiceCurrentRoll-1].imageurl;
      
    }
    else
    {
      // console.log('inside else statement'+ diceImage[6].imageurl);
      setDiceFace(diceImage[6].imageurl)
      dice.current.iDiceFace=diceImage[6].imageurl
    }
    sound.current="dice_rolling.mp3";
    initiatePawnMovement();
  });

  if(dice.current.ispinValue==1)
  {
    dice.current.ispinValue=0;
  }
  else
  {
    dice.current.ispinValue=1;
  }

  };


  


  const initiatePawnMovement = async ()=>{
    
       iRoll.current=dice.current.iDiceCurrentRoll;
       iOld_state.current = iCurrent_state.current;
       iCurrent_state.current = playerPositions[player.current.position].info.movement.state[(iRoll.current * 3) + iOld_state.current];



      if (iCurrent_state.current == 999) {
        iCurrent_state.current = iOld_state.current;
      }


      iDisplacement.current = playerPositions[player.current.position].info.movement.displacement[iOld_state.current];


      if (iDisplacement.current == 0) {
        iDisplacement.current = playerPositions[player.current.position].info.movement.displacement[(iRoll.current* 3) + iOld_state.current];
      }

    if (iDisplacement.current < 999) {
      iSnakeLadderBase.current = playerPositions[player.current.position + iDisplacement.current].info.movement.displacement[iCurrent_state.current];
    }
    

      if ((iDisplacement.current != 0) && (iDisplacement.current < 999) ) {
        iOld_ReverseTo.current = iReverseTo.current;
        iReverseTo.current = playerPositions[player.current.position].info.movement.return[(iRoll.current * 3) + iOld_state.current];
        if (iReverseTo.current == 999) {
            iReverseTo.current = iOld_ReverseTo.current;
        }

        player.current.targetPosition = player.current.position + iDisplacement.current;
    }
    else if (iDisplacement.current == 999) {
        player.current.targetPosition = iReverseTo.current;
    }

     if(iDisplacement.current < 0 || iDisplacement.current > 6 )
     {
      player.current.targetPosition=player.current.position+iDisplacement.current;
       movePawnToCell();
      // cellInfo.current=playerPositions[player.current.position].info.name;  
     }
     else if(iDisplacement.current!=0)
     {
      dice.current.iDiceCurrentRoll=iDisplacement.current;
      movePawnNextCell();
      cellInfo.current=playerPositions[player.current.position].info.name;
     }
    //  console.log(cellInfo.current);
     postIdCurrent.current=playerPositions[player.current.position].postID;
    
  };

  const landingEvent =()=>{
    
    player.current.global_direction=1;
    player.current.targetPosition=player.current.position;
    
    if(iSnakeLadderBase.current>0)
    {
    
      setDiceFace(diceImage[8].imageurl);
      dice.current.iDiceFace=diceImage[8].imageurl;
      
    }
    else if(iSnakeLadderBase.current < 0)
    {
      
      setDiceFace(diceImage[7].imageurl);
      dice.current.iDiceFace=diceImage[7].imageurl;
    }
    else
    {
      setDiceFace(diceImage[6].imageurl)
      dice.current.iDiceFace=diceImage[6].imageurl;
    }
    postIdCellMovement.current=playerPositions[player.current.position].postID;
    saveStatesFunc(playerPositions[player.current.position].info.name);
    setExcerptState(playerPositions[player.current.position].info.quote[0].name);
    setPostName(playerPositions[player.current.position].info.name);
    // alert
  };

  const flyoverEvent =()=>{
    if((player.current.position+1) > 72 )
    {
      player.current.global_direction=-1;
    }

  };

  const movePawnNextCell=()=>{
    // console.log("movePawnNextCell"+iSnakeLadderBase.current);
    if(iSnakeLadderBase.current>0)
    {
      dice.current.iDiceFace=diceImage[8].imageurl;
      
    }
    else if(iSnakeLadderBase.current < 0)
    {
      dice.current.iDiceFace=diceImage[7].imageurl;
    }
    playerPositionX.current=playerPositions[player.current.position].x;
    playerPositionY.current=playerPositions[player.current.position].y;

    Animated.sequence([
    Animated.timing(position,{
      toValue:{x: playerPositionX.current,y: playerPositionY.current},
      useNativeDriver: true
    })]).start(()=>{

      if(dice.current.iDiceCurrentRoll>0)
      {
        flyoverEvent();
        player.current.position= player.current.position+(1*player.current.global_direction);
        dice.current.iDiceCurrentRoll--;
        movePawnNextCell();
      }
      else
      {
        
        landingEvent();
      }
    });
    
    

  };

  const movePawnToCell=()=>{
    // console.log("movePawnToCell");
    playerPositionX.current=playerPositions[player.current.targetPosition].x;
    playerPositionY.current=playerPositions[player.current.targetPosition].y;
    
    Animated.timing(position,{
      toValue:{x: playerPositionX.current,y:playerPositionY.current},
      useNativeDriver: true
    }).start(()=>{
      player.current.position=player.current.targetPosition;
      postIdCellMovement.current=playerPositions[player.current.position].postID;
      saveStatesFunc(playerPositions[player.current.position].info.name);
      setExcerptState(playerPositions[player.current.position].info.quote[0].name);
      setPostName(playerPositions[player.current.position].info.name);
    });

    
    
  };

  var bufferPlayerMoves=[];
  var device={deviceID:"",manufacturer:"",model:"",timeZone:"",nativeLang:"",date:""};
  const saveStatesFunc =async(postName)=>{
    console.log("///////////////");
      console.log(dice.current);
      // console.log("///////////////");
      // console.log(player.current);
      // console.log("///////////////");
      // console.log(diceFace);
      saveStates.dice=dice.current;
      saveStates.player=player.current;
      saveStates.iCurrent_state=iCurrent_state.current;
      saveStates.iDisplacement=iDisplacement.current;
      saveStates.iOld_ReverseTo=iOld_ReverseTo.current;
      saveStates.iOld_state=iOld_state.current;
      saveStates.iReverseTo=iOld_ReverseTo.current;
      saveStates.iRoll=iRoll.current;
      saveStates.iSnakeLadderBase=iSnakeLadderBase.current;
      saveStates.diceFace=diceFace;
      saveStates.postName=postName
      storeData('@saveSate',saveStates);
      playerMove.push(saveStates);
      var storageData=await getData('@playerMove');
      if(storageData===null)
      {
        storeData('@playerMove',playerMove);
      }
      else{
        storageData=JSON.parse(storageData);
        storageData.push(saveStates);
         storeData('@playerMove',storageData);
      }

      var bufferStates=saveStates;
      await DeviceInfo.getAndroidId().then((androidId) => {
        device.deviceID=androidId;
      });
      await DeviceInfo.getManufacturer().then((androidId) => {
        device.manufacturer=androidId;
      });
      await DeviceInfo.getDevice().then((deviceID) => {
        device.model=deviceID;
      });
      device.timeZone=getTimeZone();
      device.nativeLang=global.config.GL_LANG_CODE;
      var date = new Date();
      device.date=date;
      bufferStates.deviceInformaion=device;
      bufferPlayerMoves.push(bufferStates);
      var bufferStorageData=await getData('@bufferPlayerMove');
      if(bufferStorageData===null)
      {
        storeData('@bufferPlayerMove',bufferPlayerMoves);
      }
      else{
        bufferStorageData=JSON.parse(bufferStorageData);
        bufferStorageData.push(bufferStates);
         storeData('@bufferPlayerMove',bufferStorageData);
      }
     if(storageData!=null && storageData.length >= 3) {
        setMagicStatus(true);
      }
      
  };
  
const getPosts=(e)=>{
  let Xdiff;
  let postsid;
  let qoute;
  let x=e.nativeEvent.x;
  let y=e.nativeEvent.y;
  playerPositions.forEach(element => {
    if(element.postID!=551)
    {
    let x1=Math.sqrt(Math.pow(element.x-x +28,2)+Math.pow(-360-element.y+y+14,2));
    if(Xdiff==undefined || x1 <=Xdiff)
    {
      Xdiff=x1;
      postsid=element.postID;
      qoute=element.info.quote[0].name;

    }
    }
  });
  postIdCurrent.current=postsid;
  // cellInfoNow.current.setNativeProps([{text:qoute}]);
  changePage();
  // console.log(qoute)
}

  const resetGame=(e)=>{
   
      storeData('@saveSate',null).then(()=>{
        if(gameState==1)
        {
          setGameState(0);
        }
        else
        {
          setGameState(1);
        }
       
      });
      
    }
    
    
    
    const magicButton=()=>{
      navigation.navigate('recentMoves');
  
    }
  const howtoplayFunction=()=>{
    navigation.navigate('Help');

  }
const ChatGPT=()=>{
  navigation.navigate('ChatGPT')
}
  
  

  const scalePinchGesture = new Animated.Value(1);
    const onGestureEvent = Animated.event([{nativeEvent: {scale: scalePinchGesture}}], {
      useNativeDriver: true,
    });
    const onPinchStateChange = (event) => {
      // console.log('called');
      if (event.nativeEvent.oldState === State.ACTIVE) {
        Animated.spring(scalePinchGesture, {toValue: 1, useNativeDriver: true}).start();
      }
    };


    // const handlePanWhenDragging = (nativeEvent) =>{
    //   if(pinchState)
    //   {
    //     translateX.setValue(nativeEvent.translationX);
    //     translateY.setValue(nativeEvent.translationY);
    //   }
    // };

    const handlePanGesture = Animated.event([{nativeEvent: 
      {translationX: translateX,translationY:translateY}}], 
      { useNativeDriver: true });

      const onHandlerPanStateChange = useCallback(() => {
        // console.log("Changed Position")
        translateX.setValue(0);
        translateY.setValue(0);
        
      }, []);


  return (
    <>
    <SafeAreaView style={{backgroundColor:'rgba(183,153,114,0.25)', width: width,height: height,flex: 1, flexDirection: "column",justifyContent: 'space-between'}}>
    <Hamburger navigation={navigation} resetFunction={resetGame} infoFunction={magicButton} resetStatus={true} magicStatus={magicStatus} howtoplayFunction={howtoplayFunction} />

    <View style={[{flex:1,
    width: width, alignItems: 'center', flexDirection: 'row',justifyContent: 'center'},styles.container]} >
    
    <Animated.View style={styles.gameContainer}>
      <View>
        <GestureHandlerRootView>
          <Pinchable>
        <View style={{width:380}}>
          {/* <View> */}
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={(e) => (
              getPosts(e)
        )}>
         {
            global.config.GL_LANG_CODE==="en" ? 
            <Image source={require('../assets/game/board.jpg')} style={{width:380,height:380,backgroundColor: '#fff',zIndex:-1}} />
            :
            global.config.GL_LANG_CODE==="or" && 
            <Image source={require('../assets/game/boardOdia.jpg')} style={{width:380,height:380,backgroundColor: '#fff',zIndex:-1}} />
          }
        </TapGestureHandler>
         </View>
        </Pinchable>
        
        </GestureHandlerRootView>
        { (!pinchState)?(  
      <Animated.View 
      style={{alignContent:'center',
      justifyContent:'center',
      width:40,
      height:40,

      bottom:46,
      left:28,

      transform:[{
        translateX:position.x
      },{translateY:position.y}]
      }} >
        <Image source={require('../assets/game/token4.png')} style={{width:40,height:40}}  />
      </Animated.View>
      ):(<View></View>)}
      </View>
      <View style={{
      flex:1,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center',
      width:"100%",
      bottom:0,
      height:"10%"
      }}>
      { (!pinchState)?(
      <Animated.View style={{
        
        width:45,
        height:45,
        borderRadius:10,        
        transform: [{rotate: spin}]
    
    }}>
      
      <TouchableOpacity onPress={() => {diceRoll()}} style={{justifyContent:'center', alignItems:'center',zIndex:-1}}>
      
      <Animated.Image ref={diceFaceFrame} source={diceFace} 
      style={{width:"95%",height:"100%"}}
      resizeMode="contain"
      />
      
      
      </TouchableOpacity>

      </Animated.View>
      ):(<View></View>)
    }

      </View>

    </Animated.View>
    
   </View>
 
    <View style={{ marginTop:'0%',width:"100%", height:"15%",justifyContent:'flex-end'}} >
   <BlockInformation setrotation={(e)=>setRotation(e)}rotation={isRotating} excerpt={excerpt} postName={postName} postId={postIdCellMovement.current} navigation={navigation} />        
   </View>
  
   </SafeAreaView>
   </>
  );
};

const styles = StyleSheet.create({
  container:{
    
    position:'absolute',
    marginTop:'25%',
    zIndex:1
    
  },
  gameContainer:{
    // alignContent:'center',
    justifyContent:'center',
    alignItems: "center",
    width:"100%",
    height:"80%",
    marginHorizontal:"0%",
    zIndex:2
  },
  CircleShape: {
    position:'absolute',
    top:"17%",
    left:"44%",
    width: "15%",
    height: "7.5%",
    borderRadius: 150 / 2,
    backgroundColor: '#FF9800',
    zIndex:1,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 160 / 2,
  },

});

export default Game;