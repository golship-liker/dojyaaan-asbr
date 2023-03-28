import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag"; //placeholder

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton href="/" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}>
          <FlagIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          dojyaaa~n
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
