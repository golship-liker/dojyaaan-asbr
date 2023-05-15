import { Box, Stack } from "@mui/material";
import { YouTube } from '@mui/icons-material';
import {Video} from '../types';
import Link from "next/link";
import MatchView from './MatchView';

interface VideoViewProps extends Video {};

const VideoView = ({v_name, v_channel, v_id, v_date, version} : VideoViewProps): JSX.Element => {


  return (
    <Stack direction="column" justifyContent="center">
      <Box>{v_name}</Box>
      <Box>
        {v_date.toDate().toISOString().substring(0, 10)} | {version} | {v_channel}
      </Box>
    </Stack>
  );
};
export default VideoView;
