import { useFirestore, useFirestoreCollection } from "reactfire";
import {
  collection,
  CollectionReference,
  orderBy,
  query
} from "firebase/firestore";
import { Character } from "../../types";

const useFetchCharacters = () => {
  const db = useFirestore();

  const charactersCollection = 'characters';

  const charactersRef = collection(db, charactersCollection) as CollectionReference<Character>;

  return useFirestoreCollection(query(charactersRef, orderBy('id')));
};
export default useFetchCharacters;
