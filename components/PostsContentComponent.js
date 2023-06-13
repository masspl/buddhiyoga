import React, { useState } from "react";
import { useEffect } from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
const PostsContentComponent = (prop) => {
	// console.log("Content: "+prop.content);
	const [source,setNewHtml]=useState({html:"Loading..."});
	useEffect(()=>{
		 getHtml();
	},[source.html.length]);

	const getHtml=()=>{
		
		var splitContent=prop.content.split("Start of Meaning & Audio  --></p>");
		// console.log("Length: "+splitContent.length)
		if(splitContent.length < 2)
		{
			splitContent=prop.content.split("Start of Meaning & Audio --></p>");
		}
		var newContent=splitContent[1];
		// console.log("Content: "+newContent);
		var str="<strong>Audio</strong>";
		var excerpt="<p><strong>Excerpt</strong></p>"+prop.subTitle+str;
		var newStr= newContent.split(str);
		newContent=newStr[0]+excerpt+newStr[1];
		splitContent=newContent.split("<p>[/et_pb_text]");
		// console.log(splitContent);
		setNewHtml({html:splitContent[0]});
	}
  const tagsStyles = {
	body: {
	  whiteSpace: 'normal',
	  color: 'black',
	  backgroudColor:'#F2D997',
	  fontSize: prop.fontSize,
	},
	a: {
	  color: 'black'
	}
  };
  
	return(
		
		<Card style={Styles.container}>
	<Card.Content>
  <RenderHtml
      source={source}
	  tagsStyles={tagsStyles}
    />
		</Card.Content>
	</Card>
		
	)
}
export default PostsContentComponent;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginBottom:100,
    marginHorizontal: 10,
    padding:10,
	backgroundColor:'#F2D997'
	}
})
