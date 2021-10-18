import React from "react";
import { Center, Box, Heading, Button, Image, VStack } from "native-base";
import logo from "../../assets/logo.png";

export default function Welcome({ navigation }) {
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <VStack alignItems="center" mt={100} space={6}>
        <Image
          source={logo}
          style={{ height: 100, width: 100 }}
          alt="Campus Gaming Network logo"
        />
        <Heading size="lg" fontWeight="bold">
          Campus Gaming Network
        </Heading>
      </VStack>
      <Button
        mt={6}
        colorScheme="orange"
        onPress={() => navigation.navigate("LogIn")}
        _text={{ fontWeight: "bold" }}
      >
        Log In
      </Button>
      <Button
        mt={4}
        onPress={() => navigation.navigate("SignUp")}
        variant="outline"
        colorScheme="orange"
        _text={{ fontWeight: "bold" }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
