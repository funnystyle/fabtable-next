// pages/_app.js
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { ChakraProvider } from '@chakra-ui/react'

// import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
