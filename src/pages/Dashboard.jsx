import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="2xl">Logged In</Text>
      <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
    </VStack>
  );
};

export default Dashboard;
