import React from 'react';
import { View, Image, SafeAreaView,Dimensions,Text } from 'react-native';

import Hamburger from '../components/hamburger';

const Contact = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  
  return(
    <SafeAreaView>
        <Hamburger  navigation={navigation}/>
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)', height: height-55, width: width, padding: 15,}}>
      <View style={{ borderColor: 'rgba(88,44,36,0.2)', borderWidth: 1}}>
      
      <View style={{ backgroundColor: 'rgba(183,153,114,1)', paddingVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
                <Image source={require('../assets/game/board.jpg')} style={{width: 250,height:250,backgroundColor: '#fff',zIndex:-1}} />
              </View>
    <View style={{backgroundColor: 'rgba(183,153,114,0.5)', padding: 0}}>
      <Text style={{color: '#594039', fontSize: 15, textAlign: 'auto', padding: 10}}>
        The content on this website and streamed mobile application is essentially crowd sourced. The organisations supporting this project do not 
        take any responsibility for the same. The framework for content review is still in "work in progress". If you have any concerns regarding a 
        specific content streamed to your app, please take a screenshot of the same and share to given Email Id with your kind observations.
        </Text>
        <View style={{backgroundColor: 'rgba(183,153,114,1)', padding: 10, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(89,64,57,0.5)', alignItems: 'center',}}>
        <Image source={require('../assets/other/email.png')} style={{ width: 35, height: 35, marginRight: 15 }} />
        <Text style={{fontSize: 16, fontWeight: '500'}}>game@buddhiyoga.in</Text>
        </View>
    </View>
    </View>
    </View>
    </SafeAreaView>
);
}

export default Contact;
