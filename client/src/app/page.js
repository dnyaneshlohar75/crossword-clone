import React from 'react';
import {
  Container, Box
} from '@chakra-ui/react';
import ImageSlider from '@/components/Imageslider';
import TextSlider from '@/components/Textslider';
import SudhaMurthy from '@/components/sudhamurthy';
import CozyUp from '@/components/cozy-up';
// import Noteworthy from '@/components/noteworthy';
import Preorder from '@/components/preorder'
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <Container p={0} maxW="100%" m={0}>
     <TextSlider/>
     <Box 
        overflowY="scroll" 
        maxH="490px" 
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}   
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none', // For Chrome, Safari, and Opera
          },
        }}   
      >
     <ImageSlider/>  
     <SudhaMurthy/>
     <CozyUp/>
     <Preorder/>
     {/* <Noteworthy/> */}
     <Box>
       <Footer/>
     </Box>
     </Box>
    </Container>
  );
};

export default Dashboard;
