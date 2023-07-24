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
    ScrollView,
    Dimensions
  } from 'react-native';
  import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    const scrollViewRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
  
    const handleScroll = (event) => {
        console.log(event.nativeEvent.contentOffset.x+"hello"+event.nativeEvent.layoutMeasurement.width)
      const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
      console.log(page)
      setCurrentPage(page);
    };
    
  
    // const handleSwipe = (pageIndex) => {
    //   if (scrollViewRef.current) {
    //     const offset = pageIndex * Dimensions.get('window').width;
    //     scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
    //   }
    // };
  
    const images = [
        require('../assets/login/MinistryEducation.png'),
        require('../assets/login/IKS.png'),
        require('../assets/login/MinistryEducation.png'),
        require('../assets/login/IKS.png'),
        require('../assets/login/MinistryEducation.png'),
        require('../assets/login/IKS.png'),   
              
      ];
      useEffect(()=>{
        
        const toggle = 
        setInterval(() => {
            setCurrentPage(currentPage === images.length - 1 ? 0 : currentPage + 1);
        }, 2000);
        console.log(currentPage);
    
        return () => clearInterval(toggle);
      })
    return(
        <>
    <View style={styles.screen}>
    <View style={{ width: '100%', alignItems: 'center',height:'100%', justifyContent:'center',}}>
       
        <View style={{width: '100%', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', height: '22%',}}>
        <Image source={require("../assets/login/buddhiyoga_logo.png")} style={{width:120,height:120}} />
        </View>
           {/* logo */}
           <TouchableWithoutFeedback onPress={()=>checkOnPress()}>
           <Animated.Image  style={[styles.logo,
           {transform : [{rotate:RotateData}]}
            ]}
            source={require("../assets/login/buddiyogaLogo.png")}>
            </Animated.Image>
            </TouchableWithoutFeedback>
            {/* line */}
            {/* <Animated.View style={[styles.logoShadow,viewLengthStyle]}></Animated.View> */}
            {/* button */}
         <Animated.View style={{width: '100%',marginVertical: 25,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim,}}>
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
        </View>
       
       {/* <View style={{flexDirection: 'row'}}> */}
        <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View style={{alignItems: 'center', flexDirection: 'row', padding: 10, width: Dimensions.get('screen').width/3}}>
          <Image key={index} source={image} style={{ width: 100, height: (index==0||index%2==0)?90: 100 }}  />
          
          </View>
        ))}
      
        </ScrollView>
        {/* </View> */}
        {/* <Image source={require("../assets/login/MinistryEducation.png")} style={{width:100,height:100}}/>
                            <Image source={require("../assets/login/IKS.png")} style={{width:100,height:100}}/>
                            <Image source={require("../assets/login/buddhiyoga_logo.png")} style={{width:100,height:100}}/> */}
  
        </>
    )   
}
const styles = StyleSheet.create({
    screen:{
        alignItems:"center",
        justifyContent:'center',
        flexDirection: 'column',
        width:"100%",
        height:"80%",
        // backgroundColor: 'red'
       
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