import React, { useEffect, useState, useCallback } from "react";
import { View,Text,StyleSheet,TextInput,TouchableWithoutFeedback,Animated,Easing, Dimensions, Image } from "react-native";
import{REGISTER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileManagement from "./ProfileManagement";
import AndroidOpenSettings from 'react-native-android-open-settings'
import Loader from "./loader";

function Register(props){
console.log(props);
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[phone,setPhone]=useState('');
const [status,setStatus]=useState(0);

const [userData,setUserData]=useState('');
const [submitStatus,setSubmitStatus] = useState(false);
const { width, height } = Dimensions.get('window');

useEffect(()=>{
  if(userData ==='')
  {
    checkUserStorage();
  }
  
});

const checkUserStorage=async()=>{
  
  var userStorageData=await AsyncStorage.getItem('buddhiyogaUserData');
  if(userStorageData!=null || userStorageData!=undefined)
  {
    if(Object.keys(JSON.parse(userStorageData)).length >0 )
    {
      setStatus(1);
      setUserData(userStorageData);
      userStorageData=JSON.parse(userStorageData);
      // console.log(userStorageData.name)
      setName(userStorageData.name);
      setEmail(userStorageData.email)
      setPassword(userStorageData.password);
      setPhone(userStorageData.phone);
    }
  }
}

    const submitButonHandler=async()=>{
      setSubmitStatus(true);
       let data = {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
          username:name,
          email:email,
          // phone:phone,
          password:password,
          "roles":["customer"]
          }),
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic YnVkZGhpeW9nYTpHZEpSIDdYeFUgdHQ5YyBlSFZ2IFZCcnIgVHhEdg=='
          },
        };
  let response=  await fetch(REGISTER_URL,data)
    .then(response => response.json())  // promise
    .then(async(json) =>{
      setSubmitStatus(false);
      // console.log(json.id);

      if(json.code==="existing_user_login")
      {
        alert("User Already Exists");

      }
      else if(json.code==="existing_user_email")
      {
        alert("Email Already Exists");
      }
      else{
        var userData={name:name, email:email, password:password, phone:phone,userID:json.id};
        await AsyncStorage.setItem('buddhiyogaUserData', JSON.stringify(userData));
        setStatus(1);
        alert("Successfully Registered");
        if(props.postId===undefined)
        {

        }
        else{
          console.log(props.postId);
          props.navigation.navigate('Comment',{postId:props.postId});
        }

      }
     } )
    }
    const _openAppSetting = useCallback(() => {
      AndroidOpenSettings.localeSettings();
    }, []);

    return (
        <>
            <View>
              {status===0 &&
                <Text style={styles.headings}>Register</Text>
              }
              {status===1 &&
                <Text style={styles.headings}>Profile Management</Text>
              }
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder="Enter Name"
                  placeholderTextColor={"rgba(183,153,114,1)"}
                  value={name}
                  onChangeText={newValue => setName(newValue)}
                />
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder="Enter Email"
                  placeholderTextColor={"rgba(183,153,114,1)"}
                  value={email}
                  onChangeText={newValue => setEmail(newValue)}
                  editable={status==0?true:false}
                />
                      <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder="Enter Phone"
                    placeholderTextColor={"rgba(183,153,114,1)"}
                    value={phone}
                    onChangeText={newValue => setPhone(newValue)}
                  />
                      <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder="Enter Password"
                    placeholderTextColor={"rgba(183,153,114,1)"}
                    value={password}
                    onChangeText={newValue => setPassword(newValue)}
                  />
                  
            {
              submitStatus &&
              <TouchableWithoutFeedback disabled>
            <View>
            <Text style={styles.btnstext}>Submit</Text>
            <Loader/>
            </View>
            
            </TouchableWithoutFeedback>
            }
            {
              !submitStatus &&
              <TouchableWithoutFeedback onPress={()=>submitButonHandler()}>
            <View>
            <Text style={styles.btnstext}>Submit</Text>
            {/* <Loader/> */}
            </View>
            </TouchableWithoutFeedback>
            }
            <View style={{width: '100%'}}>
            <Text style={styles.headings}>Language</Text>
            <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: 'green',width: "100%", paddingVertical: 0,backgroundColor: '#fff', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 0, elevation: 10, shadowColor: '#b79972',marginVertical: 5}}>
                {/* <TouchableOpacity> */}
                
                    <Text style={{width: '75%',fontSize: 16,color: '#594039', textTransform: 'capitalize',fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10,}}>{global.config.GL_LANG_NAME}</Text>
                    <View style={{borderRadius: 4,flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 0, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%',}}>
                    <TouchableWithoutFeedback onPress={_openAppSetting }>
                     
                    
                        <Image style={{width: 75, height: 75}} source={require('../assets/other/edit.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                    {/* </TouchableOpacity> */}
                 </View>
            </View>
</View>
        </>
    )
}
export default Register;

const styles = StyleSheet.create({
	headings :{
		marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#594039',
	},
    input :{
        backgroundColor: 'rgba(255,255,255,0.5)',
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
    }
})