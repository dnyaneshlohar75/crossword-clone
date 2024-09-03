"use client";

import { Box, Container, Image, Text, FormControl, FormLabel, Input, Button, Flex, Divider } from '@chakra-ui/react';
import Header from '@/components/header';
import HeaderSection from '@/components/HeaderSection';
import TextSlider from '@/components/Textslider';
import { useState } from 'react';

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");

  return (
    <Container maxW="container.x">
      <Header />
      <HeaderSection />
      <TextSlider />
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
        <Image
          src="/images/login.png"
          alt="Image"
          maxW={{ base: "100%", md: "50%" }}
          height="auto"
        />
        <Box flex="1" ml={150}>
          <Text fontSize="2xl" mb={4} mr={40} textAlign="center">Sign In</Text>
          <Divider mb={8} w={400} /> 
            <FormControl id="mobileNo" isRequired mb={4}>
              <FormLabel>Mobile No</FormLabel>
              <Input
                type="tel"
                onChange={(e) => setMobileNo(e.target.value)}
                mb={4}
                w={400}
              />
            </FormControl>
            <Button
              type="submit"
              bg="black" 
              color="white" 
              width="400px"
              height={10} 
            >
              SEND OTP
            </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
