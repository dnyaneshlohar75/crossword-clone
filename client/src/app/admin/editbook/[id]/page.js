"use client"

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const EditBookPage = () => {
  const [book, setBook] = useState({
    image: null,
    name: "",
    price: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/books/${id}`);
          if (response.data.book) {
            setBook(response.data.book);
          } else {
            setError(response.data.message || "Failed to fetch book");
          }
        } catch (error) {
          setError(error.message || "Error fetching book");
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", book.name);
    formData.append("price", book.price);
    formData.append("category", book.category);
    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      const response = await axios.put(`/books/update-book/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/booklist");
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the book.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" w="full" mt={0}>
      <Box
        width="100%" 
        maxW="1520px"
        p={6}
        bg="white.100"
        shadow="lg"
        borderRadius="md"
        maxH="70vh" 
        overflowY="auto"
       >
        <Flex justify="center" mb={2}>
          <Heading fontSize={25} color="#444444" mb={0}>Update Book</Heading>
        </Flex>
        {error && (
          <Box p={4} color="red.500" textAlign="center">
            {error}
          </Box>
        )}
        <Box  p={4}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="image">
                <FormLabel color="gray.600">Upload New Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                  width="100%" 
                />
              </FormControl>

              <FormControl id="name" isRequired>
                <FormLabel color="gray.600">Book Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={book.name}
                  onChange={handleChange}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                  width="100%" 
                />
              </FormControl>

              <FormControl id="price" isRequired>
                <FormLabel color="gray.600">Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={book.price}
                  onChange={handleChange}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                  width="100%" 
                />
              </FormControl>

              <FormControl id="category" isRequired>
                <FormLabel color="gray.600">Category</FormLabel>
                <Input
                  type="text"
                  name="category"
                  value={book.category}
                  onChange={handleChange}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
                  width="100%" 
                />
              </FormControl>

              <Button
                colorScheme="red"
                type="submit"
                size="lg"
                mt={4}
                leftIcon={<EditIcon />}
                _hover={{ bg: "red.600", boxShadow: "md" }}
                _active={{ bg: "red.700", transform: "scale(0.98)" }}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default EditBookPage;
