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
    return await getDocs(
      query(
        collection(db, COLLECTIONS.EVENT_RESPONSES),
        where("user.ref", "==", doc(db, COLLECTIONS.USERS, id)),
        where("response", "==", "YES"),
        where("event.endDateTime", ">=", Timestamp.fromDate(new Date())),
        limit(_limit)
      )
    );
  } catch (error) {
    return error;
  }
};

export const getEvent = async (id) => {
  try {
    return await getDoc(doc(db, COLLECTIONS.EVENTS, id));
  } catch (error) {
    return error;
  }
};

export const getEventUsers = async (id, _limit) => {
  try {
    return await getDocs(
      query(
        collection(db, COLLECTIONS.EVENT_RESPONSES),
        where("event.ref", "==", doc(db, COLLECTIONS.EVENTS, id)),
        where("response", "==", "YES"),
        limit(_limit)
      )
    );
  } catch (error) {
    return error;
  }
};
