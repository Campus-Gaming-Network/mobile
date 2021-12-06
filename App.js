import React from "react";
import { Button, Text } from "react-native";
import { NativeBaseProvider, Center } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";

import * as Sentry from "sentry-expo";

import "text-encoding-polyfill";

// Providers
import { AuthProvider } from "./src/providers/auth";

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

Sentry.init({
  dsn: Constants.manifest.extra.sentryDsn,
  environment: process.env.ENV !== "development" ? "production" : "development",
  enableInExpoDevelopment: true,
  debug: true,
});

// const screens = [
// { name: "Welcome", component: Welcome },
// { name: "User", component: User },
// { name: "Team", component: Team },
// { name: "School", component: School },
// { name: "Tournament", component: Tournament },
// { name: "EditUser", component: EditUser },
// { name: "EditSchool", component: EditSchool },
// { name: "EditEvent", component: EditEvent },
// { name: "EditTournament", component: EditTournament },
// { name: "CreateEvent", component: CreateEvent },
// { name: "CreateTeam", component: CreateTeam },
// { name: "CreateTournament", component: CreateTournament },
// ];

const unauthoriztedScreens = [
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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <Text>Loading...</Text>;
  }

  const screens = !state.userToken ? unauthoriztedScreens : authorizedScreens;

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator>
            {screens.map((screen) => (
              <Stack.Screen key={screen.name} {...screen} />
            ))}
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
