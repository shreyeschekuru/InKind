import { Text, Image, Flex, Button, HStack, chakra } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from "/src/assets/logo.png"; // No need for relative paths

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="8"
        py="4"
        align="center"
        justify="space-between"
        background="rgba(0, 109, 119, 0.9)"
        backdropFilter="blur(10px)"
        boxShadow="sm"
      >
        {/* Logo and Title */}
        <HStack cursor="pointer" onClick={() => navigate("/")} spacing={3}>
          <Image src={logo} alt="InKind Logo" boxSize="40px" />
          <Text fontSize="2xl" fontWeight="bold" color="white">inKind</Text>
        </HStack>

        {/* Navigation Buttons */}
        <HStack spacing={5}>
          <Button 
            variant="ghost" 
            color="white" 
            _hover={{ background: "rgba(255, 183, 77, 0.8)" }} 
            onClick={() => navigate("/about")}
          >
            About
          </Button>
          <Button 
            bg="rgba(255, 183, 77, 1)" 
            color="black" 
            _hover={{ bg: "rgba(255, 183, 77, 0.8)" }} 
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
          <Button 
            bg="white" 
            color="#006d77" 
            _hover={{ bg: "gray.200" }} 
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
