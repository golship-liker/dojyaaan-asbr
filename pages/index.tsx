import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp} from "reactfire";
import MatchList from "../components/MatchList";

function Home() {
  const firestore = getFirestore(useFirebaseApp());
  console.log(`firestore: ${JSON.stringify(firestore)}`);
  console.log(`app in firestore settings: ${JSON.stringify(firestore.app)}`);
  return (
    <FirestoreProvider sdk={firestore}>
        <MatchList/>
    </FirestoreProvider>
  );
}

export default Home;
