// Libraries
import React from "react";
import { DEFAULT_USERS_LIST_PAGE_SIZE } from "@campus-gaming-network/tools";
import { getEventUsers } from "../utilities/api";

const useFetchEventUsers = (id, _limit = DEFAULT_USERS_LIST_PAGE_SIZE) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const refreshAttendees = () =>
    setRefreshCount((refreshCount) => {
      setIsLoading(true);
      return refreshCount + 1;
    });

  React.useEffect(() => {
    const fetchEventUsers = async () => {
      setIsLoading(true);
      setUsers(null);
      setError(null);

      const [eventUsersSnapshot, error] = await getEventUsers(id, _limit);

      if (error) {
        console.error({ error });
        setError(error);
        setIsLoading(false);
      } else {
        let eventUsers = [];
        eventUsersSnapshot.forEach((doc) => {
          eventUsers.push(doc.data());
        });

        setUsers(eventUsers);
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
