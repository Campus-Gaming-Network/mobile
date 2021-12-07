// Libraries
import React from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore";

// Other
import { auth, db } from "../firebase";

// Utilities
import {
  DEFAULT_PAGE_SIZE,
  COLLECTIONS,
  hasStarted,
} from "@campus-gaming-network/tools";

// Constants
// import { COLLECTIONS } from "src/constants/firebase";
// import { STATES } from "src/constants/api";

const useFetchUserEvents = (_limit = DEFAULT_PAGE_SIZE) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [events, setEvents] = React.useState(null);
  const [error, setError] = React.useState(null);
  const id = auth.currentUser.uid;

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

      //   if (process.env.NODE_ENV !== "production") {
      //     console.log(`[API] fetchUserEvents...${id}`);
      //   }

      let _events = [];

      try {
        const userEventsSnapshot = await getDocs(
          query(
            collection(db, COLLECTIONS.EVENT_RESPONSES),
            where("user.ref", "==", doc(db, COLLECTIONS.USERS, id)),
            where("response", "==", "YES"),
            where("event.endDateTime", ">=", Timestamp.fromDate(new Date())),
            limit(_limit)
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
        setError(true);
      }
    };

    if (id) {
      fetchUserEvents();
    }
  }, [_limit]);

  return [events, isLoading, error];
};

export default useFetchUserEvents;
