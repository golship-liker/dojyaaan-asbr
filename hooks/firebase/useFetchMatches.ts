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
} from "firebase/firestore";
import { MatchQuery } from "../../components/MatchList";
import { Match } from "../../types";
import { getQueryConstraintsFromMatchQuery } from "./utils/constraints";

const ITEMS_PER_PAGE = 50;

const useFetchMatches = (mQuery: MatchQuery, cursor?: NonNullable<DocumentSnapshot> | undefined) => {
  const db = useFirestore();

  const matchesCollection = "matches";

  const order = orderBy("date", "desc");
 
  const nonFilterConstraints = [order, limit(ITEMS_PER_PAGE)];

  const matchesRef = collection(db, matchesCollection) as CollectionReference<Match>;
  const compositeConstraints = getQueryConstraintsFromMatchQuery(mQuery);
  const q = compositeConstraints.length > 0 ? query(
    matchesRef,
    and(...compositeConstraints),
    ...nonFilterConstraints
  ) : query(matchesRef, ...nonFilterConstraints);

  return useFirestoreCollection(q);

};
export default useFetchMatches;
