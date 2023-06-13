import React from "react";
import { View,ActivityIndicator,StyleSheet,Text } from "react-native";

function Loader(){

    return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#563229"/>
          <Text style={{fontSize:30,color:"#563229",justifyContent:"center",padding:30}}>Fetching....</Text>
         </View>
)

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      // padding: 10,
      marginTop:20
    },
  });
export default Loader;