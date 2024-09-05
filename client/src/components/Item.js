import React from 'react';
import { Box, Image, Text, Button, ButtonGroup, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoMdHeartEmpty } from 'react-icons/io';

const Item = ({ id, image, name, author, price }) => {
    const toast = useToast();

    const handleAddToBag = () => {
        toast({
          title: "Added to Bag",
          description: `${name} has been added to your bag.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };

  return (
    <Box overflow="hidden" p={2}maxWidth="500px">
      <NextLink href={`bookdisplay/${id}`} passHref>
        <Box display="block">
          {/* <Image
             src={`http://localhost:8000/images/${image}`}
             alt={name}
             borderRadius="md"
            _hover={{ cursor: 'pointer' }}
          /> */}
          <Image src="/images/book1.png" p={20} width="450px" height="400px"/>
        </Box>
      </NextLink>

      <Text
       ml={100} 
       fontWeight={500}
       fontSize="18px" 
       color="#000" 
       fontFamily="Montserrat" 
       letterSpacing="0.5px"
       mt={-14}
     >{name} </Text>

      <Text 
       color="#1f4f95"
       ml={105} 
       fontWeight={500}
       fontSize="12px"
       mb={1} 
       letterSpacing="0.5px"
       > {author}</Text>
      <Box>
        <Text ml={130} fontSize="sm" color="#3e434b.500" letterSpacing="0.5px" mb={1}>
          ₹ {price}
        </Text>
      </Box>

      <Box display="flex" alignItems="center" marginLeft="90px">
        <ButtonGroup variant='outline' spacing='6' size='xs'>
          <Button colorScheme='black' fontSize="12px" letterSpacing="0.5px" onClick={handleAddToBag}>ADD TO BAG</Button>
        </ButtonGroup>
        <Box ml={4} display="flex" alignItems="center">
          <IoMdHeartEmpty boxSize="24px" />
        </Box>
        </Box> 
    </Box>
  );
};

export default Item;
