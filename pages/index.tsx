import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp} from "reactfire";
import MatchList from "../components/MatchList";
import { initializeApp } from "firebase/app";

function Home() {
  const firestore = getFirestore(useFirebaseApp());
  console.log(process.env)
  console.log(`firestore: ${JSON.stringify(firestore)}`);
  console.log(`app in firestore settings: ${JSON.stringify(firestore.app)}`);
  console.log(process.env.FB_PROJECTID);
  return (
    <FirestoreProvider sdk={firestore}>
        <MatchList/>
    </FirestoreProvider>
  );
}

// export async function getStaticProps() {
//   const firebaseConfig = {
//     apiKey: process.env.FB_APIKEY,
//     authDomain: process.env.FB_AUTHDOMAIN,
//     projectId: process.env.FB_PROJECTID,
//     storageBucket: process.env.FB_STORAGEBUCKET,
//     messagingSenderId: process.env.FB_MESSAGINGSENDERID,
//     appId: process.env.FB_APPID,
//     measurementId: process.env.FB_MEASUREMENTID,
//   };
//   const app = initializeApp(firebaseConfig);
//   const firestore = getFirestore(app);

//   return {
//     props: {
//       firestore: firestore.toJSON()
//     }
//   }
// }

export default Home;
