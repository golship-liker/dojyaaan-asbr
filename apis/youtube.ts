import axios from 'axios';

const youtubeClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: {
    Accept: 'application/json'
  },
  auth: {
    username: process.env.GOOGLE_CLIENT_ID,
    password: process.env.GOOGLE_CLIENT_SECRET,
  },
  params: {
    key: process.env.YT_API_KEY,
  },
});

export async function fetchYoutubeVideoDetails(id: string) {
  const data = await youtubeClient.get("/videos", {
    params: {
      id,
      part: "snippet",
      fields: "items(snippet/title, snippet/description, snippet/channelTitle)",
    },
  });

  return data;
}
