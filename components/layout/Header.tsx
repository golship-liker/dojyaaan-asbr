import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Flag, AddBox } from "@mui/icons-material"; //placeholder

const Header = () => {
  const { push } = useRouter();
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          onClick={() => {
            push("/");
          }}
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}>
          <Flag />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          dojyaaa~n
        </Typography>
        <IconButton
          onClick={() => {
            push("/edit");
          }}
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ ml: 2 }}>
          <AddBox />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
