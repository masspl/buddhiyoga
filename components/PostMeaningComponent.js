import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Card
} from 'react-native'


function PostMeaningComponent() {

    return (
    <View style={styles.screen}>
        {/* <View style={styles.heading}>
        <Text style={styles.htext}>Meaning</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.ctext}>ajsdhaksjdsadhasdhsakjdhsakdhsakjdhasdsadksadksahdsadhsadkjasjdasdjkaskdhasdas</Text>
        </View> */}
    
    <Card>
    {/* <Card.Title>HELLO WORLD</Card.Title>
    <Card.Divider/>
    {/* <Card.Image source={require('../images/pic2.jpg')} /> */}
    <Text style={{marginBottom: 10}}>
        The idea with React Native Elements is more about component structure than actual design.
    </Text>
    {/* <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' /> */}
  </Card>
  </View>
    )
};
const styles = StyleSheet.create({
  screen:{
      flex:2,
    //   alignItems:"center",
    //   justifyContent:'center',
    //   width:"50%",
    //   height:"50%",
      // backgroundColor: "#fff",
      // opacity:0.5
  },
  htext:{
    fontSize:20,
    fontWeight:"bold",
    // fontFamily:""
  },
  ctext:{

  },
  heading:{
    // padd
  },
  content:{

  },
  image:{
    width:200,
    height:200
  }
  }
  );


export default PostMeaningComponent;