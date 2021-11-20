// Libraries
import React from "react";
import {
  COLLECTIONS,
  googleMapsLink,
  getEventUrl,
  hasStarted,
  hasEnded,
  formatSchoolName,
  isValidUrl,
  getSchoolUrl,
} from "@campus-gaming-network/tools";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const mapEvent = (event) => {
  if (!Boolean(event)) {
    return undefined;
  }

  return {
    ...event,
    createdAt: event.createdAt?.toDate(),
    updatedAt: event.updatedAt?.toDate(),
    url: getEventUrl(event.id),
    googleMapsAddressLink: googleMapsLink(event.location),
    hasStarted: hasStarted(event.startDateTime, event.endDateTime),
    hasEnded: hasEnded(event.endDateTime),
    school: {
      ...event.school,
      createdAt: event.school.createdAt?.toDate(),
      updatedAt: event.school.updatedAt?.toDate(),
      name: formatSchoolName(event.school.name),
      isValidWebsiteUrl: isValidUrl(event.school.website || ""),
      url: getSchoolUrl(event.school.id),
    },
  };
};

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
        const _doc = await getDoc(doc(db, COLLECTIONS.EVENTS, id));

        if (_doc.exists) {
          setEvent(mapEvent(_doc.data()));
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
