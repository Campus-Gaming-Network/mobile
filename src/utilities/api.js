// Libraries
import { COLLECTIONS } from "@campus-gaming-network/tools";
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore";

// Other
import { db } from "../firebase";

export const getUserEvents = async (id, _limit) => {
  try {
    const response = await getDocs(
      query(
        collection(db, COLLECTIONS.EVENT_RESPONSES),
        where("user.ref", "==", doc(db, COLLECTIONS.USERS, id)),
        where("response", "==", "YES"),
        where("event.endDateTime", ">=", Timestamp.fromDate(new Date())),
        limit(_limit)
      )
    );
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const getEvent = async (id) => {
  try {
    const response = await getDoc(doc(db, COLLECTIONS.EVENTS, id));

    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const getEventAttendees = async (id, _limit) => {
  try {
    const response = await getDocs(
      query(
        collection(db, COLLECTIONS.EVENT_RESPONSES),
        where("event.ref", "==", doc(db, COLLECTIONS.EVENTS, id)),
        where("response", "==", "YES"),
        limit(_limit)
      )
    );

    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
