import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView,Dimensions } from 'react-native';
// import axios from 'axios';
const Dropdowns = ({ options }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = async(option) => {
    setSelectedOption(option);
    setVisible(false);
    switch (option) {
      case 'bn':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'bn');
          global.config.GL_LANG_CODE='bn';
          global.config.GL_LANG_NAME='Bengali';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    
      case 'or':
        alert("or");
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'or');
          global.config.GL_LANG_CODE='or';
          global.config.GL_LANG_NAME='Odia';
          global.config.POST_URL="https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/";
          break;
      
      case 'mr':
            await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/");
            await AsyncStorage.setItem("gameBoard", 'mr');
            global.config.GL_LANG_CODE='mr';
            global.config.GL_LANG_NAME='Marathi';
            global.config.POST_URL="https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/";
            break;
          
      case 'hi':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hi'); 
          global.config.GL_LANG_CODE='hi';
          global.config.GL_LANG_NAME='Hindi';
          global.config.POST_URL="https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/";
          break;
    
      case 'gu':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'gu'); 
          global.config.GL_LANG_CODE='gu';
          global.config.GL_LANG_NAME='Gujarati';
          global.config.POST_URL="https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/";
          break;
      case 'kn':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'kn'); 
          global.config.GL_LANG_CODE='kn';
          global.config.GL_LANG_NAME='Kannada';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'ta':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'ta'); 
          global.config.GL_LANG_CODE='ta';
          global.config.GL_LANG_NAME='Tamil';
          global.config.POST_URL="https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/";
          break;
    case 'te':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'te'); 
          global.config.GL_LANG_CODE='te';
          global.config.GL_LANG_NAME='Telugu';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'hu':
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hu'); 
          global.config.GL_LANG_CODE='hu';
          global.config.GL_LANG_NAME='Hungarian';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
      default:
      
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'en'); 
          global.config.GL_LANG_CODE='en';
          global.config.GL_LANG_NAME='English';
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
   }
   await AsyncStorage.setItem("selectedLanguage", option);  
  };

  return (
    <View style={{}}>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.dropdownButton}>
          <Text style={{color: '#000'}}>{selectedOption || 'Select an option'}</Text>
        </View>
      </TouchableWithoutFeedback>

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
  const dropdownOptions = ['bn', 'or', 'hi','gu', 'ka', 'ta', 'te', 'hn', 'en', 'mr'];
  return (
    <View style={styles.container}>
      <Dropdowns options={dropdownOptions}/>
    </View>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', height: Dimensions.get('window').height, backgroundColor: 'rgba(0,0,0,0.5)', position: 'relative', width: Dimensions.get('window').width
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    minWidth: 200,
    alignItems: 'center',
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