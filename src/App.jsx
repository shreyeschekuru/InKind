"use client"

import { createSystem, defaultConfig } from "@chakra-ui/react"
import { Box, ChakraProvider } from "@chakra-ui/react"
import NavBar from './components/ui/NavBar'
import "@fontsource-variable/lexend-deca/index.css"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Lexend Deca Variable" },
        body: { value: "Lexend Deca Variable" },
      },
    },
  },
})

function App({ Component, pageProps }) {
  return (
    <ChakraProvider value={system}>
      <NavBar></NavBar>
    </ChakraProvider>
  )
}

export default App
