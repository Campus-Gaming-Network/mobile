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
import { getEvent } from "../utilities/api";

const mapEvent = (event) => {
  if (!Boolean(event)) {
    return undefined;
  }

  return {
    ...event,
    creator: event.creator.id,
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

      const [eventSnapshot, error] = await getEvent(id);

      if (error) {
        console.log({ error });
        setError(error);
        setIsLoading(false);
      } else {
        setEvent(mapEvent(eventSnapshot.data()));
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
