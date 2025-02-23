import { Box, Container, Heading, Text, Image, Flex } from "@chakra-ui/react";
import NavBar from "../components/ui/NavBar.jsx";
import logo from "../assets/logo.png";

function About() {
  return (
    <Container maxW="100%" px={0} py={0} bg="#EDF6F9" minH="100vh">
      <NavBar />
      <Flex align="center" justify="center" minH="80vh">
        <Box textAlign="center" py={10} px={5} maxW="800px">
          <Image src={logo} alt="InKind Logo" mx="auto" boxSize="100px" mb={4} />
          <Heading as="h1" size="xl" color="#006D77" mb={4}>
            About Us
          </Heading>
          <Text fontSize="lg" color="#274C47" mb={4}>
            We are based in Charlottesville, Virginia, and founded out of the University of Virginia.
            Our mission is to connect individuals with extra food to local food pantries and homeless shelters.
            By facilitating food donations, we aim to reduce food waste and support those in need.
          </Text>
          <Text fontSize="md" color="#274C47">
            Our leadership team consists of four dedicated individuals working to make a difference in our community.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
}

export default About;
