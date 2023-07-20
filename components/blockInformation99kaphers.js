import React,{useState,useEffect} from "react";
import { Animated,Text, TouchableWithoutFeedback ,Easing,ScrollView,Image,View} from "react-native";
import {WP_URL_POST}  from '@env';
import '../globalVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BlockInformation = ({setrotation,rotation,excerpt,postName,postId,navigation}) => {
   
    const [isRotating, setRotation] = useState(true);
    // console.log("bl"+rotation);
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [postList, setPostList] = React.useState([]);

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

    useEffect(()=>{
         setRotation(rotation);
    },[rotation]);

    useEffect(()=>{
        getPosts();
         
   },[postId]);

   function getText(html){
    return html.replace(/<[^>]+>/g, '');
}

    async function getPosts() {
        try {
            var POST_URL=await AsyncStorage.getItem("postUrl");
        let response = await fetch(
            POST_URL+''+postId
        );
        let responseJson = await response.json();
        postlist=responseJson;
        setPostList([postlist])
        
        return responseJson;
        } catch (error) {
        console.error(error);
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
        outputRange: ['40%','100%']
    });

    const viewLengthStyle={
        height: lengthData
    }

    const checkOnPress = ()=>{
        if(isRotating==true)
        setrotation(false);
        setRotation(!isRotating);
    }

return(
    <>
    <TouchableWithoutFeedback onPress={()=>checkOnPress()}> 

    <View style={{ backgroundColor: '#594039',padding: 8,width: 36, elevation: 5, alignSelf: 'flex-end'}}>
   

    {
        isRotating==true &&
        <Image source={require('../assets/other/up.png')} style={{width:20,height:15,zIndex: 1, top:0}}/>
        ||
        <Image source={require('../assets/other/down.png')} style={{width:20,height:15,zIndex: 1, top:0}}/>
    }
    </View>

    </TouchableWithoutFeedback>
        
    <Animated.View style={[{width:"100%", backgroundColor:"#de9c63",borderTopLeftRadius: 15,borderTopRightRadius: 0,borderColor:"black",paddingVertical:10},viewLengthStyle]}>
    
    {(postList.length>0 && isRotating==false)?(
        <>
       
             <TouchableWithoutFeedback onPress={()=>changePage()}>
            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",alignSelf:"center"}}>
                click here know more
            </Text>
            </TouchableWithoutFeedback>
            <ScrollView>     

            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',
        // backgroudColor:'#F2D997',
        fontSize: 13,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center",
    //    adjustsFontSizeToFit:true
    }}
        ellipsizeMode='tail'
       ><Text style={{fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>{postName} </Text>{getText(postList[0].excerpt.rendered)}</Text>
           </ScrollView>
            </>
            
        ):(
        <ScrollView>
        <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',
        // backgroudColor:'#F2D997',
        fontSize: 13,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center",
    //    adjustsFontSizeToFit:true
       }}>
               <Text style={{fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>{postName}</Text>- {excerpt}
        </Text>
        </ScrollView>
        )}
        
    </Animated.View>
    </>
    
)
function changePage ()
{
  navigation.navigate('Posts',{postId:postId})
}

}

export default BlockInformation;