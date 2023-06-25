import React,{useEffect} from 'react';
import './globalVariables';
import { Image } from 'react-native';
import Game from "./screens/game";
import Login from "./screens/login";
import Posts from "./screens/posts";
import Contact from './screens/contact';
import Comment from './components/comment';
import Share from './components/share';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/profile';
import Aboutus from './screens/aboutus';
import Shop from './screens/shop';
import Language from './components/language';
import {NativeModules, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import chatGPT from './components/ChatGPT';
import{ SAVE_STATE } from '@env';
import DeviceInfo from "react-native-device-info";
import recentMoves from './components/recentMoves';
import Help from './components/Help';
const App = (props)=> {

  useEffect(() => {
    fetchAppLang();
    pushDatatoDB();
  },[]);
  
 

  const pushDatatoDB=()=>{
    var deviceID="";
    NetInfo.fetch().then(async (state) => {
      if(state.isConnected)
      {
        await DeviceInfo.getAndroidId().then(async(androidId) => {
          deviceID=androidId;
          await AsyncStorage.setItem('@deviceID', androidId);
        });
        const playerMove = await AsyncStorage.getItem('@bufferPlayerMove');
        if(playerMove!=null) {
      let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
              device:deviceID,
              playerMove:playerMove,
            }),
            headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
              // 'Authorization': 'Basic YnVkZGhpeW9nYTpHZEpSIDdYeFUgdHQ5YyBlSFZ2IFZCcnIgVHhEdg=='
            },
          };
          let response=  fetch(SAVE_STATE,data)
            .then(response => response.json()) 
            .then(async(json) =>{
              console.log(json);
             if(json.code===200){
              await AsyncStorage.removeItem('@bufferPlayerMove');
             }
             else if(json.code===-919){
              console.error('Error');
             }
            })
          }
          else{
            console.log("playerMove :NULL");
          }
      }
      else{
        // alert("you are not connected to the server....");
      }
    });
  }


  const fetchAppLang = async () => {
  // const locale = Platform.select({
    // ios: NativeModules.SettingsManager?.settings?.AppleLocale || NativeModules.SettingsManager?.settings?.AppleLanguages[0],
    // android: NativeModules.I18nManager.localeIdentifier,
  // });
  
  var localeLangCode = await AsyncStorage.getItem("selectedLanguage");
    // var localeLangCode = locale.substring(0,2);
    console.log(localeLangCode);
    switch (localeLangCode) {
      
      case 'bn':
       
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'bn');
          global.config.GL_LANG_CODE='bn';
          global.config.GL_LANG_NAME='Bengali';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    
      case 'or':
      
        console.log("or");
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'or');
          global.config.GL_LANG_CODE='or';
          global.config.GL_LANG_NAME='Odia';
          global.config.POST_URL="https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/";
          break;
          
      case 'hi':
      
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hi'); 
          global.config.GL_LANG_CODE='hi';
          global.config.GL_LANG_NAME='Hindi';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    
      case 'gu':
     
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'gu'); 
          global.config.GL_LANG_CODE='gu';
          global.config.GL_LANG_NAME='Gujarati';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
      case 'kn':
     
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'kn'); 
          global.config.GL_LANG_CODE='kn';
          global.config.GL_LANG_NAME='Kannada';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'ta':
     
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'ta'); 
          global.config.GL_LANG_CODE='ta';
          global.config.GL_LANG_NAME='Tamil';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'te':
     
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'te'); 
          global.config.GL_LANG_CODE='te';
          global.config.GL_LANG_NAME='Telugu';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'hu':
     
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hu'); 
          global.config.GL_LANG_CODE='hu';
          global.config.GL_LANG_NAME='Hungarian';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
      default:
      
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'en'); 
          global.config.GL_LANG_CODE='en';
          global.config.GL_LANG_NAME='English';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
   }  
  }

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
    
  function DrawerRoutes(){
    return(
    <Drawer.Navigator initialRouteName="Home" 
    screenOptions={{headerShown:false,
      drawerStyle:{backgroundColor: '#D5C0A4'},
      drawerItemStyle:{borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.4)',width:"100%", paddingVertical: 7,paddingHorizontal:5, marginHorizontal: 0,marginVertical: 0, },
       drawerType:'front',
       drawerActiveBackgroundColor: 'rgba(255,255,255,0.2)',
       drawerActiveTintColor: '#582c24',
       drawerInactiveTintColor: '#582c24',

      }}>
      <Drawer.Screen name="Home" component={Game} options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/homela.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="Profile" component={Profile}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/registerla.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
        <Drawer.Screen name="Shop" component={Shop}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/registerla.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="About" component={Aboutus}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/bookmark_1la.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="Contact us" component={Contact}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/messege1la.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
    </Drawer.Navigator>
    )
  }

  return (
    <>
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Game" component={DrawerRoutes} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="ChatGPT" component={chatGPT}/>
        <Stack.Screen name="recentMoves" component={recentMoves}/>
        <Stack.Screen name="Help" component={Help}/>
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Language" component={Language} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
export default App;
 

