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
  getCountFromServer,
} from "firebase/firestore";
import { MatchQuery } from "../../components/MatchList";
import { Match } from "../../types";
import { getQueryConstraintsFromMatchQuery } from "./utils/constraints";
import { useCallback } from "react";

const useFetchMatchesCount = () => {
  const db = useFirestore();

  return useCallback(
    (mQuery: MatchQuery) => {
      const matchesCollection = "matches";

      const order = orderBy("date", "desc");

      const nonFilterConstraints = [order];

      const matchesRef = collection(db, matchesCollection) as CollectionReference<Match>;
      const compositeConstraints = getQueryConstraintsFromMatchQuery(mQuery);
      const q =
        compositeConstraints.length > 0
          ? query(matchesRef, and(...compositeConstraints), ...nonFilterConstraints)
          : query(matchesRef, ...nonFilterConstraints);

      return getCountFromServer(q);
    },
    [db]
  );
};
export default useFetchMatchesCount;
