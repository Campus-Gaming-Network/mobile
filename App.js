import React from "react";
import { Button, Text } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";

import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: Constants.manifest.extra.sentryDsn,
  environment: process.env.ENV !== "development" ? "production" : "development",
  enableInExpoDevelopment: true,
  debug: true,
});

import Welcome from "./src/screens/Welcome";
// import SignUp from "./src/screens/SignUp";
import LogIn from "./src/screens/LogIn";
import Landing from "./src/screens/Landing";
import ForgotPassword from "./src/screens/ForgotPassword";
import ResetPassword from "./src/screens/ResetPassword";
// import User from "./src/screens/User";
// import Team from "./src/screens/Team";
// import School from "./src/screens/School";
import Event from "./src/screens/Event";
// import Tournament from "./src/screens/Tournament";
// import EditUser from "./src/screens/EditUser";
// import EditSchool from "./src/screens/EditSchool";
// import EditEvent from "./src/screens/EditEvent";
// import EditTournament from "./src/screens/EditTournament";
// import CreateEvent from "./src/screens/CreateEvent";
// import CreateTeam from "./src/screens/CreateTeam";
// import CreateTournament from "./src/screens/CreateTournament";

const screens = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      title: "Overview",
    },
  },
  { name: "Welcome", component: Welcome },
  // { name: "SignUp", component: SignUp },
  { name: "LogIn", component: LogIn },
  {
    name: "Landing",
    component: Landing,
    options: {
      title: "Events You're Attending",
    },
  },
  { name: "ForgotPassword", component: ForgotPassword },
  { name: "ResetPassword", component: ResetPassword },
  // { name: "User", component: User },
  // { name: "Team", component: Team },
  // { name: "School", component: School },
  { name: "Event", component: Event },
  // { name: "Tournament", component: Tournament },
  // { name: "EditUser", component: EditUser },
  // { name: "EditSchool", component: EditSchool },
  // { name: "EditEvent", component: EditEvent },
  // { name: "EditTournament", component: EditTournament },
  // { name: "CreateEvent", component: CreateEvent },
  // { name: "CreateTeam", component: CreateTeam },
  // { name: "CreateTournament", component: CreateTournament },
];

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {screens.map((screen) => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
