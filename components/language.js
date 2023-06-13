import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet,SafeAreaView, Text, Pressable, View, TouchableWithoutFeedback} from 'react-native';
import PostHeader from './postsheader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANG_CODE,WP_URL_POST} from '@env';
import '../globalVariables';
import {NativeModules, Platform } from 'react-native';
function Language({navigation}){
   

  // const fetchAppLang = async () => {
  //   const locale = Platform.select({
  //     ios: NativeModules.SettingsManager?.settings?.AppleLocale || NativeModules.SettingsManager?.settings?.AppleLanguages[0],
  //     android: NativeModules.I18nManager.localeIdentifier,
  //   });
  //   console.log(locale);

  //   // if(locale.includes('en')){
  //   //   i18n.changeLanguage('en');
  //   // } else if(locale.includes('hi')){
  //   //   i18n.changeLanguage('hi');
  //   // } else{
  //   //   i18n.changeLanguage('en');
  //   // }
  // }

// useEffect(() => {
//   fetchAppLang();
// },[]);




    const setLanguage=async(id)=>{
      if(id ===1)
      {
        await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
        await AsyncStorage.setItem("gameBoard", 'en');
        global.config.GL_LANG_CODE='en';
      }
      else if(id === 2)
      {
        await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
        await AsyncStorage.setItem("gameBoard", 'or');
        global.config.GL_LANG_CODE='or';
      }
    }
  return (
    <SafeAreaView style={styles.cardViewOverAll}>
    <PostHeader navigation={navigation}/>
    <View style={styles.mains}>
      <TouchableWithoutFeedback onPress={()=>setLanguage(1)}>
    <Text style={styles.textstyle}>English</Text>       
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>setLanguage(2)}>
    <Text style={styles.textstyle}>Odiya</Text>       
    </TouchableWithoutFeedback>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textstyle:{
    fontSize:25,
    paddingTop:10,
    marginLeft:10,
    fontWeight:"bold",
    textAlign:'left',
    
  },
  mains:{
    paddingHorizontal: 15,
    backgroundColor: 'rgba(183,153,114,0.25)',
    height: '100%',
},
  cardViewOverAll:{
    width:"100%",
    height:"100%",
    backgroundColor:'#cfc19f',
    // marginVertical:20,
    
},
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default Language;