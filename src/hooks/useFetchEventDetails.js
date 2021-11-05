// Libraries
import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const useFetchEventDetails = (id) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [event, setEvent] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      setEvent(null);
      setError(null);

      try {
        const _doc = await getDoc(doc(db, "events", id));

        if (_doc.exists) {
          setEvent(_doc.data());
        }

        setIsLoading(false);
      } catch (error) {
        console.error({ error });
        setError(error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  return [event, isLoading, error];
};

export default useFetchEventDetails;
