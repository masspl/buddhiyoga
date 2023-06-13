import React,{useEffect,useState,useRef} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,TouchableWithoutFeedback,Share
} from 'react-native';

import PostsPictureComponent from '../components/PostsPictureComponent';
import PostsContentComponent from '../components/PostsContentComponent';
import {WP_URL_POST}  from '@env';
import Postsheader from '../components/postsheader';
import PostBottomSticky from '../components/postBottomStickyTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Posts= (props,{navigation}) => {
  console.log(props)
    const [postList, setPostList] = React.useState([]);
    const [postId,setPostId] = React.useState(props.route.params.postId);
    const slideUpValue= new Animated.Value(0);
    const slideDownValue= new Animated.Value(1);    

    useEffect(()=>{
         getPosts();
    },[postId]);

    useEffect(()=>{
         if(postList.length >0){
        _start();
        _end();
         }
    },[postList.length])


    handleBackButtonClick= () => {
        console.log(props);
        props.navigation.goBack(null);
        return true;
      }
      
    
    async function getPosts() {
      var lang_url=await AsyncStorage.getItem('postUrl');
      if(lang_url===null)
      {
          lang_url=WP_URL_POST;
      }
        try {
        // console.log(WP_URL_POST+''+postId);
        let response = await fetch(
          lang_url+''+postId,
        );
        let responseJson = await response.json();
        postlist=responseJson;
        setPostList([postlist])
        
        return responseJson;
        } catch (error) {
        console.error(error);
        }
       
      }    
      const _start = async () => {
        return Animated.parallel([
          Animated.timing(slideUpValue, {
    
            toValue: 1,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };
      const _end = async () => {
        console.log("hello")
        return Animated.parallel([
          Animated.timing(slideDownValue, {
    
            toValue: 0,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };
      const defaultFontSize=20;
      const [fontSize, setfontSize]=useState(20);
      
      const increaseSize=()=>{
        if(fontSize<=30)
        {
          setfontSize(fontSize+1);
        }
      }
      const decreaseFont=()=>{
        if(fontSize>=defaultFontSize)
        {
          setfontSize(fontSize-1);
        }
      }

      const postComment=()=>{
        props.navigation.navigate('Comment',{postId:postId});
      }

      const sharePost=async()=>{
        try {
          // console.log(postList!=null);
          const result = await Share.share({
            message: postList!=null?postList[0].link:"https://buddhiyoga.in/site/en/",
            url: postList!=null?postList[0].link:"https://buddhiyoga.in/site/en/",
            title: 'BuddhiYoga',

          },
          {
            dialogTitle:'BuddhiYoga'
          });
          if (result.action === Share.sharedAction) {
            console.log('Shared successfully');
          } else if (result.action === Share.dismissedAction) {
            console.log('Sharing cancelled');
          }
        } catch (error) {
          console.log(error.message);
        }
      }

    return (<>
    <SafeAreaView style={styles.cardViewOverAll}>
            <View style={{backgroundColor:"#cfc19f", position: 'relative'}}>
              <Postsheader navigation={props.navigation}/>
              {/* <FloatingFont increaseFont={increaseSize} decreaseFont={decreaseFont} sharePost={sharePost} postID={postId} /> */}
              <PostBottomSticky increaseFont={increaseSize} decreaseFont={decreaseFont} postShare={sharePost} postComment={postComment}/>
              
            {
            (postList.length>0) ?( 
              <View>
                <Animated.View

                style={{
      
                  transform: [
      
                    {
      
                      translateY: slideUpValue.interpolate({
      
                        inputRange: [0, 1],
      
                        outputRange: [900, 0]
      
                      })
      
                    }
      
                  ],
                }}
      
              >
                
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <PostsPictureComponent postId={15} subTitle={postList[0].excerpt.rendered} fontSize={fontSize} title={postList[0].title.rendered} imageUrl={postList[0].better_featured_image.media_details.sizes.large.source_url} />
                        <PostsContentComponent subTitle={postList[0].excerpt.rendered} title={postList[0].title.rendered} content={postList[0].content.rendered} fontSize={fontSize}/>
                    </ScrollView>
                   
                
               
                 </Animated.View>
                 
                 </View>
                 
                 
            ):(<Animated.View style={{
      
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
            }}>
              <SafeAreaView style={styles.screen}>
              <View >
              <Text>
                Loading ...
            </Text>
            </View>
            </SafeAreaView>
            </Animated.View>)
        }
        
          </View>
           <View style={{width:"100%",height:"40%",backgroundColor:"#cfc19f"}}></View>
           </SafeAreaView>
    
    </>);

};

const styles = StyleSheet.create({
    screen:{
        
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"100%",
        backgroundColor: "#cfc19f"
    },
    cardViewOverAll:{
        width:"100%",
        height:"100%",
        backgroundColor:'#cfc19f',
        // marginVertical:20,
        
    },
    cardView:{
        paddingTop:"10%",
        width:"75%",

    }
    }
    );


export default Posts;
