import { useEffect, useState, useRef } from "react";
import { Text, Container } from "@chakra-ui/react";

const GOOGLE_MAPS_API_KEY = "AIzaSyAUTOys0_gcR602EgFBLdWyIuZqkJ97AyE";

function Maps() {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState("")
  const [error, setError] = useState(false);
  const [places, setPlaces] = useState([]);

  const mapRef = useRef(null);


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
      center: userLocation,
      zoom: 13,
    });

    setMap(mapRef.current);
    searchNearbyPlaces(mapRef.current, userLocation);
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
        console.error("Error getting user location:", error);
        setError(true);
      },
      { timeout: 5000 }
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
    <Container>
      {error && (
        <div className="manual-input">
          <input
            type="text"
            placeholder="Enter your address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
          />
          <button onClick={handleManualLocation}>Submit</button>
        </div>
)}

      <div id="map" style={{ width: "50%", height: "500px", border: "1px solid black", margin: "auto", marginTop:"1%"}}></div>
      <div style={{margin:"5%", display:"flex", alignItems:"center", flexDirection:"column"}}>
        <h3 style={{color:"#006D77"}}>Places Found:</h3>
        <ol style={{color:"#006D77"}}>
          {places.map((place, index) => (
            <li key={place.place_id}>{index+1}.{" "}{place.name}</li>
          ))}
        </ol>
      </div>
      

    </Container>
  );
}

export default Maps;