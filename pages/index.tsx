import { Stack, Switch } from "@mui/material";
import styles from "../styles/Home.module.css";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp} from "reactfire";
import MatchList from "../components/MatchList";

///PUT THESE IN PROPER ENV VARIABLES BEFORE MAKING THE GITHUB PUBLIC!!!!
// const firebaseConfig = {
//   apiKey: process.env.FB_APIKEY,
//   authDomain: process.env.FB_AUTHDOMAIN,
//   projectId: process.env.FB_PROJECTID,
//   storageBucket: process.env.FB_STORAGEBUCKET,
//   messagingSenderId: process.env.FB_MESSAGINGSENDERID,
//   appId: process.env.FB_APPID,
//   measurementId: process.env.FB_MEASUREMENTID,
// };

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

export async function getStaticProps() {
  //const firebaseApp = initializeApp(firebaseConfig);
  //const db = getFirestore(firebaseApp);

  // for(const doc of vidList) {
  //   const data: Video = doc.data() as Video;
  //   const matchesCol = collection(db, `match-videos/${vidList[0].id}/matches`);
  //   const matchesSnap = await getDocs(matchesCol);
  //   const matches: Match[] = matchesSnap.docs.map(doc => doc.data()) as Match[];
  //   console.log('matches: ', matches);
  //   matchVideos.push({
  //     ...data,
  //     matches
  //   })
  // };

  // const matchCollection = collection(db, "matches");
  // const matchQuery = query(matchCollection, where("version", "==", "1.5"));
  // const matches: Match[] = (await getDocs(matchQuery)).docs.map(doc => doc.data()) as Match[];
  // console.log(`Matches: ${matches}`)


  return {
    props: {
      
    }
  }
}

export default Home;
