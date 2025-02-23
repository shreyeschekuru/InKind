import { Text, Image, Flex, Button, HStack, chakra, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from "/src/assets/logo.png"; // No need for relative paths
import { auth , db} from '@/config/firebase';
import { name } from '@/pages/Login';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

export default function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function getName() {
        setStatus('pending');
        try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const name = docSnap.data().firstName;
            setName(name);
            setStatus('success');
        } catch (e) {
            console.log(e);
            setStatus('error');
            setError(e);
        }
    }
    getName();
}, []);

  const getNameComponent = () =>
  {
    if(status === "success")
    {
      return (
        <Text fontSize="2em">Hello {name}!</Text>
      )
    }
  }

  const getLoginButton = () =>
  {
    if(status === "success")
      {
        return (
          <Button 
          bg="white" 
          color="#006d77" 
          _hover={{ bg: "gray.200" }} 
          onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        )
      }
      else
      {
        return (
          <Button 
          bg="white" 
          color="#006d77" 
          _hover={{ bg: "gray.200" }} 
          onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )
      }
  }

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
          <HStack cursor="pointer" onClick={() => navigate("/")} spacing={3}>
            <Image src={logo} alt="InKind Logo" boxSize="40px" />
            <Text fontSize="2xl" fontWeight="bold" color="white">inKind</Text>
          </HStack>
        {/* Logo and Title */}

        {getNameComponent()}
          

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
              onClick={() => navigate("/sheltersignup")}
            >
              Shelter Sign Up
            </Button>
            <Button 
              bg="rgba(255, 183, 77, 1)" 
              color="black" 
              _hover={{ bg: "rgba(255, 183, 77, 0.8)" }} 
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            {getLoginButton()}
          </HStack>
      </Flex>
    </chakra.header>
  );
}
