import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Sentry from "sentry-expo";
import "text-encoding-polyfill";

// Components
import Screens from "./src/components/Screens";

// Providers
import { AuthProvider } from "./src/providers/auth";

Sentry.init({
  dsn: Constants.manifest.extra.sentryDsn,
  environment: process.env.ENV !== "development" ? "production" : "development",
  enableInExpoDevelopment: true,
  debug: true,
});

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Screens />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
