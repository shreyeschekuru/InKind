import { useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react"
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
  

const Auth = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if(email == "" || firstName == "" || lastName == "" || addressLine == "" || zipCode == "" || state == "" || password == "")
      {
        alert(state)
      }
      else
      {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = auth.currentUser.uid;
        const usersRef = doc(db, 'users', uid);

        const docData = 
        {
            addressLine: addressLine, 
            city: city,
            firstName: firstName,
            lastName: lastName,
            zipCode: zipCode,
            state: state
        }
        setDoc(usersRef, docData);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="2xl">Sign Up</Text>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input placeholder="Address Line" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <Input placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      <SelectRoot collection={states} size="sm" width="320px" value={state} onValueChange={(e) => setState(e.value[0])}>
      <SelectLabel>Select State</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select state" />
      </SelectTrigger>
      <SelectContent>
        {states.items.map((state) => (
          <SelectItem item={state} key={state.value}>
            {state.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
    <Button colorScheme="green" onClick={handleSignUp}>Sign Up</Button>
    </VStack>

  );
};

export default Auth;