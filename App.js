import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import AppBar from "./src/components/AppBar";

export default function App() {
  return (
    <NativeBaseProvider>
    <AppBar title="CGN" />
      <Box></Box>
    </NativeBaseProvider>
  );
}
