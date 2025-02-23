import { useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="2xl">Login / Sign Up</Text>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      <Button colorScheme="green" onClick={handleSignUp}>Sign Up</Button>
    </VStack>
  );
};

export default Auth;
