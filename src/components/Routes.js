import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Providers
import { useAuth } from "../providers/auth";

// Screens
import LogIn from "../screens/LogIn";
import Landing from "../screens/Landing";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Event from "../screens/Event";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <Center flex={1}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate("Welcome")}
      />
    </Center>
  );
}

const unauthorizedScreens = [
  { name: "LogIn", component: LogIn },
  { name: "ForgotPassword", component: ForgotPassword },
  { name: "ResetPassword", component: ResetPassword },
];

const authorizedScreens = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: "Overview",
    },
  },
  {
    name: "Landing",
    component: Landing,
    options: {
      title: "Events You're Attending",
    },
  },
  { name: "Event", component: Event },
];

const Routes = () => {
  const { user, isAuthenticated } = useAuth();
  const screens = !isAuthenticated ? unauthorizedScreens : authorizedScreens;

  return (
    <Stack.Navigator>
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
};

export default Routes;
