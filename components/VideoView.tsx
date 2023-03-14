import { Box, Stack } from "@mui/material";
import { YouTube } from '@mui/icons-material'
import Link from "next/link";
import MatchView from './MatchView';

interface VideoViewProps {
  id: string;
  channel: string;
  name: string;
  timestamp: string; //Date ISO
  version: string;
  matches: any[]; //to be defined
}

const VideoView = ({name, channel, id, timestamp, version, matches} : VideoViewProps): JSX.Element => {

  const MatchesList = () => { 
    return(
      <>
      {matches.map((m) => <MatchView key={m.timestamp} ytLink={m.ytLink} timestamp={m.timestamp} player1={m.player1} player2={m.player2}/>)}
      </>
    )
  }

  return(
  <Stack direction='column' justifyContent='center'>
    <Box>
      {name}
    </Box>
    <Box>
      {timestamp} | {version} | {channel}
    </Box>
    <MatchesList />
  </Stack>)
};
export default VideoView;
