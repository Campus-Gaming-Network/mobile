// Libraries
import React from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import {
  DEFAULT_USERS_LIST_PAGE_SIZE,
  COLLECTIONS,
} from "@campus-gaming-network/tools";
import { db } from "../firebase";

const useFetchEventUsers = (id, _limit = DEFAULT_USERS_LIST_PAGE_SIZE) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchEventUsers = async () => {
      setIsLoading(true);
      setUsers(null);
      setError(null);

      let queryArgs = [
        collection(db, COLLECTIONS.EVENT_RESPONSES),
        where("event.ref", "==", doc(db, COLLECTIONS.EVENTS, id)),
        where("response", "==", "YES"),
        limit(_limit),
      ];

      try {
        const snapshot = await getDocs(query(...queryArgs));

        if (!snapshot.empty) {
          let eventUsers = [];

          snapshot.forEach((doc) => {
            eventUsers.push(doc.data());
          });

          setUsers(eventUsers);
          setIsLoading(false);
        }
      } catch (error) {
        console.error({ error });
        setError(error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventUsers();
    }
  }, [id, _limit]);

  return [users, isLoading, error];
};

export default useFetchEventUsers;
