import { Stack, Switch } from "@mui/material";
import MatchView from "../components/MatchView";
import styles from "../styles/Home.module.css";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

///PUT THESE IN PROPER ENV VARIABLES BEFORE MAKING THE GITHUB PUBLIC!!!!


function Home() {
  return (
    <Stack className={styles.container}>
      <MatchView />
      <MatchView />
      SOME SHIT
    </Stack>
  );
}

export async function getStaticProps() {

}

export default Home;
