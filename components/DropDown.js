import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView,Dimensions } from 'react-native';
// import axios from 'axios';
const Dropdowns = ({ options, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = async(option) => {
    setSelectedOption(option);
    global.config.GL_LANG_NAME=option;
    await AsyncStorage.setItem("selectedLanguage", option);
    onSelect(option);
    setVisible(false);
    
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
          <TouchableOpacity
                key={options[0]}
                onPress={() => handleSelect(options[0])}
                style={styles.optionButton}
              >
                <Text style={{color: '#000'}}>{options[0]}</Text>
              </TouchableOpacity>
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

// Example usage
const Dropdown = () => {
  const handleDropdownSelect = (option) => {
    console.log('Selected option:', option);
    // Perform any additional logic with the selected option
  };

  const [languages, setLanguages] = useState(global.config.GL_LIST_OF_LANG);
  const [defaultlanguages, setdefaultLanguages] = useState(global.config.GL_DEFAULT_LANG);


    useEffect(() => {
      console.log(languages);
    })
  
  // const fetchLanguages = async () => {
  //   console.log("hello")

  //   try {
 
  //     await fetch('https://buddhiyoga.in/site/en/wp-json/tp/v1/languages/', {
  //     method: "GET",
  //     headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json",
  //     },
      
  //     })
  //     .then(async(response) => {
  //       var responseData=await response.json();
  //       setLanguages(responseData.secondary_languages);
  //       setdefaultLanguages(responseData.default_language);


  //     console.log(responseData);
      
  //   })
  //   .done();
  //   } 
  //   catch (error) {
  //     console.error(error);
  //   }
  //   };
  //   fetchLanguages();
  //   },[])
  
    // const [languages, setLanguages] = useState([]);
  
    // useEffect(() => {
    //   const fetchLanguages = async () => {
    //     try {
    //       const response = await fetch('https://buddhiyoga.in/site/en/wp-json/tp/v1/languages/');
          // setLanguages(response.data);
    //       console.log("LANGUAGES: "+JSON.stringify(response));
    //     } catch (error) {
    //       console.error('Error fetching languages:', error);
    //     }
    //   };
  
    //   fetchLanguages();
    // }, []);
  
  // const dropdownOptions = ['Bengali', 'Odia', 'Hindi','Gujarati', 'Kannada', 'Tamil', 'Telugu', 'Hungarian', 'English', 'Marathi'];
  const dropdownOptions = ['bn', 'or', 'hi','gu', 'ka', 'ta', 'te', 'hn', 'en', 'mr'];


  return (
    <View style={styles.container}>
      <Dropdowns options={dropdownOptions} onSelect={handleDropdownSelect} />
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