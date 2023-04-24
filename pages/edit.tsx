import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

function Edit() {
  const firestore = getFirestore(useFirebaseApp());
  //console.log(`firestore: ${JSON.stringify(firestore)}`);
  //console.log(`app in firestore settings: ${JSON.stringify(firestore.app)}`);
  return (
    <FirestoreProvider sdk={firestore}>
      EDIT PAGE HERE
    </FirestoreProvider>
  );
}

export default Edit;
