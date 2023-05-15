import { TextField } from "@mui/material";

const YoutubeLinkEntryForm = () => {

  const handleOnSubmit = async () => {
    
  }

  return (
    <div>
      <TextField
        id="youtube-entry-field"
        label="Enter Youtube Link"
        helperText="ex: https://www.youtube.com/watch?v=abcdefg"
        variant="standard"
      />
    </div>
  );
};

export default YoutubeLinkEntryForm;
