import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewAddressButton from "@/components/NewAddressButton";
import { Box, Container, Divider, Flex, Image, Text } from "@chakra-ui/react";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== 'User') {
    redirect('/login');
  }

  if (session?.user?.role === "Admin") {
    redirect("/admin");
  }

  return (
    <Container p={0} maxW="100%" m={0}>
      <Flex>
        <Box 
          w="250px" 
          h="500px"
          background="#F9F9F9"
          p={4} 
          ml={10}
          mt={20}
        >
          <Text fontSize="xl" mb={10} textAlign="center">My Profile</Text>
        </Box>

        <Box flex="1" p={4} mt={20}>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap="12"
            p="8"
            w="100%"
          >
            <Flex alignItems="center" gap="4" mr={300}>
              <Image
                src={'/images/profile.png'}
                alt="Profile"
                boxSize="50px"
                objectFit="cover"
                borderRadius="30px"
                cursor="pointer"
              />
              <Box>
                <Text color="GrayText" fontSize="medium">Name:</Text>
                <Text fontSize="16" fontWeight="500">{session?.user?.name}</Text>
              </Box>

              <Box ml={20}>
              <Text color="GrayText" fontSize="medium" >Email id:</Text>
              <Text fontSize="16" fontWeight="500">{session?.user?.email}</Text>
            </Box>

            <Box ml={20}>
              <Text color="GrayText" fontSize="medium">Mobile:</Text>
              <Text fontSize="16" fontWeight="500">{session?.user?.mobile_number || 0}</Text>
            </Box>

            </Flex>
          </Flex>

          <Divider mb={4} />
          
          <Flex
            alignItems="center"
            justifyContent="center"
            gap="12"
            p="8"
            w="100%"
          >
            <NewAddressButton />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
