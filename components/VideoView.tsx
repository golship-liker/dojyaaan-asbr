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
  matches: any[]; //to be changed
}

const VideoView = ({name, channel, id, timestamp, version, matches} : VideoViewProps): JSX.Element => {


  return(
  <Stack direction='column' justifyContent='center'>
    <Box>
      {name}
    </Box>
    <Box>
      {timestamp} | {version} | {channel}
    </Box>
  </Stack>)
};
export default VideoView;
