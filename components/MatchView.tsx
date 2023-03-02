import { Box } from "@mui/material";
import Link from "next/link";
interface MatchViewProps {
  ytLink: String;
  timestamp: String;
  player1: String;
  player2: String;
}

const MatchView = ({ytLink, timestamp, player1, player2} : MatchViewProps): JSX.Element => {

  return(
  <Box>
    A BOX!!!
  </Box>)
};
export default MatchView;
