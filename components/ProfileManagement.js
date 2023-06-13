import React from "react";
import { View,Text,StyleSheet,TextInput,TouchableWithoutFeedback } from "react-native";

function ProfileManagement({props}){
   
   
    return (
        <>
        
            <View>
                <Text style={styles.headings}>Profile Management</Text>
                <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Name"
        // value={name}
        onChangeText={newValue => setName(newValue)}
      />
                <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Email"
        // value={name}
        onChangeText={newValue => setName(newValue)}
      />
                      <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Phone"
        // value={name}
        onChangeText={newValue => setName(newValue)}
      />
                      {/* <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Password"
        // value={name}
        onChangeText={newValue => setName(newValue)}
      /> */}
        
        <TouchableWithoutFeedback style={{}} >
    <View>
            <Text style={styles.btnstext}>Submit</Text>
            </View>

        </TouchableWithoutFeedback>
</View>
         
       
        </>
    )
}
export default ProfileManagement;

// const Styles = StyleSheet.create({
// input:{}
// });
const styles = StyleSheet.create({
	headings :{
		marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(183,153,114,1)',
	},
    input :{
        backgroundColor: 'rgba(183,153,114,0.15)',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    btnstext:{
        textAlign: 'center',
        backgroundColor: "rgba(183,153,114,1)",
        color: '#fff',
        marginVertical: 20,
        paddingVertical: 8,
        borderRadius: 10,


        // width: 80,
        // textAlign: 'center'
    }
})