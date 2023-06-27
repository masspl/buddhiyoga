import React, { useState } from "react";
import { useEffect } from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
const PostsContentComponent = (prop) => {
	console.log(global.config.GL_LANG_NAME);
	const [source,setNewHtml]=useState([]);
	useEffect(()=>{
		 getHtml();
		 console.log(global.config.GL_LANG_NAME)
	},[]);

	const getHtml=()=>{
		
		var splitContent=prop.content.split("<!-- Start -->");
		var postContents=[];
		// console.log("Length: "+splitContent)
		if(splitContent.length < 2)
		{
			splitContent=prop.content.split("<!-- Start -->");
		}
		splitContent.forEach((element,index) => {
			var arr=[];
			if(index>0){
				
				arr=element.split("</br></br>");
				postContents.push(arr);
			}
			// if(index==1){
			// 	excerptSubtitle=
			// 	arr=["Excerpt",]
			// }			
		});
		console.log("datatype: "+postContents.length);
		// var newContent=splitContent[1];
		// // console.log("Content: "+newContent);
		// var str="<strong>Audio</strong>";
		// var excerpt="<p><strong>Excerpt</strong></p>"+prop.subTitle+str;
		// var newStr= newContent.split(str);
		// newContent=newStr[0]+excerpt+newStr[1];
		// splitContent=newContent.split("<p>[/et_pb_text]");
		// console.log(splitContent);
		setNewHtml(postContents);
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

  const renderHTML = (data) => {
	console.log("data: "+typeof(data));
    if (typeof data === 'string') {
      // Replace HTML tags with custom styles
      const replacedHTML = data
        .replace(/<strong>/g, '').replace(/<\/strong>/g, '') 
		// .replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
		// 	return <Text style={{ fontWeight: 'bold' }}>{JSON.stringify(p1)}</Text>;
		//   })
        .replace(/<em>/g, '').replace(/<\/em>/g, '') 
        .replace(/<\/br>/g, '\n')
        .replace(/<span>/g, '').replace(/<\/span>/g, '') 
        .replace(/<hr>/g, '').replace(/<br \/>/g, '')
		.replace(/<!-- Start of Story  --/g, '').replace(/<!-- End of Story. --/g, '')
		.replace(/<!-- Start On the gameboard. --/g, '').replace(/<!-- End of On the gameboard. --/g, '')
		.replace(/<!---->/g, '').replace(/<\/p>/g, '').replace(/<p>/g, '')
		; // Remove <h3> tags

      return (
        <Text>{replacedHTML}</Text>
      );
    }
	if (typeof data === 'object' && data !== null) {
		return (
			
		  <View>
{/* 			
			{Object.keys(data).map((key, index) => (
			  <View key={index}>
				<Text style={{ fontWeight: 'bold' }}>{key}: </Text>
				<View>{renderHTML(data[key])}</View>
			  </View>
			))} */}

			{data.map((key,index) => (	
				<>
				{index == 1 ?
				<Card style={Styles.container}>
					<Card.Content>
						<View key={index}>			
							<Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>Excerpt</Text>
							<Text style={{color: '#000', fontSize: 16}}>{renderHTML(prop.subTitle)}</Text>
						</View>
				
					</Card.Content>

				</Card>
				:
				<></>
			}
			<Card style={Styles.container}>
					<Card.Content>
						<View key={index}>			
							<Text style={{color: '#000',fontWeight: 'bold', fontSize: 18}}>{renderHTML(key[0])}{'\n'}</Text>
							<Text style={{color: '#000', fontSize: 16}}>{renderHTML(key[1])}</Text>
						</View>
				
					</Card.Content>

				</Card>
			</>
			))}
		  </View>

			
		
		
		);
	  }
  
	  return null;
	};
  
	return(
	
			<View style={{paddingBottom: 200}}>
			  {renderHTML(source)}
			</View>
		
	)
}
export default PostsContentComponent;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginBottom:20,
    // marginHorizontal: 10,
    padding:10,
	backgroundColor:'#F2D997'
	}
})