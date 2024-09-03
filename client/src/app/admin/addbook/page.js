'use client'; 

import { useState } from 'react';
import { Box, Input, Select, Button, Image, Stack, FormLabel, FormControl, Container, useToast } from '@chakra-ui/react';
import Header from '@/app/admin/header/page';
import HeaderSection from '@/app/admin/headersection/page';
import Sidebar from '../sidebar/page';

const AddBook = () => {
  const [image, setImage] = useState(null);
  const [bookDetails, setBookDetails] = useState({
      name: '',
      price: '',
      category: 'sudha murthy',
      image: "",
  });
  const toast = useToast();

  const imageHandler = (e) => {
    if (e.target.files.length > 0) {
        setImage(e.target.files[0]);
    }
};

  const changeHandler = (e) => {
      setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
  };
  
  const addBook = async () => {
    try {
      let formData = new FormData();
      if (image) {
        formData.append('book', image);
      }

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
      
      if (responseData.success) {
        toast({
            title: 'Book Added',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
      } else {
        toast({
            title: 'Failed to upload image',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Container maxW="container.x" p={0}>
      <Header /> 
      <HeaderSection />
      
      <Box display="flex">
        <Sidebar />
        
        <Box flex="1" p={6} maxW="800px" mx="auto" ml={50}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Book Name</FormLabel>
              <Input
                value={bookDetails.name}
                onChange={changeHandler}
                type="text"
                name="name"
                placeholder="Type here"
              />
            </FormControl>

            <FormControl id="price">
              <FormLabel>Book Price</FormLabel>
              <Input
                value={bookDetails.price}
                onChange={changeHandler}
                type="text"
                name="price"
                placeholder="Type here"
              />
            </FormControl>

            <FormControl id="category">
              <FormLabel>Book Category</FormLabel>
              <Select
                value={bookDetails.category}
                onChange={changeHandler}
                name="category"
              >
                <option value="sudha-murthy">Sudha Murthy</option>
                <option value="cozy-up">Cozy Up</option>
                <option value="preorder">Pre Order</option>
                <option value="thewriteplace">The Write Place</option>
                <option value="halfpricesale">Half Price Sale</option>
                <option value="legami">Legami</option>
                <option value="milan">Milan</option>
              </Select>
            </FormControl>

            <FormControl id="image">
              <FormLabel>Book Image</FormLabel>
              <label htmlFor="file-input">
                <Image
                  src={image ? URL.createObjectURL(image) : '/images/upload_area.svg'}
                  alt="Upload Area"
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="md"
                  cursor="pointer"
                />
              </label>
              <Input
                onChange={imageHandler}
                type="file"
                name="image"
                id="file-input"
                hidden
              />
            </FormControl>

            <Button bg={'black'} color="white" onClick={addBook}>
              ADD BOOK
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBook;
