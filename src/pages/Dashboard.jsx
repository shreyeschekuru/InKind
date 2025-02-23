import { auth , db} from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {SimpleGrid, Heading,Container, Box, Button, Text, VStack, Card, For, Stack, Spinner } from "@chakra-ui/react";
import NavBar from "@/components/ui/NavBar";
import { useState, useEffect } from "react";
import Maps from "@/components/Maps";

function usePromiseStatus(promise) {
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setStatus("pending");

    promise
      .then((result) => {
        if (isMounted) {
          setData(result);
          setStatus("resolved");
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setStatus("rejected");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { status, data, error };
}

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getShelterData = async () =>
  {
      const q = query(collection(db, "shelters"))
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  const shelterDataPromise = getShelterData();

  const { status, data, error } = usePromiseStatus(shelterDataPromise);

  if (status === "pending") {
    return <VStack padding="15%">
      <Heading fontSize="3em" color="#006D77">Shelter data is loading, please wait.</Heading>
      <Spinner color="#83C5BE" size="xl" />
    </VStack>
  }

  if (status === "rejected") {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <>
    <Container maxW="100%" px={0} py={0} bg="#EDF6F9">
      <NavBar />
      <Maps></Maps>
      <Heading as="h1" size="xl" textAlign="center" my={5} color="#006D77">
        Food Donation Requests
      </Heading>
      {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} gap={12}>
        {data.map((shelter, index) => (
          <Box key={index} p={5} shadow="md" borderRadius="md" bg="#FFDDD2" m={3}>
            <Box bg="#E29578" height="80px" borderRadius="md" mb={4}></Box>
            <Heading size="sm" color="#006D77">{shelter.organizationName}</Heading>
            <Text fontSize="sm" color="#83C5BE">Location: {shelter.addressLine}</Text>
            <Text fontSize="sm" color="#83C5BE">Needs: {}</Text>
          </Box>
        )) 
        }
      </SimpleGrid> */}

      <Stack justifyContent="center" gap="4" direction="row" wrap="wrap">
        <For each={data}>
          {(shelter, index) => (
            <Card.Root justifyContent="center" margin="1em" shadow="md" borderWidth="5px" borderColor="#E29578" color="#006D77" backgroundColor="#FFDDD2" width="320px" variant={shelter} key={index}>
              <Card.Body gap="2">
                <Card.Title mb="2">{shelter.organizationName}</Card.Title>
                <Card.Description>
                  {shelter.addressLine + ", " + shelter.city + ", " + shelter.zipCode}
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button>Accept</Button>
                <Button>Reject</Button>
              </Card.Footer>
            </Card.Root>
          )}
        </For>
      </Stack>
      <VStack spacing={4} p={4}>
      <Text fontSize="2xl">Logged In</Text>
      <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
    </VStack>
  </Container>


    </>
  );
};

export default Dashboard;
