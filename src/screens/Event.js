import React from "react";
import { SafeAreaView } from "react-native";
import {
  Heading,
  Divider,
  VStack,
  Image,
  Text,
  Box,
  Flex,
  Badge,
  Avatar,
  HStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import background from "../../assets/background.png";
import useFetchEventDetails from "../hooks/useFetchEventDetails";
import useFetchEventUsers from "../hooks/useFetchEventUsers";
import { DateTime } from "luxon";
import { createGravatarRequestUrl } from "@campus-gaming-network/tools";

export default function Event({ route, navigation }) {
  const id = route.params.eventId;
  const [event, isLoading, error] = useFetchEventDetails(id);
  const [users] = useFetchEventUsers(id);

  if (isLoading) {
    return (
      <SafeAreaView>
        <Box>
          <Text>Loading...</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Box>
          <Text>Error</Text>
        </Box>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView>
        <Box>
          <Text>No data</Text>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Box>
        <Image alt="event-picture" source={background} w="100%" h={125} />
        <VStack p={4}>
          {event.hasStarted ? (
            <Flex bg="green.100" mr="auto" px={4} rounded="lg">
              <Text
                color="green.600"
                textTransform="uppercase"
                bold
                fontSize="sm"
                isTruncated
              >
                Happening now
              </Text>
            </Flex>
          ) : event.hasEnded ? (
            <Flex bg="red.100" mr="auto" px={2} rounded="lg">
              <Text
                color="red.600"
                textTransform="uppercase"
                bold
                fontSize="sm"
                isTruncated
              >
                Event ended
              </Text>
            </Flex>
          ) : null}
          <Heading fontSize="3xl" bold lineHeight="sm">
            {event.name}
          </Heading>
          <Heading fontSize="md" bold pt={1}>
            {event.school.name}
          </Heading>
          {event.isOnlineEvent ? (
            <Badge mt={2} fontSize="xs" color="gray.500" mr="auto">
              Online Event
            </Badge>
          ) : null}
          <Divider my={4} />
          <VStack space={8}>
            <VStack>
              <Flex direction="row">
                <Box pr={2} pt={1}>
                  <FontAwesome name="calendar" size={16} />
                </Box>
                <VStack>
                  <Text bold fontSize="md" lineHeight="sm">
                    {DateTime.fromSeconds(
                      event.startDateTime.seconds
                    ).toLocaleString({
                      ...DateTime.DATETIME_FULL,
                      ...{ month: "long", day: "numeric" },
                    })}
                  </Text>
                  <Text bold fontSize="md">
                    {DateTime.fromSeconds(
                      event.endDateTime.seconds
                    ).toLocaleString({
                      ...DateTime.DATETIME_FULL,
                      ...{ month: "long", day: "numeric" },
                    })}
                  </Text>
                </VStack>
              </Flex>
              {event.location ? (
                <Flex pt={4} direction="row">
                  <Box pr={2}>
                    <FontAwesome name="map-marker" size={18} />
                  </Box>
                  <VStack>
                    <Text bold fontSize="md" lineHeight="sm">
                      {event.location}
                    </Text>
                  </VStack>
                </Flex>
              ) : null}
            </VStack>
            <Box>
              <Heading pb={2}>Description</Heading>
              <Text>{event.description}</Text>
            </Box>
            <Box>
              <Heading pb={2}>Attendees ({event.responses.yes})</Heading>
              {Boolean(users) ? (
                <VStack>
                  {users.map((eventResponse, i) => {
                    return (
                      <HStack key={eventResponse.user.id} alignItems="center">
                        <Avatar
                          alignSelf="center"
                          bg="orange.500"
                          mr={2}
                          size="sm"
                          source={{
                            uri: createGravatarRequestUrl(
                              eventResponse.user.gravatar
                            ),
                          }}
                        >
                          BS
                        </Avatar>
                        <Text key={eventResponse.user.id}>
                          {eventResponse.user.firstName}{" "}
                          {eventResponse.user.lastName}
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              ) : (
                <Text>No one going :(</Text>
              )}
            </Box>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
