import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
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
  useToast,
} from "native-base";
import { auth } from "../firebase";

export default function LogIn({ navigation }) {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async () => {
    let response;

    try {
      response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.show({
        title: "Something went wrong",
        status: "error",
        description: "Please create a support ticket from the support page",
      });
      return;
    }

    toast.show({
      title: "Login successful",
      status: "success",
      description: "Welcome back.",
    });
  };

  return (
    <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="bold" color="coolGray.800">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "coolGray.800",
              fontSize: "xs",
              fontWeight: 500,
            }}
          >
            Email
          </FormControl.Label>
          <Input type="email" onChangeText={(value) => setEmail(value)} />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              color: "coolGray.800",
              fontSize: "xs",
              fontWeight: 500,
            }}
          >
            Password
          </FormControl.Label>
          <Input type="password" onChangeText={(value) => setPassword(value)} />
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
          onPress={handleSubmit}
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
