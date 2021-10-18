import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
} from "native-base";

export default function LogIn({ navigation }) {
  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="bold" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label
            _text={{
              color: "coolGray.800",
              fontSize: "xs",
              fontWeight: 500,
            }}
          >
            Email
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: "coolGray.800",
              fontSize: "xs",
              fontWeight: 500,
            }}
          >
            Password
          </FormControl.Label>
          <Input type="password" />
          <Link
            _text={{ fontSize: "xs", color: "indigo.500" }}
            alignSelf="flex-end"
            mt="1"
            variant="link"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forget Password?
          </Link>
        </FormControl>
        <Button
          mt="2"
          colorScheme="orange"
          _text={{ color: "white", fontWeight: "bold" }}
        >
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{" "}
          </Text>
          <Button
            _text={{
              color: "indigo.500",
              fontSize: "sm",
            }}
            p={0}
            m={0}
            variant="link"
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
