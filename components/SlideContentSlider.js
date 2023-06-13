import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity,Text } from 'react-native';

const SlideContentSlider = ({ images }) => {
  // console.log(images);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    // console.log(currentPage);
    var page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    // console.log(event.nativeEvent.contentOffset.x+"/"+ event.nativeEvent.layoutMeasurement.width+"="+page);
    setCurrentPage(page);
  };
  const goToPrevious = () => {
    
    setCurrentPage(currentPage - 1);
   
    // const offset = (Dimensions.get('window').width-20) * currentPage ;
    // scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
   
    console.log(currentPage);
  };

  const goToNext = () => {
    
    setCurrentPage(currentPage + 1);
   
    // const offset = (Dimensions.get('window').width-20) * currentPage ;
    // scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
   
    console.log(currentPage);
  };

  const handleSwipe = (pageIndex) => {
    console.log(currentPage);
    if (scrollViewRef.current) {
      const offset = (Dimensions.get('window').width-20) * pageIndex ;
      scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
    }
    setCurrentPage(pageIndex);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View style={{width: Dimensions.get('window').width-20, height: 350, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.8)'}}>
          <Image key={index} source={image} style={{ width: 320, height: index==0?240: 300 }} />
          
          </View>
        ))}
      </ScrollView>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 0,paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.8)',}}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === currentPage ? 'rgba(88,44,36,1)' : 'rgba(0,0,0,0.2)',
              marginHorizontal: 5,
            }}
            onTouchEnd={() => handleSwipe(index)}
          />
        ))}
      </View>
      <Text>{currentPage}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, currentPage === 0 && styles.disabledButton]}
          onPress={goToPrevious}
          disabled={currentPage === 0}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentPage === images.length - 1 && styles.disabledButton]}
          onPress={goToNext}
          disabled={currentPage === images.length - 1}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlideContentSlider;
const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
})