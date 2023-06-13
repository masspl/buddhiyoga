import React,{useEffect,useState} from "react";
import { Text ,View, StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { Blurhash } from "react-native-blurhash";

const PostsPictureComponent = (props) => {
  
const [imageLoad, setImageLoad] = React.useState(false);


function onLoading(value)
{
  setImageLoad(value);
}

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
      backgroudColor:'#F2D997',
      fontSize: props.fontSize,
    },
    a: {
      color: 'green'
    }
    };
	
	return(
    <>
    
		<Card style={Styles.container}>
		<Card.Content>
		</Card.Content>
    {  imageLoad && <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', zIndex:1}}>
  
          <ActivityIndicator  color={'black'} style={{flex : 1, justifyContent: 'center', alignItems: 'center', zIndex:1}} />
        
        </View>
    }
    {
		<Card.Cover style={imageLoad?{display:'none'}:{}}source={{ uri: props.imageUrl }} onLoadStart={() => onLoading(true)} onLoadEnd={()=>onLoading(false)}  />}
	<Card.Content>
  {/* <RenderHtml
      source={{
        html: props.subTitle
      }}
      tagsStyles={tagsStyles}
    /> */}
		</Card.Content>
	</Card>
  </>
	)
}
export default PostsPictureComponent;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginVertical:20,
    marginHorizontal: 10,
    padding:10,
    backgroundColor:'#F2D997'
	}
})
