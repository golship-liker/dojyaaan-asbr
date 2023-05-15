import { useFirestore, useFirestoreCollection } from "reactfire";
import { collection, CollectionReference, orderBy, query } from "firebase/firestore";
import { Player } from "../../types";

const useFetchPlayers = () => {
  const db = useFirestore();

  const playersCollection = "players";

  const playersRef = collection(db, playersCollection) as CollectionReference<Player>;

  return useFirestoreCollection(query(playersRef, orderBy("name")));
};
export default useFetchPlayers;
