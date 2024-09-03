import React from 'react';
import { Box, Flex, Image, Text, Input, Button } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoPersonSharp, IoBagOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';

const HeaderSection = () => {
  return (
    <Box
      maxW="100vw"
      minH="8vh"
      position="relative"
      color="black"
      bg="#FFE619"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      mx="auto"
    >
      <Flex align="center" mr={4}>
        <Image
          src="/images/logo.png"
          alt="logo"
          boxSize="70px"
          mr={4}
        />
        <Text fontSize="lg">CROSSWORD</Text>
      </Flex>

      <Flex
        align="center"
        width="50%"
        maxW="500px"
        mx={4}
        ml={250}
        position="relative"
      >
        <Input
          placeholder="Search by Title, Author, ISBN"
          bg="white"
          border="none"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          size="sm"
          pr="4.5rem"
          zIndex="1"
        />
        <Button
          position="absolute"
          right="0"
          h="100%"
          px={4}
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          borderRadius="md"
          _hover={{ bg: 'gray.800' }}
          zIndex="2"
        >
          <AiOutlineSearch size={20} />
        </Button>
      </Flex>

      <Flex align="center" ml="auto">
        <IoPersonSharp size={24} />
        <FaHeart size={24} style={{ marginLeft: 20 }} />
        <IoBagOutline size={24} style={{ marginLeft: 20 }} />
      </Flex>
    </Box>
  );
};

export default HeaderSection;
