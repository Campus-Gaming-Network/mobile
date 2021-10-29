import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Divider, VStack, Text, Box, Pressable } from "native-base";

const DATA = Array.from({ length: 500 }).map((x, i) => {
  return {
    id: i,
    title:
      i % 2 === 0
        ? "Short Title"
        : "Long Title Long Title Long Title Long Title Long Title Long Title",
    date: new Date().toLocaleString(),
    school: "University of Chicago",
    going: Math.floor(Math.random() * 101),
  };
});

export default function Landing({ navigation }) {
  const handleOnPress = () => {
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView>
      <Box bg="white" pt={4}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Pressable
              key={String(item.id)}
              onPress={handleOnPress}
              bg="white"
              px={6}
            >
              <VStack>
                <Text color="orange.600" fontSize="md" fontWeight="bold">
                  {item.date}
                </Text>
                <Text fontWeight="bold" fontSize="md" numberOfLines={3}>
                  {item.title}
                </Text>
                <Text numberOfLines={3}>{item.school}</Text>
                <Text mt={2}>{item.going} going</Text>
                <Divider my={2} />
              </VStack>
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}
