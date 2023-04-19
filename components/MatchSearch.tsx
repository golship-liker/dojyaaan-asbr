import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Help } from "@mui/icons-material";
import useFetchCharacters from "../hooks/firebase/useFetchCharacters";
import useFetchPlayers from "../hooks/firebase/useFetchPlayers";
import { Character } from "../types";

const MatchSearch = () => {
  const { data: characterDocs } = useFetchCharacters();

  const { data: playerDocs } = useFetchPlayers();

  const characters = useMemo(() => {
    return characterDocs?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [characterDocs]);

  const players = useMemo(() => {
    return playerDocs?.docs?.map((doc) => doc.data()) ?? undefined;
  }, [playerDocs]);

  const CharacterSelect = ({
    characters,
    playerNumber,
  }: {
    characters: Character[];
    playerNumber: "p1" | "p2";
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

    const handleCharSelect = (id?: string) => {
      handleClose();
    };

    return (
      <div>
        <IconButton onClick={handleClick}>
          <Help />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {characters ? (
            characters.map((character) => {
              return (
                <MenuItem key={character.id} onClick={() => handleCharSelect(character.id)}>
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

  return (
    <Box>
      <CharacterSelect characters={characters} playerNumber={'p1'} />
    </Box>
  );
};

export default MatchSearch;
