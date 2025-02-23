// main.jsx
"use client";

import { Provider } from "@/components/ui/provider.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { createSystem, defaultConfig } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import About from "./pages/About"; // Import the About component
import "@fontsource-variable/lexend-deca/index.css";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Lexend Deca Variable" },
        body: { value: "Lexend Deca Variable" },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <ChakraProvider value={system}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} /> 
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
); 