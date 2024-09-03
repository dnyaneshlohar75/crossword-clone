'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Image, Stack, Text, IconButton, Divider, SimpleGrid } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  return (
    <>
    Hello
     {/* <Container maxW="container.xl" p={4}>
      <Heading mb={6}>All Products List</Heading>
      <Stack spacing={4}>
        <Box>
          <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} fontWeight="bold">
            <Text>Image</Text>
            <Text>Title</Text>
            <Text>Old Price</Text>
            <Text>New Price</Text>
            <Text>Category</Text>
            <Text>Actions</Text>
          </SimpleGrid>
          <Divider my={4} />
          <Stack spacing={4}>
              <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} alignItems="center">
                  <Image src={product.image} alt={product.name} boxSize="100px" objectFit="cover" borderRadius="md" />
                  <Text>{product.name}</Text>
                  <Text>${product.price}</Text>
                  <Text>{product.category}</Text>
                  <IconButton
                    aria-label="Remove product"
                    icon={<CloseIcon />}
                    colorScheme="red"
                    onClick={() => removeProduct(product.id)}
                  />
                </SimpleGrid>
                <Divider my={4} />
              </Box>
          </Stack>
        </Box>
      </Stack>
    </Container> */}
    </>
   
  );
};

export default ListProduct;
