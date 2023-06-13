import React,{useState,useRef, useCallback, useMemo, useEffect,createRef} from 'react';
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
import {WP_URL_POST,LANG_CODE}  from '@env';
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
// import { Link } from '@react-navigation/native';

import Dice1 from "../assets/game/dice/dice1.png";
import Dice2 from "../assets/game/dice/dice2.png";
import Dice3 from "../assets/game/dice/dice3.png";
import Dice4 from "../assets/game/dice/dice4.png";
import Dice5 from "../assets/game/dice/dice5.png";
import Dice6 from "../assets/game/dice/dice6.png";
import Dice7 from "../assets/game/dice/dice7.png";
import Dice8 from "../assets/game/dice/dice8.png";
import Dice9 from "../assets/game/dice/dice9.png";
import Dice10 from "../assets/game/dice/dice10.png";
import Dice11 from "../assets/game/dice/dice11.png";
import Dice12 from "../assets/game/dice/dice12.png";

import Hamburger from '../components/hamburger';

const Game= ({navigation}) => {
  console.log(global.config.GL_LANG_CODE);
//   useEffect(()=>{
// console.log("HELLO_WORLD");
//   });
// console.log(LANG_CODE)

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
  const { width, height } = Dimensions.get('window');
  const {gameBoard,setGameBoard}= useState(AsyncStorage.getItem('gameBoard'));
  const {postUrl,setpostUrl}= useState("");

// useEffect(()=>{
//   console.log(gameBoard)
// async function storeData(){
//   let url= await AsyncStorage.getItem('postUrl');
//   let board=await AsyncStorage.getItem('gameBoard');
//   console.log(board);
//   if(url === null && board === null)
//   {
//     setGameBoard("en");
//     setpostUrl('https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/');
//   }
//   else{
//     setGameBoard(board);
//     setpostUrl(url);
//   }
//   return true;
// }


// })

  const[pinchState,setPinchState]=useState(false);

    // when scale < 1, reset scale back to original (1)
    
  const [gameState,setGameState] =useState(0);
  const [excerpt,setExcerptState] =useState("Loading....");
  const [postName,setPostName] =useState("..");
  const cellInfo = useRef("Loading please wait...");
  const [isRotating, setRotation] = useState(true);
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
    const value = await AsyncStorage.getItem(key)
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
  ispinValue:1})
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
            setDiceFace(savedData.diceFace);
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

  const diceRoll=()=>{
    if(!isRotating)
    {
      setRotation(!isRotating);
    }

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
    // dice.current.iDiceCurrentRoll=6;
    
    if(iSnakeLadderBase.current==0)
    {
      
      setDiceFace(diceImage[dice.current.iDiceCurrentRoll-1].imageurl)
      
    }
    else
    {
      setDiceFace(diceImage[6].imageurl)
    }
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
   cellInfo.current=playerPositions[player.current.position].info.name;  
  //  console.log(playerPositions[player.targetPosition].info.name)
  //  setCell(cellInfo.current);
     }
     else if(iDisplacement.current!=0)
     {
       dice.current.iDiceCurrentRoll=iDisplacement.current;
        movePawnNextCell();
    cellInfo.current=playerPositions[player.current.position].info.name;
    // console.log(playerPositions[player.targetPosition].info.name)
    // setCell(cellInfo.current);
     }
     postIdCurrent.current=playerPositions[player.current.position].postID;
    
  };

  const landingEvent =()=>{
    
    player.current.global_direction=1;
    player.current.targetPosition=player.current.position;
    
    if(iSnakeLadderBase.current>0)
    {
    
      setDiceFace(diceImage[8].imageurl)
      
    }
    else if(iSnakeLadderBase.current < 0)
    {
      
      setDiceFace(diceImage[7].imageurl)
      
    }
    else
    {
      setDiceFace(diceImage[6].imageurl)
      
    }
    postIdCellMovement.current=playerPositions[player.current.position].postID;
    saveStatesFunc();
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
    
    playerPositionX.current=playerPositions[player.current.targetPosition].x;
    playerPositionY.current=playerPositions[player.current.targetPosition].y;
    
    Animated.timing(position,{
      toValue:{x: playerPositionX.current,y:playerPositionY.current},
      useNativeDriver: true
    }).start(()=>{
      player.current.position=player.current.targetPosition;
      postIdCellMovement.current=playerPositions[player.current.position].postID;
      saveStatesFunc();
      setExcerptState(playerPositions[player.current.position].info.quote[0].name);
      setPostName(playerPositions[player.current.position].info.name);
    });

    
    
  };

  const saveStatesFunc =()=>{

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
      storeData('@saveSate',saveStates);

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
    
    
  
  const about=(e)=>{
    alert("about game");

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

    handlePanGesture = Animated.event([{nativeEvent: 
      {translationX: translateX,translationY:translateY}}], 
      { useNativeDriver: true });

      const onHandlerPanStateChange = useCallback(() => {
        // console.log("Changed Position")
        translateX.setValue(0);
        translateY.setValue(0);
        
      }, []);


  return (
    <>
    <SafeAreaView style={{backgroundColor:"#cfc19f", width: width,height: height,flex: 1, flexDirection: "column",justifyContent: 'space-between'}}>
    <Hamburger navigation={navigation} resetFunction={resetGame} infoFunction={about} style={styles.hamburgerPosition} />

    <View style={styles.container} >
    
    <Animated.View style={styles.gameContainer}>
        <GestureHandlerRootView>
          <Pinchable>
        <View style={{flex:1,width:width,justifyContent: "center", alignItems: "center",flexDirection: "row"}}>
          {/* <View> */}
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={(e) => (
              getPosts(e)
        )}>
          {
            global.config.GL_LANG_CODE==="en" && 
            <Image source={require('../assets/game/board.jpg')} style={{width:380,height:380,backgroundColor: '#fff',zIndex:-1}} />
            || 
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
      bottom:49,
      left:35,
      transform:[{
        translateX:position.x
      },{translateY:position.y}]
      }} >
        <Image source={require('../assets/game/token4.png')} style={{width:40,height:40}}  />
      </Animated.View>):(<View></View>)}
      <View style={{
      // position:'absolute',
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
        
        width:40,
        height:40,
        backgroundColor:"rgba(88, 44, 36,1)",
        borderRadius:10,        
        transform: [{rotate: spin}]
    
    }}>
      
      <TouchableOpacity onPress={() => {diceRoll()}} style={{justifyContent:'center', alignItems:'center',zIndex:-1}}>
      
      <Animated.Image ref={diceFaceFrame} source={diceFace} 
      style={{width:"80%",height:"100%"}}
      resizeMode="contain"
      />
      
      
      </TouchableOpacity>

      </Animated.View>
      ):(<View></View>)
    }

      </View>

    </Animated.View>
 
   </View>
   <View style={{ marginTop:'0%',width:"100%", height:"15%",justifyContent:'flex-end',backgroundColor:"#cfc19f"}} >
   <BlockInformation setrotation={(e)=>setRotation(e)}rotation={isRotating} excerpt={excerpt} postName={postName} postId={postIdCellMovement.current} navigation={navigation} />        
   </View>
  
   </SafeAreaView>
   </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
    justifyContent:'space-around',
    // alignItems: 'center',
    // flexDirection: 'column',
    position:'absolute',
    marginTop:'15%',
    zIndex:1
    
  },
  gameContainer:{
    alignContent:'center',
    // justifyContent:'center',
    // alignItems: "center";
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