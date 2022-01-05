// Libraries
import React from "react";

// Utilities
import { DEFAULT_PAGE_SIZE, hasStarted } from "@campus-gaming-network/tools";
import { getUserEvents } from "../utilities/api";

const useFetchUserEvents = (id, _limit = DEFAULT_PAGE_SIZE) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [events, setEvents] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const refreshEvents = () => {
    setIsLoading(true);
    setRefreshCount(refreshCount + 1);
  };

  const mapEventResponse = (data) => {
    return {
      id: data.event.id,
      title: data.event.name,
      date: data.event.startDateTime.toDate().toDateString(),
      school: data.school.name,
      going: data.event.responses.yes,
      isOnlineEvent: data.event.isOnlineEvent,
      hasStarted: hasStarted(data.event.startDateTime, data.event.endDateTime),
    };
  };

  React.useEffect(() => {
    const fetchUserEvents = async () => {
      setEvents(null);
      setError(null);

      let _events = [];

      const [userEventsSnapshot, error] = await getUserEvents(id, _limit);

      if (error) {
        console.error({ error });
        setError(error);
      } else if (!userEventsSnapshot.empty) {
        userEventsSnapshot.forEach((doc) => {
          const data = doc.data();
          const event = { ...mapEventResponse(data) };
          _events.push(event);
        });
        setEvents(_events);
      }

      setIsLoading(false);
    };

    if (id) {
      fetchUserEvents();
    }
  }, [_limit, refreshCount]);

  return [events, isLoading, error, refreshEvents];
};

export default useFetchUserEvents;
