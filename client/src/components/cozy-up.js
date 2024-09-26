"use client";

import { Box, Heading, Text, SimpleGrid, Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Item from "./Item"; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const CozyUp = ({ category }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/category/cozy-up`);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();

        console.log(data);
        setBooks(data.books);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  if (loading) return <Spinner size="xl" />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const CustomLeftArrow = ({ onClick }) => (
    <IconButton
    aria-label="Previous"
    icon={<ChevronLeftIcon />}
    onClick={onClick}
    position="absolute"
    left={0}
    top="50%"
    variant="outline"
    color="black"
    border="none" 
    fontSize="4xl"   
    zIndex={1}
    />
  );
  
  const CustomRightArrow = ({ onClick }) => (
    <IconButton
      aria-label="Next"
      icon={<ChevronRightIcon />}
      onClick={onClick}
      position="absolute"
      right={0}
      top="50%"
      variant="outline"
      color="black"
      border="none" 
      fontSize="4xl"   
      zIndex={1}
    />
  );

  return (
    <Box p={5}>
      <Heading mt={10} textAlign="center" fontSize="30px" fontWeight={500} mb={20}>Heartwarming Cozy Reads
      </Heading>
      {books.length > 0 ? (

       <Carousel
       swipeable={false}
       draggable={false}
       responsive={responsive}
       ssr={true} 
       infinite={true}
       autoPlaySpeed={1000}
       keyBoardControl={true}
       customTransition="all .5"
       transitionDuration={500}
       removeArrowOnDeviceType={["tablet", "mobile"]} 
       customLeftArrow={<CustomLeftArrow />}
       customRightArrow={<CustomRightArrow />}>
          {books.map((book) => (
            <Item
            key={book._id}
            id={book._id}
            name={book.name}
            image={book.image}
            author={book.author}
            price={book.price}
            />
          ))}
          </Carousel>
      ) : (
        <Text>No books found for {category}.</Text>
      )}         

    </Box>
  );
};

export default CozyUp;
