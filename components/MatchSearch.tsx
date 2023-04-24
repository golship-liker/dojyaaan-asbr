import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Help } from "@mui/icons-material";
import useFetchCharacters from "../hooks/firebase/useFetchCharacters";
import useFetchPlayers from "../hooks/firebase/useFetchPlayers";
import { Character, Player } from "../types";
import { useRouter } from "next/router";

const MatchSearch = () => {
  const { push, query } = useRouter();

  const { data: characterDocs } = useFetchCharacters();

  const { data: playerDocs } = useFetchPlayers();

  const characters = useMemo(() => {
    return characterDocs?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [characterDocs]);

  const players = useMemo(() => {
    return playerDocs?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [playerDocs]);

  const onPlayerChanged = (playerNumber: "p1" | "p2", name?: string) => {
    const updatedQuery = { ...query, [playerNumber]: name };
    return push({ query: updatedQuery });
  };

  const onCharacterSelected = (playerNumber: "p1" | "p2", charId?: string) => {
    const updatedQuery = { ...query, [playerNumber + "chars"]: charId };
    return push({ query: updatedQuery });
  };

  return (
    <Box>
      <Stack direction="row">
        <CharacterSelect
          characters={characters}
          playerNumber={"p1"}
          onCharacterSelected={onCharacterSelected}
        />
        <PlayerSearch players={players} playerNumber={"p1"} onPlayerChanged={onPlayerChanged} />
      </Stack>
      <Stack direction="row">
        <CharacterSelect
          characters={characters}
          playerNumber={"p2"}
          onCharacterSelected={onCharacterSelected}
        />
        <PlayerSearch players={players} playerNumber={"p2"} onPlayerChanged={onPlayerChanged} />
      </Stack>
    </Box>
  );
};

const PlayerSearch = ({
  players,
  playerNumber,
  onPlayerChanged,
}: {
  players: Player[];
  playerNumber: "p1" | "p2";
  onPlayerChanged: (playerNumber: "p1" | "p2", name?: string) => unknown;
}) => {
  return (
    <Autocomplete
      onChange={(event, value) => {
        onPlayerChanged(playerNumber, value.name);
      }}
      options={players}
      getOptionLabel={(player) => player.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Player" />}
    />
  );
};

const CharacterSelect = ({
  characters,
  playerNumber,
  onCharacterSelected,
}: {
  characters: Character[];
  playerNumber: "p1" | "p2";
  onCharacterSelected: (playerNumber: "p1" | "p2", charId?: string) => unknown;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currCharacter, setCurrCharacter] = useState(undefined);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCharSelect = (playerNumber: "p1" | "p2", character?: Character) => {
    setCurrCharacter(character);
    onCharacterSelected(playerNumber, character?.id);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        {!currCharacter ? (
          <Help />
        ) : (
          <Image
            src={currCharacter.iconUrl}
            alt={currCharacter.name}
            width={36}
            height={36}
            style={{
              borderRadius: "50%",
            }}
          />
        )}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleCharSelect(playerNumber)}>
          <Help />
          <Typography variant="body1">Any Character</Typography>
        </MenuItem>
        {characters ? (
          characters.map((character) => {
            return (
              <MenuItem
                key={character.id}
                onClick={() => handleCharSelect(playerNumber, character)}>
                <Image
                  src={character.iconUrl}
                  alt={character.name}
                  width={36}
                  height={36}
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body1">{character.name}</Typography>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography variant="body1">No Character Data Found.</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MatchSearch;
