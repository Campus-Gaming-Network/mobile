import React from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import {
  Divider,
  VStack,
  Text,
  Box,
  Pressable,
  Flex,
  Badge,
} from "native-base";
import useFetchUserEvents from "../hooks/useFetchUserEvents";
import { auth, db } from "../firebase";

import {
  doc,
  collection,
  query,
  where,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore";

// Utilities
import {
  DEFAULT_PAGE_SIZE,
  COLLECTIONS,
  hasStarted,
} from "@campus-gaming-network/tools";

export default function Landing({ navigation }) {
  const id = auth.currentUser.uid;
  // const [events, isLoading, error] = useFetchUserEvents(id);

  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchUserEvents();
    setRefreshing(false);
  }, []);

  const fetchUserEvents = async () => {
    const mapEventResponse = (data) => {
      return {
        id: data.event.id,
        title: data.event.name,
        date: data.event.startDateTime.toDate().toDateString(),
        school: data.school.name,
        going: data.event.responses.yes,
        isOnlineEvent: data.event.isOnlineEvent,
        hasStarted: hasStarted(
          data.event.startDateTime,
          data.event.endDateTime
        ),
      };
    };

    let _events = [];

    try {
      const userEventsSnapshot = await getDocs(
        query(
          collection(db, COLLECTIONS.EVENT_RESPONSES),
          where("user.ref", "==", doc(db, COLLECTIONS.USERS, id)),
          where("response", "==", "YES"),
          where("event.endDateTime", ">=", Timestamp.fromDate(new Date())),
          limit(DEFAULT_PAGE_SIZE)
        )
      );
      if (!userEventsSnapshot.empty) {
        userEventsSnapshot.forEach((doc) => {
          const data = doc.data();
          const event = { ...mapEventResponse(data) };
          _events.push(event);
        });
      }

      setIsLoading(false);
      setEvents(_events);
    } catch (error) {
      console.error({ error });
      setError(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserEvents();
  }, []);

  const handleOnPress = (eventId) => {
    navigation.navigate("Event", { eventId });
  };

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

  if (!events) {
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
      <Box bg="white" pt={4}>
        <FlatList
          data={events}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleOnPress(item.id)} bg="white" px={6}>
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
