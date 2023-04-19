import { useRouter } from "next/router";
import MatchView from "./MatchView";
import VideoView from "./VideoView";
import { Match } from "../types";
import { Box, Divider, Pagination, Stack } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import { useEffect, Suspense, useMemo, useState, useRef, useCallback } from "react";
import useFetchMatches from "../hooks/firebase/useFetchMatches";
import { Client } from "react-hydration-provider";
import { DocumentSnapshot } from "firebase/firestore";
import useFetchMatchesCount from "../hooks/firebase/useFetchMatchesCount";
import { ITEMS_PER_PAGE } from "./consts";
import MatchSearch from "./MatchSearch";

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



const MatchList = () => {
  const router = useRouter();
  const query = router.query as MatchQuery;

  const [page, setPage] = useState(0);

  const cursors = useRef<Map<number, DocumentSnapshot>>(new Map());

  const { data, status } = useFetchMatches(query, cursors.current.get(page));

  const matches = useMemo(() => {
    return data?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [data]);

  const onPageChanged = useCallback(
    (nextPage: number) => {
      setPage((page) => {
        // first, we save the last document as page's cursor
        cursors.current.set(page + 1, data.docs[data.docs.length - 1]);

        // then we update the state with the next page's number
        return nextPage;
      });
    },
    [data]
  );
  
  return (
    <Stack sx={{ alignItems: "center" }}>
      <MatchSearch />
      <Client>
        {matches ? <ViewList availMatches={matches} /> : <p> Loading... </p>}
      </Client>
      <MatchPagination query={query} currentPage={page} pageChanged={onPageChanged}/>
    </Stack>
  );
};

const MatchPagination = ({query, currentPage, pageChanged} : {query: MatchQuery, currentPage: number, pageChanged: (page: number) => unknown}) => {
  const fetchMatchesCount = useFetchMatchesCount();
  const [matchesCount, setMatchesCount] = useState<number>();

  useEffect(() => {
    fetchMatchesCount(query).then((result) => {
      setMatchesCount(result.data().count);
    });
  }, [fetchMatchesCount, query])

  const totalPages = Math.floor(matchesCount / ITEMS_PER_PAGE);
  return (
    <Client> 
      <Box>
      <Pagination count={0} page={currentPage + 1} onChange={(event, value) => {pageChanged(value)}}/>
      </Box>
    </Client>
  )
}

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
