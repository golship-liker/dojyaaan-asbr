import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import EditFlow from "../components/EditFlow/EditFlow";

export interface EditQuery extends ParsedUrlQuery {
  v?: string;
};

function Edit() {
  const firestore = getFirestore(useFirebaseApp());
  const {query} = useRouter();
  return (
    <FirestoreProvider sdk={firestore}>
      <EditFlow videoId={(query as EditQuery).v}/>
    </FirestoreProvider>
  );
}

export default Edit;
