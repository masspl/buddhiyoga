import React,{useState,useEffect} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated,View,Text,Image, TouchableWithoutFeedback,SafeAreaView ,Dimensions,TextInput,Easing,TouchableOpacity,ScrollView,StyleSheet} from "react-native";
import Postsheader from './postsheader';
import {COMMENT_URL}  from '@env';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
const Comment = (props) =>{
    
    const [postID,setPostID]=useState(props.route.params.postId);
    console.log(postID);
    const [postComment,setPostComment]=useState("");
    const [postCommentStatus,setPostCommentStatus]=useState(false);
    const [commentArrays,setCommentArray]=useState([]);
    const slideUpValue= new Animated.Value(0);
    const slideDownValue= new Animated.Value(1);   
    const { width, height } = Dimensions.get('window');
    useEffect(()=>{
        if(commentArrays.length<=0)
        {
            getComment();
        }
        
    },[commentArrays.length]);

    const getComment =async()=>{

        try {
            console.log(COMMENT_URL+''+postID);
            let response = await fetch(
                COMMENT_URL+'?post='+postID,
            );
            let responseJson = await response.json();
            var tempJson={};
            var tempArray = [];
            for(let i=0; i<responseJson.length; i++)
            {
                tempJson={auth:responseJson[i].author_name,date:Date(responseJson[i].date),source:{html:responseJson[i].content.rendered}};
                tempArray.push(tempJson);
            }
           setCommentArray(tempArray);
           setPostCommentStatus(true);
            } catch (error) {
            console.error(error);
            }
    }
    const tagsStyles = {
        body: {
          whiteSpace: 'normal',
          color: 'black',
          backgroudColor:'#F2D997',
          fontSize: 12,
        },
        a: {
          color: 'black'
        }
      };
      const submitButonHandler=async()=>{
        var userStorageData=await AsyncStorage.getItem('buddhiyogaUserData');
        console.log(userStorageData);
        // if(Object.keys(JSON.parse(userStorageData)).length >0 ||userStorageData != null || userStorageData!=undefined)
        if(userStorageData != null)
      {
        userStorageData=JSON.parse(userStorageData);
        let data = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
          post:postID,
          parent:0,
          author:userStorageData.userID,
          author_name:userStorageData.name,
          author_email:userStorageData.email,
          date:new Date(),
          date_gmt:new Date(),
          content:postComment,
          status:"approved",
          

          }),
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic YnVkZGhpeW9nYTpHZEpSIDdYeFUgdHQ5YyBlSFZ2IFZCcnIgVHhEdg=='
          },
          
        };
        let response=  await fetch(COMMENT_URL,data)
    .then(response => response.json())  // promise
    .then(async(json) =>{
      console.log(json);
      if(json.hasOwnProperty("data"))
      { 
        alert("Duplicate comment");
        
      }
      else{
        
        var temp=commentArrays;
      var tempJson={auth:json.author_name,date:Date(json.date),source:{html:json.content.rendered}};
      temp.push(tempJson);
      setCommentArray(temp);
      setPostComment("");
      }
      
     } )
      }
      else{
        alert("Please Sign in before continuing!!!");
        props.navigation.navigate("Profile",{postId:postID});
      }
      }

    return(
       <>
      <SafeAreaView style={styles.cardViewOverAll}>
            {/* <View style={{backgroundColor:"#cfc19f"}}> */}
              <Postsheader navigation={props.navigation}/>
  
{
(postCommentStatus) ?( 


  <View style={{height: '90%',flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
    <Animated.View>
    
    <ScrollView style={{marginBottom: 60}}>
            {
              commentArrays.length>0 ?
        commentArrays.map((data)=>
     
     <Card style={styles.container}>
         <Card.Content>
         <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Title style={{width: 40, height: 40,backgroundColor: "rgba(183,153,114,1)",borderRadius: 50, textAlign: 'center',lineHeight: 35, marginRight: 15}}>{data.auth.charAt(0).toUpperCase()}</Title>
             <Text style={{textTransform: 'capitalize', fontSize: 15,color: '#563229'}}>{data.auth}</Text> 
             </View>
             {/* <Paragraph>{data.msg}</Paragraph>  */}
             <RenderHtml
                 source={data.source}
                 tagsStyles={tagsStyles}
                 />
         </Card.Content>
     </Card>
        ):
        <Card style={styles.container}>
         <Card.Content>
         <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {/* <Title style={{width: 40, height: 40,backgroundColor: "rgba(183,153,114,1)",borderRadius: 50, textAlign: 'center',lineHeight: 35, marginRight: 15}}>{data.auth.charAt(0).toUpperCase()}</Title> */}
             <Text style={{textTransform: 'capitalize', fontSize: 15,color: '#563229'}}>No Comments</Text> 
             </View>
             {/* <Paragraph>{data.msg}</Paragraph>  */}
             {/* <RenderHtml
                 source={data.source}
                 tagsStyles={tagsStyles}
                 /> */}
         </Card.Content>
     </Card>
      }
    </ScrollView>

     </Animated.View>
            <View style={{backgroundColor: "rgba(183,153,114,1)",position: 'absolute',zIndex: 1, flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
     <TextInput
     multiline={true}
             style={styles.input}
             autoCapitalize='none'
             autoCorrect={false}
            
             placeholder="Type here..."
             value={postComment}
             onChangeText={newValue => setPostComment(newValue)}
           />
            <TouchableWithoutFeedback style={{}} onPress={()=>submitButonHandler()}>
                 <View style={{width: '25%',backgroundColor: '#563229', marginVertical: 10, borderRadius: 10, paddingHorizontal: 10}}>
                 <Text style={[{width: '100%',textAlign: 'center',  color: '#fff',lineHeight: 28,padding: 0},styles.btnstext]}>Submit</Text>
                 {/* <Loader/> */}
                 </View>
                 </TouchableWithoutFeedback>
                 </View>
     
     </View>
     
                
     
):(<Animated.View 
  style={{

  transform: [

    {

      translateY: slideDownValue.interpolate({

        inputRange: [0, 1],

        outputRange: [600, 1]

      })

    }

  ],
  width:"100%",
  height:"100%"
}}
>
  <SafeAreaView style={styles.screen}>
  <View >
  <Text>
    Loading ...
</Text>
</View>
</SafeAreaView>
</Animated.View>)
}



{/* </View>
<View style={{width:"100%",height:"40%",backgroundColor:"#cfc19f"}}></View> */}
</SafeAreaView>
       </>
    )
}
const styles = StyleSheet.create({
  input :{
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10, 
    fontSize: 11,
    // height: 30,
    width: '55%',
    padding: 0
},
    cardViewOverAll:{
        width:"100%",
        height:"100%",
        backgroundColor:'#cfc19f',
        paddingBottom:0
        
    },
    container :{
		alignContent:'center',
		marginVertical:10,
    marginHorizontal: 10,
    // padding:10,
	  backgroundColor:'#F2D997'
	},
    screen:{
        
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"100%",
        backgroundColor: "#cfc19f"
    },
    btnstext:{
      // textAlign: 'center',
      // backgroundColor: "rgba(183,153,114,1)",
      // color: '#fff',
      // marginVertical: 20,
      // paddingVertical: 8,
      // borderRadius: 10,
    }
    }
    );
export default Comment;