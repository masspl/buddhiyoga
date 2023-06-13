import React from "react";
import { View,Text,SafeAreaView, ScrollView,StyleSheet,Image, Dimensions } from "react-native";
import SlideImageSlider from '../components/SlideImageSlider';

import Hamburger from '../components/hamburger';


function Aboutus({navigation}){
  const {width, height} = Dimensions.get('window');
  
  const images = [
    require('../assets/other/slidersimages/1.jpg'),
    require('../assets/other/slidersimages/2.jpg'),
    require('../assets/other/slidersimages/3.jpg'),
    require('../assets/other/slidersimages/4.jpg'),
    require('../assets/other/slidersimages/5.png'),
    require('../assets/other/slidersimages/6.png'),
    require('../assets/other/slidersimages/7.png'),
    require('../assets/other/slidersimages/9.jpg'),
    require('../assets/other/slidersimages/10.webp'),
    require('../assets/other/slidersimages/11.jpg'),
    require('../assets/other/slidersimages/12.jpg'),
    require('../assets/other/slidersimages/13.jpg'),
    require('../assets/other/slidersimages/14.jpg'),
    require('../assets/other/slidersimages/15.jpg'),
    
      
  ];
   
 
    return (
        <>
        <SafeAreaView style={{}}>
        <Hamburger navigation={navigation} />
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)', height: height-55, width: width, padding: 10}}>
       
        
         <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
           <Text style={{fontSize: 24, fontWeight: '500', textAlign: 'center', color: '#594039', marginBottom: 10}}>
            Buddhi Yoga
           </Text>
            <View>
              
            <SlideImageSlider images={images} />
              
              <View style={{backgroundColor: '#fff', padding: 10,}}>
                <Text style={{color: '#594039', fontSize: 18, fontWeight: '500', textAlign: 'center', paddingBottom: 10}}>Origin</Text>
                <Text style={{flexWrap: 'wrap', color: 'rgba(183,153,114,1)', fontSize: 15, textAlign: 'justify'}}>
                  The game of snakes and ladders originated in India. One very mature design of this game is the Buddhi Yoga.
                  When Britishers came to India, the board games played in India caught their attention. Children were playing on a square board, 
                  with some snakes and some paths and lots of cryptic writing. Adults played on square chequered boards and had chequered cloth arranged in a cross. 
                  Many people played with geometric markings on clay and mud. {'\n'} {'\n'}

                  Some of the sailors wanted to join. The laughter and the evident enjoyment on the face of the players were inviting others to play the game. 
                  They did not understand the language, they came from a different world. They saw life completely different. However, 
                  they still smiled, and they wanted to be a part of this fun.{'\n'} {'\n'}

                  When they boarded their ships again, they wanted to take a part of the fun. Gyan Chaupar, Pacheesi, Chaturang, Navakankari were all 
                  games that would travel with these sailors. The sailors purchased some, re-created some in their free time onboard and converted some 
                  to suite their own culture and sensibilities.{'\n'} {'\n'}

                  Years later, Lord Macaulay brought the British education system to India, as a more “progressive form of thought”. The games of chess, 
                  snakes and ladders and ludo become popular indoor games among the elite. The similarities to our existing board games made them easy to 
                  adopt and they soon replaced the ancient versions.{'\n'} {'\n'}

                  The British promoted the game of snakes and ladders as a game of virtues and vices. This is a very close cousin to our present version, we call it “ludo”. 
                  This version of the game can be played quite mechanically and becomes mundane. The repetitiveness and the lack of any possibility to engage make it a game 
                  just for children.{'\n'} {'\n'}

                  Buddhi Yoga, on the other hand, is about awareness and consciousness. The more you engage with it, the more you enjoy. The more you focus on it, the more it reveals. 
                  Its design incorporates different levels of human maturity and makes it appealing to all ages and for all times. We know from our experience that we enjoy our work, 
                  only when we “engage” with it. Buddhi Yoga helps us train our thoughts to engage in every karma that we do. Therefore, enjoy every moment of our lives. 
                  This is the yoga that connects our mind to our actions. Thus, making us more aware and revealing to us the pleasure of living!
                </Text>
                <Text style={{color: '#594039', fontSize: 18, fontWeight: '500', textAlign: 'center', paddingBottom: 10}}>Purpose</Text>
                <Text style={{flexWrap: 'wrap', color: 'rgba(183,153,114,1)', fontSize: 15, textAlign: 'justify'}}>
                  Buddhi Yoga is a game that has to be played more than occasionally, it has to be cherished as a way of being.{'\n'} {'\n'}

                  The purpose of Buddhi Yoga is to guide the human intellect. Darwin propounded that we come from apes. Darwinians believed that we “improve” 
                  and “evolve” every single day and site genetic trends to cement their claim. The Vedas believed in a cycle of the “Yugas”. The Vedantins believe 
                  that living beings transition in a pre-defined cycle of intellect. The “Sata Yuga” is the purest and highest form of existence and the “Kali 
                  Yuga” or “Kala Yuga” the last in the phases of the “falling intellect”.{'\n'} {'\n'}

                  Buddhi Yoga takes to the spiritualistic philosophy and steers away from “the survival of the fittest” story. If practiced regularly it reveals 
                  the “karma yoga” path towards salvation. Salvation or moksha is symbolised as “Vaikuṇṭha” in this game.{'\n'} {'\n'}

                  We understand knowledge as science. “Science” strives to resolve the apparent contradictions in the universe and in man. An example of this is 
                  wave-particle duality. “The ancients” were acutely aware of the need for the player – the particle – to meet her chakras – individual fields of 
                  energy. They devised methods to achieve this through different modes of perception and experience. The game of Buddhi Yoga, like other forms of 
                  Yoga, is one such method.{'\n'} {'\n'}

                  How is this achieved?{'\n'} {'\n'}

                  The player, landing on a cell, views herself through the prism of that cell and reflects on her being with this perspective. This way, 
                  through repeated landings on the same cell or different cells, she understands herself, her society and the universe more completely. 
                  She finds her place, with everything else in the universe and understands her importance and her dharma (sudharma).{'\n'} {'\n'}

                  I invite you, to come in. To experience yourself as each cell of the game. To find yourself as a whole in the society and in the universe!{'\n'} {'\n'}
                  </Text>
                
              </View>
            </View>
            
           {/* <View>
            <Text>
            {source.html}
            </Text>
           </View> */}
          
          </ScrollView> 
          
        </View>
        </SafeAreaView>
                   
        </>
    )
}
export default Aboutus;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginBottom:100,
    marginHorizontal: 10,
    padding:10,
	backgroundColor:'#F2D997'
	}
})


