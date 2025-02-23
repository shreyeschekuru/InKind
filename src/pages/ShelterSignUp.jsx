// import { useState } from "react";
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "@/config/firebase";
// import { useNavigate } from "react-router-dom";
// import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
// import { createListCollection } from "@chakra-ui/react"
// import { doc, setDoc } from "firebase/firestore"; 

// import {
//   SelectContent,
//   SelectItem,
//   SelectLabel,
//   SelectRoot,
//   SelectTrigger,
//   SelectValueText,
// } from "@/components/ui/select"


  

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [addressLine, setAddressLine] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [state, setState] = useState("");
//   const [password, setPassword] = useState("");
  
//   const navigate = useNavigate();

//   const handleSignUp = async () => {
//     try {
//       if(email == "" || firstName == "" || lastName == "" || addressLine == "" || zipCode == "" || state == "" || password == "")
//       {
//         alert(state)
//       }
//       else
//       {
//         await createUserWithEmailAndPassword(auth, email, password);
//         const uid = auth.currentUser.uid;
//         const usersRef = doc(db, 'users', uid);

        // const docData = 
        // {
        //     addressLine: addressLine, 
        //     city: city,
        //     firstName: firstName,
        //     lastName: lastName,
        //     zipCode: zipCode,
        //     state: state
        // }
        // setDoc(usersRef, docData);
        // navigate("/dashboard");
//       }
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <VStack spacing={4} p={4}>
//       <Text fontSize="2xl">Sign Up</Text>
//       <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//       <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//       <Input placeholder="Address Line" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
//       <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
//       <Input placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
    //   <SelectRoot collection={states} size="sm" width="320px" value={state} onValueChange={(e) => setState(e.value[0])}>
    //   <SelectLabel>Select State</SelectLabel>
    //   <SelectTrigger>
    //     <SelectValueText placeholder="Select state" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     {states.items.map((state) => (
    //       <SelectItem item={state} key={state.value}>
    //         {state.label}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </SelectRoot>
//     <Button colorScheme="green" onClick={handleSignUp}>Sign Up</Button>
//     </VStack>

//   );
// };

// export default Auth;

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import {createListCollection, Box, Button, Input, VStack, Heading, Container, Image } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

const states = createListCollection({
  items: [
    { label: "Alabama", value: "alabama" },
    { label: "Alaska", value: "alaska" },
    { label: "Arizona", value: "arizona" },
    { label: "Arkansas", value: "arkansas" },
    { label: "California", value: "california" },
    { label: "Colorado", value: "colorado" },
    { label: "Connecticut", value: "connecticut" },
    { label: "Delaware", value: "delaware" },
    { label: "Florida", value: "florida" },
    { label: "Georgia", value: "georgia" },
    { label: "Hawaii", value: "hawaii" },
    { label: "Idaho", value: "idaho" },
    { label: "Illinois", value: "illinois" },
    { label: "Indiana", value: "indiana" },
    { label: "Iowa", value: "iowa" },
    { label: "Kansas", value: "kansas" },
    { label: "Kentucky", value: "kentucky" },
    { label: "Louisiana", value: "louisiana" },
    { label: "Maine", value: "maine" },
    { label: "Maryland", value: "maryland" },
    { label: "Massachusetts", value: "massachusetts" },
    { label: "Michigan", value: "michigan" },
    { label: "Minnesota", value: "minnesota" },
    { label: "Mississippi", value: "mississippi" },
    { label: "Missouri", value: "missouri" },
    { label: "Montana", value: "montana" },
    { label: "Nebraska", value: "nebraska" },
    { label: "Nevada", value: "nevada" },
    { label: "New Hampshire", value: "new_hampshire" },
    { label: "New Jersey", value: "new_jersey" },
    { label: "New Mexico", value: "new_mexico" },
    { label: "New York", value: "new_york" },
    { label: "North Carolina", value: "north_carolina" },
    { label: "North Dakota", value: "north_dakota" },
    { label: "Ohio", value: "ohio" },
    { label: "Oklahoma", value: "oklahoma" },
    { label: "Oregon", value: "oregon" },
    { label: "Pennsylvania", value: "pennsylvania" },
    { label: "Rhode Island", value: "rhode_island" },
    { label: "South Carolina", value: "south_carolina" },
    { label: "South Dakota", value: "south_dakota" },
    { label: "Tennessee", value: "tennessee" },
    { label: "Texas", value: "texas" },
    { label: "Utah", value: "utah" },
    { label: "Vermont", value: "vermont" },
    { label: "Virginia", value: "virginia" },
    { label: "Washington", value: "washington" },
    { label: "West Virginia", value: "west_virginia" },
    { label: "Wisconsin", value: "wisconsin" },
    { label: "Wyoming", value: "wyoming" },
  ],
});

const ShelterSignUp = () => {
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [password, setPassword] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (!email || !organizationName  || !password || !addressLine || !city || !zipCode || !state) {
        alert("Please fill in all fields");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);

      const uid = auth.currentUser.uid;
      const usersRef = doc(db, 'shelters', uid);
      const docData = 
      {
        email: email,
        organizationName: organizationName,
        addressLine: addressLine,
        city: city,
        zipCode: zipCode, 
        state: state
      }
      setDoc(usersRef, docData);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxW="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center" bg="#FFDDD2">
        <Box marginBottom="10%" p={8} bg="#EDF6F9" borderRadius="lg" shadow="xl" w={{ base: "90%", md: "400px" }} textAlign="center">
          <Box bg="#EDF6F9" p={4} borderRadius="full" display="inline-block" mb={4}>
            <Image src="/src/assets/logo.png" alt="Logo" w={20} />
          </Box>
          <Heading as="h2" size="lg" color="#006D77" mb={4}>
            Create an Account
          </Heading>
          <VStack spacing={4}>
          <Input
              placeholder="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              bg="white"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <Input
              placeholder="Address Line"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              bg="white"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              bg="white"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <Input
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              bg="white"
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
              <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
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
              borderRadius="full"
              p={3}
              color="#006D77" // Set text color to #006D77
              _placeholder={{ color: "#83C5BE" }} // Optional: Change placeholder color
            />
            <SelectRoot collection={states} size="sm" width="320px" value={state} onValueChange={(e) => setState(e.value[0])}>
              <SelectTrigger>
                <SelectValueText placeholder="Select state" />
              </SelectTrigger>
              <SelectContent bg="#83C5BE">
                {states.items.map((state) => (
                  <SelectItem item={state} key={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button bg="#E29578" color="white" _hover={{ bg: "#D67B61" }} onClick={handleSignUp} borderRadius="full" p={3} w="full">
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default ShelterSignUp;
