import { useEffect, useState, useRef } from "react";
import { Box, Input, Button, VStack, Text, Container, Heading } from "@chakra-ui/react";


const GOOGLE_MAPS_API_KEY = "AIzaSyAUTOys0_gcR602EgFBLdWyIuZqkJ97AyE";

function Maps() {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState("")
  const [error, setError] = useState(false);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  const DEFAULT_LOCATION = {lat: 38.89773032403587 ,lng: -77.03652280501576}

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      console.log("Google Maps API already loaded.");
      initMap();
      return;
    }

    console.log("Loading Google Maps API...");
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };


  const initMap = () => {
    if (!userLocation || mapRef.current) return; // Prevent duplicate initialization

    mapRef.current = new window.google.maps.Map(document.getElementById("map"), {
      center: userLocation || DEFAULT_LOCATION,
      zoom: 13,
    });

    setMap(mapRef.current);
    searchNearbyPlaces(mapRef.current, userLocation || DEFAULT_LOCATION);
  };


  const searchNearbyPlaces = (map, location) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location,
      radius: 5000,
      keyword: "food bank",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);

        results.forEach((place) => {
          new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
          });
        });
      }
    });
  };


  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation(DEFAULT_LOCATION);
      setError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
      },
      (error) => {
        setUserLocation(DEFAULT_LOCATION);
        console.error("Error getting user location:", error);
        setError(true);
      },
      { timeout: 1000 }
    );
  }, []);

  const handleManualLocation = async () => {
    if (!manualAddress) return;
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualAddress)}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setUserLocation({ lat: location.lat, lng: location.lng });
        setError(false); 

        if (mapRef.current) {
          mapRef.current.setCenter(location);
          searchNearbyPlaces(mapRef.current, location);
        }
      } else {
        console.error("Address not found");
        alert("Invalid address. Try again.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };
  

  useEffect(() => {
    if (userLocation) {
      loadGoogleMaps();
    }
  }, [userLocation]);

  return (
    <Container maxW="100vw" p={5}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection={{ base: "column", md: "row" }}>

        <Box flex="1" minW="50%" h="500px" border="2px solid #006D77" borderRadius="lg" boxShadow="xl" id="map" />

        <VStack flex="1" spacing={4} align="center" p={5}>
          <Heading as="h3" size="md" color="#006D77">Find Nearby Food Banks</Heading>

          <VStack spacing={2} w="80%">
            <Input
              placeholder="Enter your address"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              bg="white"
              color="#006D77"
              borderColor="#83C5BE"
              focusBorderColor="#E29578"
              borderRadius="full"
              p={3}
              _placeholder={{ color: "#83C5BE" }}
            />
            <Button
              bg="white"
              color="rgba(255, 183, 77, 1)"
              _hover={{ bg: "gray.200" }}
              onClick={handleManualLocation}
              borderRadius="full"
              p={3}
              w="full"
            >
              Submit
            </Button>
          </VStack>

          <Box  
            textAlign="left" 
            bg="white"
            border="2px solid #83C5BE"
            borderRadius="lg"
            p={4}
            w="80%"
            mt={4}>
            <Text fontSize="lg" color="#006D77" fontWeight="bold">Places Found:</Text>
            <ol style={{ color: "#006D77", listStyleType: "decimal", paddingLeft: "20px" }}>
              {places.map((place, index) => (
                <li key={place.place_id} style={{ margin: "5px 0" }}>
                  {place.name}
                </li>
              ))}
            </ol>
          </Box>
        </VStack>
      </Box>
    </Container>

  );
}

export default Maps;