import { Box } from "@mui/material";
import { YouTube } from '@mui/icons-material'
import Link from "next/link";
interface MatchViewProps {
  ytLink: string;
  timestamp: string;
  player1: string;
  player2: string;
}

const MatchView = ({ytLink, timestamp, player1, player2} : MatchViewProps): JSX.Element => {

  return(
  <Box flexDirection={"row"}>
    <Box>
      {player1}
    </Box>
    <Box>
      {player2}
    </Box>
    <a href={ytLink}>
      <YouTube/>
    </a>
  </Box>)
};
export default MatchView;
