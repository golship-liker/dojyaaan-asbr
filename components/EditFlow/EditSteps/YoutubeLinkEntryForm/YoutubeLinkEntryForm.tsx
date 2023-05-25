import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Video } from "../../../../types";
import { fetchYoutubeVideoDetails } from "../../../../apis/youtube";
interface YoutubeLinkEntryFormProps {
  onVideoChange: (video: Video) => void;
}

const ytRegexLiteral =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
const ytRegexTester = new RegExp(ytRegexLiteral);

const YoutubeLinkEntryForm = ({ onVideoChange }: YoutubeLinkEntryFormProps) => {
  const [currentInput, setInput] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    //console.log(ytRegexTester.test(currentInput));
    setIsValidInput(ytRegexTester.test(currentInput));
  }, [currentInput]);

  const handleOnSubmit = async () => {
    if (isValidInput) {
      try {
        const ytUrl = new URL(currentInput).searchParams.get("v");
        console.log(`yturl: ${ytUrl}`);
        const data = await fetchYoutubeVideoDetails(ytUrl);
        console.log(`data: ${JSON.stringify(data)}`);
        const snippet = data.data.items[0]?.snippet;

        if(!snippet) {
          throw Error('Video not found :(')
        }

        const {
          publishedAt: v_date,
          channelTitle: v_channel,
          description,
          title: v_name,
        } = snippet;

        onVideoChange({
          v_id: ytUrl,
          v_date,
          v_channel,
          description,
          v_name,
        });
      } catch (e) {
        console.error(e);
        setError(e);
      }
    }
  };

  const setHelperText = () => {
    if(!isValidInput && isDirty) {
      return 'Not a valid youtube link!'
    } else if (error) {
      return error.message;
    }
    return "ex: https://www.youtube.com/watch?v=abcdefg";
  }

  return (
    <div>
      <TextField
        onChange={(e) => {
          setInput(e.target.value);
          setIsDirty(true);
          setError(null);
        }}
        onKeyDown={(e) => (e.key === "Enter" ? handleOnSubmit() : null)}
        error={!isValidInput && isDirty || error}
        id="youtube-entry-field"
        label="Enter Youtube Link"
        helperText={setHelperText()}
        variant="standard"
      />
    </div>
  );
};

export default YoutubeLinkEntryForm;
