import { Stack, Switch } from "@mui/material";
import styles from "../styles/Home.module.css";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Match, Video } from "../types";
import VideoView from "../components/VideoView";

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

function Home({matchVideos}) {

  const VideoList = () => {
    return (
      <>
      {matchVideos.map((vid: Video) => <VideoView key={vid.v_id} {...vid}  />)}
      </>
    )
  }
  return (
    <Stack className={styles.container}>
      <VideoList/>
    </Stack>
  );
}



export async function getStaticProps() {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  const vidCol = collection(db, 'match-videos');
  const vidList = (await getDocs(vidCol)).docs;

  const matchVideos: Video[] = [];

  for(const doc of vidList) {
    const data: Video = doc.data() as Video;
    const matchesCol = collection(db, `match-videos/${vidList[0].id}/matches`);
    const matchesSnap = await getDocs(matchesCol);
    const matches: Match[] = matchesSnap.docs.map(doc => doc.data()) as Match[];
    console.log('matches: ', matches);
    matchVideos.push({
      ...data,
      matches
    })
  };

  console.log(`Match Videos: ${matchVideos}`);


  return {
    props: {
      matchVideos
    }
  }
}

export default Home;
