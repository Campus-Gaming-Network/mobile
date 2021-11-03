import React from "react";
import { Heading, HStack } from "native-base";
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
import { FontAwesome } from "@expo/vector-icons";
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
    description:
      Math.floor(Math.random() * 10) % 2 === 0
        ? "Short Description"
        : "We’ll spend 20 minutes on each city, throwing ideas to each other about what to look at, etc",
  };
  return (
    <SafeAreaView>
      <Box>
        <Image source={background} w="100%" h={125} />
        <VStack p={4}>
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
          <Heading fontSize="3xl" bold lineHeight="sm">
            {event.title}
          </Heading>
          <Heading fontSize="md" bold pt={1}>
            {event.school}
          </Heading>
          {event.isOnlineEvent ? (
            <Badge mt={2} fontSize="xs" color="gray.500" mr="auto">
              Online Event
            </Badge>
          ) : null}
          {/* <Text color="blue.600" fontSize="sm" bold isTruncated>
            {event.date}
          </Text> */}
          <Divider my={4} />
          <VStack space={8}>
            <VStack>
              <Flex direction="row">
                <Box pr={2} pt={1}>
                  <FontAwesome name="calendar" size={16} />
                </Box>
                <VStack>
                  <Text bold fontSize="md" lineHeight="sm">
                    Friday, August 20, 2021
                  </Text>
                  <Text bold fontSize="md">
                    6:00pm to 8:00pm MDT
                  </Text>
                </VStack>
              </Flex>
              <Flex pt={4} direction="row">
                <Box pr={2}>
                  <FontAwesome name="map-marker" size={18} />
                </Box>
                <VStack>
                  <Text bold fontSize="md" lineHeight="sm">
                    42 Wallaby Way, Sydney, Australia
                  </Text>
                </VStack>
              </Flex>
            </VStack>
            <Box>
              <Heading pb={2}>Description</Heading>
              <Text>{event.description}</Text>
            </Box>
            <Box>
              <Heading pb={2}>Attendees (0)</Heading>
              <Text>No one going :(</Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
