import { useRouter } from "next/router";
import { collection, CollectionReference } from "firebase/firestore";
import { useFirestore, useFirestoreCollection, useFirestoreDocData } from "reactfire";
import { mockMatches } from "../mocks/mockMatches";
import MatchView from "./MatchView";
import VideoView from "./VideoView";
import { Match } from "../types";
import { Box, Divider, Stack } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { useEffect, Suspense, useMemo } from "react";
import useFetchMatches from "../hooks/firebase/useFetchMatches";
import { Client } from "react-hydration-provider";

export interface MatchQuery extends ParsedUrlQuery {
  page?: string;
  video?: string;
  p1chars?: string;
  p2chars?: string;
  p1?: string;
  p2?: string;
  versions?: string[];
  channels?: string[];
}

const PlayerSearch = ({ characters }) => {};

const MatchList = () => {
  const router = useRouter();
  const query = router.query as MatchQuery;
  //console.log(query);
  //firestore code - to be put into a proper hook or somethin

  const { data, status } = useFetchMatches(query);

  const matches = useMemo(() => {
    return data?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [data])

  console.log(matches);
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Box color="primary"> PLACEHOLDER </Box>
      <Client>
        {matches ? <ViewList availMatches={matches} /> : <p> Loading... </p>}
      </Client>
      <Box color="primary"> PLACEHOLDER </Box>
    </Stack>
  );
};

const ViewList = ({ availMatches }) => {
  const foundVideos = {};
  
  return (
    <Stack divider={<Divider flexItem />}>
      {availMatches.map((match: Match) => {
        console.log(match.players);
        if (!foundVideos[match.video]) {
          foundVideos[match.video] = true;
          return (
            <div key={match.video + match.timestamp}>
              <VideoView
                v_id={match.video}
                v_name={match.title}
                v_channel={match.channel}
                v_date={match.date}
                version={match.version}
              />
              <MatchView video={match.video} timestamp={match.timestamp} players={match.players} />
            </div>
          );
        }
        
        return (
          <MatchView
            key={match.video + match.timestamp}
            video={match.video}
            timestamp={match.timestamp}
            players={match.players}
          />
        );
      })}
    </Stack>
  );
};

export default MatchList;
