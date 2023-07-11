import React, { useState,useRef } from "react";
import { useEffect } from "react";
import { Text , View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
const PostsContentComponent = (prop) => {
	const [source,setNewHtml]=useState([]);
	const [clickedStatus, setClickedStatus] = useState(false);
    // const [rowTapped,setRowTapped]=useState(false);
	const rowTapped = useRef(false);
    const cellIndex = useRef();
    const rowTappedStatus=useRef(false);


	useEffect(()=>{
		 getHtml();
	},[]);

	

	const getHtml=()=>{
		console.log("dataall"+prop.content);
		console.log(prop.subTitle);
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
	const cellInformaion=(index)=>{
		// if(clickedStatus)
		// {
		
		cellIndex.current=index;
			
		// rowTapped.current=rowTapped.current==false?true:false; 
		// if(clickedStatus==false){
		  
		  setClickedStatus(clickedStatus==false?true:false)
		// }
		// else{
		// 	setClickedStatus(false)
		// }

		  console.log(rowTapped.current)
			console.log(cellIndex.current)

		// if(cellIndex.current===index)
		//   {
		// 	// rowTappedStatus.current=true;
		// 	// setRowTapped(!rowTapped)
		// 	rowTapped.current=rowTapped.current==false?true:false; 
		//   }
	
		
		// }
	  }
	// console.log("data: "+data);
    if (typeof data === 'string') {
      // Replace HTML tags with custom styles
      const replacedHTML = data
	    .replace("&#8217;", "'").replace('&#8211;', "-")
	    .replace("&nbsp;", " ").replace("&nbsp;", " ")
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
				<View style={Styles.container}>
					<View style={Styles.cardContent}>
						<View key={index}>			
						<TouchableWithoutFeedback key={index} onPress={()=>cellInformaion(index)}>	
						<View style={Styles.heads}>
							<Text style={Styles.headings}>Excerpt</Text>
							</View>
						</TouchableWithoutFeedback>
							<Animated.View style={[cellIndex.current===index ? (clickedStatus==true?{height: 'auto'}:{height: 0}):{height: 0}]}>
							<Text style={Styles.contents}>{renderHTML(prop.subTitle)}</Text>
							</Animated.View> 
						</View>
				
					</View>

				</View>
				:
				<></>
			}
			<View style={Styles.container}>
					<View style={Styles.cardContent}>
						<View key={index}>		
						<TouchableWithoutFeedback key={index} onPress={()=>cellInformaion(index)}>	
							<View style={Styles.heads}>
								<Text style={Styles.headings}>{renderHTML(key[0])}</Text>
							</View>
						</TouchableWithoutFeedback>
							<Animated.View style={[cellIndex.current===index ? (clickedStatus==true?{height: 'auto'}:{height: 0}):{height: 0}]}>
                     			            
									<Text style={Styles.contents}>{renderHTML(key[1])}</Text>
									{/* cellIndex.current===index ? (rowTapped.current==false ? {height: 0}:{height: 'auto'} ): {height: 0} */}
								
                   			</Animated.View> 
						</View>
				
						</View>

				</View>
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
		marginVertical:10,
    marginHorizontal: 10,
    paddingHorizontal:20,
    // backgroundColor:'#F2D997',
    backgroundColor:'#F2D997',
	borderRadius: 15,
	borderWidth: 1,
	// elevation: 1,
	borderColor: 'rgba(0,0,0,0.2)',

	},
	cardContent:{
		// borderRadius: 20,
	},
	heads:{
		position: 'relative',
		padding: 10,
		borderColor: 'rgba(0,0,0,0.4)',
		
		borderBottomWidth: 1,
	},
	headings:{
		width: '100%',
			paddingVertical:20,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#594039',
		
	  },
	  contents:{
		width: '100%',
		paddingVertical:20,
		fontSize: 15,
		color: '#000',
	  }
})