import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import {
  Divider,
  VStack,
  Text,
  Box,
  Pressable,
  Flex,
  Badge,
} from "native-base";

const DATA = Array.from({ length: 500 }).map((x, i) => {
  return {
    id: i,
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
});

export default function Landing({ navigation }) {
  const handleOnPress = () => {
    navigation.navigate("Event");
  };

  return (
    <SafeAreaView>
      <Box bg="white" pt={4}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable onPress={handleOnPress} bg="white" px={6}>
              <VStack>
                {item.hasStarted ? (
                  <Text
                    color="green.600"
                    textTransform="uppercase"
                    bold
                    fontSize="sm"
                    isTruncated
                  >
                    Happening now
                  </Text>
                ) : (
                  <Text color="blue.600" fontSize="sm" bold isTruncated>
                    {item.date}
                  </Text>
                )}
                <Text
                  color="gray.700"
                  fontSize="md"
                  bold
                  lineHeight="md"
                  numberOfLines={3}
                >
                  {item.title}
                </Text>
                <Text color="gray.500" bold fontSize="sm" isTruncated>
                  {item.school}
                </Text>
                <Flex mt={3} justify="space-between" direction="row">
                  {item.isOnlineEvent ? (
                    <Badge fontSize="xs" color="gray.500">
                      Online Event
                    </Badge>
                  ) : null}
                  {item.going > 0 ? (
                    <Text fontSize="xs" color="gray.500" bold flexShrink={0}>
                      {item.going} attending
                    </Text>
                  ) : null}
                </Flex>
                <Divider my={2} />
              </VStack>
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}
