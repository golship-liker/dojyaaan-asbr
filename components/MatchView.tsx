import { Box, Stack } from "@mui/material";
import { YouTube } from '@mui/icons-material'
import Link from "next/link";
interface MatchViewProps {
  ytLink: string;
  timestamp: string;
  player1: string;
  player2: string;
}

const MatchView = ({ytLink = 'https://www.youtube.com', timestamp, player1 = 'Player1', player2 = 'Player2'} : MatchViewProps): JSX.Element => {

  return(
  <Stack direction='row' borderBottom='solid' justifyContent='center'>
    <Box>
      {player1}
    </Box>
    <Box>
      {player2}
    </Box>
    <a href={ytLink}>
      <YouTube/>
    </a>
  </Stack>)
};
export default MatchView;
