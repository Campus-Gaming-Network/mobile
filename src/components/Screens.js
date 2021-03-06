import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Center,
  IconButton,
  Spinner,
  Heading,
  HStack,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

// Other
import { auth } from "../firebase";

// Providers
import { useAuth } from "../providers/auth";

// Screens
import Welcome from "../screens/Welcome";
import LogIn from "../screens/Login";
import Landing from "../screens/Landing";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Event from "../screens/Event";
import Attendees from "../screens/Attendees";

const Stack = createNativeStackNavigator();

const Screens = () => {
  const toast = useToast();
  const { isAuthenticating, isAuthenticated } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Something went wrong",
        status: "error",
        description: "Please create a support ticket from the support page",
      });
    }
  };
  const unauthorizedScreens = [
    { name: "LogIn", component: LogIn, options: { headerBackVisible: false } },
    { name: "Welcome", component: Welcome },
    { name: "ForgotPassword", component: ForgotPassword },
    { name: "ResetPassword", component: ResetPassword },
  ];
  const authorizedScreens = [
    {
      name: "Landing",
      component: Landing,
      options: {
        title: "Events You're Attending",
        headerRight: () => (
          <IconButton
            size="sm"
            colorScheme="gray"
            variant="ghost"
            _icon={{
              as: Ionicons,
              name: "log-out-outline",
            }}
            onPress={handleSignOut}
          />
        ),
        headerBackVisible: false,
      },
    },
    { name: "Event", component: Event },
    {
      name: "Attendees",
      component: Attendees,
      options: { title: "Attendees" },
    },
  ];
  const screens = React.useMemo(
    () => (!isAuthenticated ? unauthorizedScreens : authorizedScreens),
    [isAuthenticated]
  );

  if (isAuthenticating) {
    return (
      // TODO: Splash screen
      <Center flex={1} px="3">
        <Center>
          <HStack space={2} alignItems="center">
            <Spinner
              color="orange.500"
              accessibilityLabel="Authenticating..."
            />
            <Heading color="orange.500" fontSize="md">
              Authenticating...
            </Heading>
          </HStack>
        </Center>
      </Center>
    );
  }

  return (
    <Stack.Navigator>
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
};

export default Screens;
