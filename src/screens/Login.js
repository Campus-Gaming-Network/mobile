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
  useToast,
} from "native-base";
import { auth } from "../firebase";
import { saveStorageItem } from "../utilities/storage";
import { STORAGE_KEYS } from "../constants/storage";

export default function LogIn({ navigation }) {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
    } catch (error) {
      toast.show({
        title: "Something went wrong",
        status: "error",
        description: "Please create a support ticket from the support page",
      });
      setIsSubmitting(false);
      return;
    }

    toast.show({
      title: "Login successful",
      status: "success",
      description: "Welcome back.",
    });

    // await saveStorageItem(
    //   STORAGE_KEYS.AUTH,
    //   JSON.stringify({
    //     uid: auth.currentUser.uid,
    //     email: auth.currentUser.email,
    //     emailVerified: auth.currentUser.emailVerified,
    //     createdAt: auth.currentUser.createdAt,
    //     lastLoginAt: auth.currentUser.lastLoginAt,
    //   })
    // );
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
        </FormControl>
        <Button
          isDisabled={isSubmitting}
          onPress={handleSubmit}
          mt="2"
          colorScheme="orange"
          _text={{ color: "white", fontWeight: "bold" }}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </VStack>
    </Box>
  );
}
