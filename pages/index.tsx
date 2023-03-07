import { Stack, Switch } from "@mui/material";
import MatchView from "../components/MatchView";
import styles from "../styles/Home.module.css";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

///PUT THESE IN PROPER ENV VARIABLES BEFORE MAKING THE GITHUB PUBLIC!!!!
const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MEASUREMENTID,
};

function Home({vidCol}) {
  return (
    <Stack className={styles.container}>
      SOME SHIT: {vidCol}
    </Stack>
  );
}

export async function getStaticProps() {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  const vidCol = collection(db, 'match-videos');
  const vidSnap = await getDocs(vidCol);
  console.log(vidSnap.docs[0].data());
  const vidList = vidSnap.docs;
  const matchesCol = collection(db, `match-videos/${vidList[0].id}/matches`);
  const matchesSnap = await getDocs(matchesCol);
  const matchesList = matchesSnap.docs.map(doc => doc.data());
  console.log(matchesList[0]);

  return {
    props: {
      vidCol: JSON.stringify(vidCol)
    }
  }
}

export default Home;
