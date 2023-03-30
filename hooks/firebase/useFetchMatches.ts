import { useFirestore, useFirestoreCollection } from "reactfire";
import {
  collection,
  CollectionReference,
  limit,
  orderBy,
  startAfter,
  query,
  where,
  DocumentSnapshot,
} from "firebase/firestore";
import { MatchQuery } from "../../components/MatchList";

const ITEMS_PER_PAGE = 50;

const useFetchMatches = (query: MatchQuery) => {
  const db = useFirestore();

  const matchesCollection = 'matches';

  const order = orderBy('date', 'desc');

  const constraints = [
    order,
    limit(ITEMS_PER_PAGE)
  ];

}
export default useFetchMatches;
