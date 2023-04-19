import { useFirestore, useFirestoreCollection } from "reactfire";
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  startAfter,
  query,
  where,
  or,
  and,
  DocumentSnapshot,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QueryStartAtConstraint,
} from "firebase/firestore";
import { MatchQuery } from "../../components/MatchList";
import { Match } from "../../types";
import { getQueryConstraintsFromMatchQuery } from "./utils/constraints";
import { ITEMS_PER_PAGE } from "../../components/consts";

const useFetchMatches = (
  mQuery: MatchQuery,
  cursor?: NonNullable<DocumentSnapshot> | undefined
) => {
  const db = useFirestore();

  const matchesCollection = "matches";

  const orderDate = orderBy("date", "desc");
  const orderVideo = orderBy("video", "desc");

  const nonFilterConstraints: (
    | QueryLimitConstraint
    | QueryOrderByConstraint
    | QueryStartAtConstraint
  )[] = [orderDate, orderVideo, limit(ITEMS_PER_PAGE)];

  if (!!cursor) {
    nonFilterConstraints.push(startAfter(cursor));
  }

  const matchesRef = collection(db, matchesCollection) as CollectionReference<Match>;
  const compositeConstraints = getQueryConstraintsFromMatchQuery(mQuery);
  const q =
    compositeConstraints.length > 0
      ? query(matchesRef, and(...compositeConstraints), ...nonFilterConstraints)
      : query(matchesRef, ...nonFilterConstraints);

  return useFirestoreCollection(q);
};
export default useFetchMatches;
