import { Box, Container, Heading, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import NavBar from "../components/ui/NavBar.jsx";

const requests = [
  { name: "Hope Shelter", location: "Downtown", needs: "Canned food, fruits, grains" },
  { name: "Community Food Bank", location: "West Side", needs: "Vegetables, dairy products" },
  { name: "Helping Hands Pantry", location: "East End", needs: "Rice, beans, bottled water" },
  { name: "Safe Haven Shelter", location: "Northside", needs: "Bread, meats, hygiene items" }
];

function Home() {
  return (
    <Container maxW="100%" px={0} py={0} bg="#EDF6F9">
      <NavBar />
      <Heading as="h1" size="xl" textAlign="center" my={5} color="#006D77">
        Food Donation Requests
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} gap={12}>
        {requests.map((request, index) => (
          <Box key={index} p={5} shadow="md" borderRadius="md" bg="#FFDDD2" m={3}>
            <Box bg="#E29578" height="80px" borderRadius="md" mb={4}></Box>
            <Heading size="sm" color="#006D77">{request.name}</Heading>
            <Text fontSize="sm" color="#83C5BE">Location: {request.location}</Text>
            <Text fontSize="sm" color="#83C5BE">Needs: {request.needs}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
