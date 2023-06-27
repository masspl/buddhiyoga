import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView,Dimensions,Image } from 'react-native';
import RNRestart from 'react-native-restart';
// import axios from 'axios';
const Dropdowns = ({ options }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [Languages, setLanguages] = useState(global.config.GL_LANG_NAME);

  const handleSelect = async(option) => {
    setSelectedOption(option);
    setVisible(false);
    switch (option) {
      case 'Bengali':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'bn');
          global.config.GL_LANG_CODE='bn';
          global.config.GL_LANG_NAME='Bengali';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          setLanguages("Bengali");

          break;
    
      case 'Odia':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'or');
          global.config.GL_LANG_CODE='or';
          global.config.GL_LANG_NAME='Odia';
          global.config.POST_URL="https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/";
          setLanguages("Odia");

          break;
      
      case 'Marathi':
            await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/");
            await AsyncStorage.setItem("gameBoard", 'mr');
            global.config.GL_LANG_CODE='mr';
            global.config.GL_LANG_NAME='Marathi';
            global.config.POST_URL="https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/";
          setLanguages("Marathi");

            break;
          
      case 'Hindi':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hi'); 
          global.config.GL_LANG_CODE='hi';
          global.config.GL_LANG_NAME='Hindi';
          global.config.POST_URL="https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/";
          setLanguages("Hindi");

          break;
    
      case 'Gujarati':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'gu'); 
          global.config.GL_LANG_CODE='gu';
          global.config.GL_LANG_NAME='Gujarati';
          global.config.POST_URL="https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/";
          setLanguages("Gujarati");

          break;
      case 'Kannada':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'kn'); 
          global.config.GL_LANG_CODE='kn';
          global.config.GL_LANG_NAME='Kannada';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          setLanguages("Kannada");

          break;
    case 'Tamil':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'ta'); 
          global.config.GL_LANG_CODE='ta';
          global.config.GL_LANG_NAME='Tamil';
          global.config.POST_URL="https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/";
          setLanguages("Tamil");

          break;
    case 'Telugu':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'te'); 
          global.config.GL_LANG_CODE='te';
          global.config.GL_LANG_NAME='Telugu';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          setLanguages("Telugu");

          break;
    case 'Hungarian':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hu'); 
          global.config.GL_LANG_CODE='hu';
          global.config.GL_LANG_NAME='Hungarian';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          setLanguages("Hungarian");

          break;
      default:
      
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'en'); 
          global.config.GL_LANG_CODE='en';
          global.config.GL_LANG_NAME='English';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          setLanguages("English");

          break;
   }
   await AsyncStorage.setItem("selectedLanguage", option);  
   RNRestart.restart();
  };

  return (
    <View style={{}}>
     
      <Text style={styles.headings}>Language</Text>
              <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: 'green',width: "100%", paddingVertical: 0,backgroundColor: '#fff', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 0, elevation: 10, shadowColor: '#b79972',marginVertical: 5}}>
                  <Text style={{width: '75%',fontSize: 16,color: '#594039', textTransform: 'capitalize',fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10,}}>{Languages}</Text>
                  <View style={{borderRadius: 4,flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 0, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%',}}>
                    <TouchableWithoutFeedback onPress={() => setVisible(true)}>                    
                        <Image style={{width: 75, height: 75}} source={require('../assets/other/edit.png')}/>
                    </TouchableWithoutFeedback>
                  </View>
              </View>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleSelect(option)}
                style={styles.optionButton}
              >
                <Text style={{color: '#000'}}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const Dropdown = () => {
  const dropdownOptions = ['English','Hindi','Bengali','Odia','Gujarati','Marathi','Kannada','Tamil','Telugu','Hungarian'];
  return (
    <View style={styles.container}>
      <Dropdowns options={dropdownOptions}/>
    </View>
  );
};

// Styles
const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    // backgroundColor: '#000',
    // height: 50,
    borderColor: 'gray',
    borderRadius: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  headings :{
		marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#594039',
	},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 'auto',
    maxHeight: 200,
  },
  optionButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
};

export default Dropdown;