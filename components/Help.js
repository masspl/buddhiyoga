import React,{useState, useRef} from "react";
import { View,Text,SafeAreaView, ScrollView,StyleSheet,Image, Dimensions,TouchableOpacity } from "react-native";
import Postsheader from './postsheader';

const Help = ({navigation}) =>{
  const {width, height} = Dimensions.get('window');
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    var page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentPage(page);
  };
  const handleSwipe = (pageIndex) => {
    console.log(currentPage);
    if (scrollViewRef.current) {
      const offset = (Dimensions.get('window').width-20) * pageIndex ;
      scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
    }
    setCurrentPage(pageIndex);
  };

   
 
    return (
        <>
        <SafeAreaView style={{}}>
        <Postsheader navigation={navigation} />
        
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)', height: height-55, width: width, padding: 10}}>
        <ScrollView style={{}} ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={{width: width-20, height: height-55, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1,}}>
          
          <View style={{flexDirection: 'row', borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1, padding: 10}}>
          <Image source={require('../assets/login/buddhiyoga_logo.png')} style={{width: 50, height: 50, marginRight: 15}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'rgba(88, 44, 36,1)', lineHeight: 25}}>How to play the game</Text>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 25}}>Rules of Buddhiyoga</Text>

          </View>
         </View>
         <View style={{paddingHorizontal: 15, paddingVertical: 35}}>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 20}}>
                1) You are in 'Eternal Bliss' (cell 68) when you first roll dice. {'\n'}{'\n'}
                2) A throw of 6 forces you out of this state and lands you in 'Delusion' (cell 6). {'\n'}{'\n'}
                3) Each throw of the dice, thereafter, traces your 'karmic' path back towards bliss. {'\n'}{'\n'}
                4) Follow the path, take the ladders and know the snakes. Explore your world view as you play. {'\n'}{'\n'}
                5) The game is unending and you can choose to explore a new path if you land on 'Eternal Bliss' again.
            </Text>
          </View>
         
        </View>  

        <View style={{width: width-20, height: height-55, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1,}}>
         
          <View style={{flexDirection: 'row', borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1, padding: 10}}>
          <Image source={require('../assets/login/buddhiyoga_logo.png')} style={{width: 50, height: 50, marginRight: 15}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'rgba(88, 44, 36,1)', lineHeight: 25}}>Buddhiyoga</Text>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 25}}>Cell Information</Text>

          </View>
         </View>
         <View style={{paddingHorizontal: 15, paddingVertical: 35}}>
         <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 20}}>
              
         Double tap on any cell to explore more.{'\n'}
       
            </Text>
            <Image source={require('../assets/other/howtoplatimages/1c.jpg')} style={{width: width-50, height: 500, resizeMode: 'contain'}} />
          </View>
          
        </View>  

        <View style={{width: width-20, height: height-55, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1,}}>
          <View style={{flexDirection: 'row', borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1, padding: 10}}>
          <Image source={require('../assets/login/buddhiyoga_logo.png')} style={{width: 50, height: 50, marginRight: 15}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'rgba(88, 44, 36,1)', lineHeight: 25}}>Buddhiyoga</Text>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 25}}>Detailed view of the cell</Text>

          </View>
         </View>
         <View style={{paddingHorizontal: 15, paddingVertical: 35}}>
            
            <Image source={require('../assets/other/howtoplatimages/3c.jpg')} style={{width: Dimensions.get('window').width-50, height: 500, resizeMode: 'contain'}} />
          </View>
        </View>  

        <View style={{width: width-20, height: height-55, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1,}}>
          <View style={{flexDirection: 'row', borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1, padding: 10}}>
          <Image source={require('../assets/login/buddhiyoga_logo.png')} style={{width: 50, height: 50, marginRight: 15}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'rgba(88, 44, 36,1)', lineHeight: 25}}>Buddhiyoga</Text>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 25}}>Footer Information</Text>

          </View>
         </View>
         <View style={{paddingHorizontal: 15, paddingVertical: 35}}>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 20}}>
               Watch footer when you land on the cell
            </Text>
            <Image source={require('../assets/other/howtoplatimages/2c.jpg')} style={{width: Dimensions.get('window').width-50, height: 500, resizeMode: 'contain'}} />
          </View>
        </View> 
        <View style={{width: width-20, height: height-55, backgroundColor: '#fff', borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1,}}>
          <View style={{flexDirection: 'row', borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 1, padding: 10}}>
          <Image source={require('../assets/login/buddhiyoga_logo.png')} style={{width: 50, height: 50, marginRight: 15}} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'rgba(88, 44, 36,1)', lineHeight: 25}}>Buddhiyoga</Text>
            <Text style={{color: 'rgba(88, 44, 36,0.5)', lineHeight: 25}}>Header Information</Text>

          </View>
         </View>
         <View style={{paddingHorizontal: 15, paddingVertical: 35}}>
            <Image source={require('../assets/other/howtoplatimages/4c.jpg')} style={{width: Dimensions.get('window').width-50, height: 500, resizeMode: 'contain'}} />
          </View>
        </View>  
        </ScrollView>
        </View>
        
        </SafeAreaView>
                   
        </>
    )
}
export default Help;

const styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginBottom:100,
    marginHorizontal: 10,
    padding:10,
	backgroundColor:'#F2D997'
	},
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  }
})


