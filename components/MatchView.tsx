import { Box, Stack, styled, Typography, useTheme  } from "@mui/material";
import Image from 'next/image';
import { YouTube } from "@mui/icons-material";
import Link from "next/link";
import { MatchPlayer } from "../types";

interface MatchViewProps {
  video: string;
  timestamp: string;
  players: MatchPlayer[];
}

const MatchView = ({
  video,
  timestamp,
  players
}: MatchViewProps): JSX.Element => {
  const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="center" spacing={theme.spacing()}>
      <Stack direction="row">
        <Image
          src={players[0].characters[0].iconUrl}
          alt={players[0].characters[0].name}
          width={36}
          height={36}
          style={{
            borderRadius: "50%",
          }}
        />
        <Typography variant="body1">{players[0].name}</Typography>
      </Stack>
      <Typography variant="body1">vs</Typography>
      <Stack direction="row">
        <Image
          src={players[1].characters[0].iconUrl}
          alt={players[1].characters[0].name}
          width={36}
          height={36}
          style={{
            borderRadius: "50%",
          }}
        />
        <Typography variant="body1">{players[1].name}</Typography>
      </Stack>
      <a href={`${YOUTUBE_URL}${video}&t=${timestamp}`}>
        <YouTube />
      </a>
    </Stack>
  );
};
export default MatchView;
