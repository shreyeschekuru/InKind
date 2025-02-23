import { useState } from "react";
import NavBar from "@/components/ui/NavBar"; // Use only one import
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, VStack, Heading, Container, Image } from "@chakra-ui/react";

let name = "";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <>
      <NavBar /> {/* Render NavBar only once */}
      <Container w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" bg="#FFDDD2">
        <Box marginBottom="15%" p={8} bg="#EDF6F9" borderRadius="lg" shadow="xl" w={{ base: "90%", md: "400px" }} textAlign="center">
          <Box bg="#EDF6F9" p={4} borderRadius="full" display="inline-block" mb={4}>
            <Image src="/src/assets/logo.png" alt="Logo" w={20} />
          </Box>
          <Heading as="h2" size="lg" color="#006D77" mb={4}>
            Welcome Back
          </Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              borderColor="#83C5BE"
              focusBorderColor="#E29578"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              borderColor="#83C5BE"
              focusBorderColor="#E29578"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <Button bg="#E29578" color="white" _hover={{ bg: "#D67B61" }} onClick={handleLogin} borderRadius="full" p={3} w="full">
              Login
            </Button>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export {name};
export default Auth;