import React from "react";
import { Heading } from "native-base";
import { SafeAreaView, FlatList } from "react-native";
import {
  Divider,
  VStack,
  Image,
  Text,
  Box,
  Pressable,
  Flex,
  Badge,
} from "native-base";
import background from "../../assets/background.png";

export default function Event({ navigation }) {
  const event = {
    title:
      Math.floor(Math.random() * 10) % 2 === 0
        ? "Short Title"
        : "Long Title Long Title Long Title Long Title Long Title Long Title",
    date: new Date().toLocaleString(),
    school: "University of Chicago",
    going: Math.floor(Math.random() * 101),
    isOnlineEvent: Math.floor(Math.random() * 10) % 3 === 0,
    hasStarted: Math.floor(Math.random() * 10) % 6 === 0,
  };
  return (
    <SafeAreaView>
      <Box>
        <Image source={background} w="100%" h={125} />
        <VStack p={4}>
          <Heading fontSize="3xl" bold>
            {event.title}
          </Heading>
          <Heading fontSize="md" bold>
            {event.school}
          </Heading>
          {event.hasStarted ? (
            <Text
              color="green.600"
              textTransform="uppercase"
              bold
              fontSize="sm"
              isTruncated
            >
              Happening now
            </Text>
          ) : null}
          <Text color="blue.600" fontSize="sm" bold isTruncated>
            {event.date}
          </Text>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
