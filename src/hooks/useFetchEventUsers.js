// Libraries
import React from "react";
import {
  DEFAULT_USERS_LIST_PAGE_SIZE,
  COLLECTIONS,
} from "@campus-gaming-network/tools";
import { getEventUsers } from "../utilities/api";

const useFetchEventUsers = (id, _limit = DEFAULT_USERS_LIST_PAGE_SIZE) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const refreshAttendees = () =>
    setRefreshCount((c) => {
      setIsLoading(true);
      return c + 1;
    });

  React.useEffect(() => {
    const fetchEventUsers = async () => {
      setIsLoading(true);
      setUsers(null);
      setError(null);

      try {
        const snapshot = await getEventUsers(id, _limit);

        if (!snapshot.empty) {
          let eventUsers = [];

          snapshot.forEach((document) => {
            eventUsers.push(document.data());
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
  }, [id, _limit, refreshCount]);

  return [users, isLoading, error, refreshAttendees];
};

export default useFetchEventUsers;
