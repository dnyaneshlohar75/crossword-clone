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
     <ImageSlider/>  
     <SudhaMurthy/>
     <CozyUp/>
     <Preorder/>
     {/* <Noteworthy/> */}
     <Box>
       <Footer/>
     </Box>
    </Container>
  );
};

export default Dashboard;
