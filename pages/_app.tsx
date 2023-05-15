import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import Layout from "../components/layout";
import { initializeApp } from "@firebase/app";
import { FirebaseAppProvider } from "reactfire";
import { HydrationProvider } from "react-hydration-provider";
import {SessionProvider} from 'next-auth/react';
const firebaseConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MEASUREMENTID,
};

export default function App({ Component, pageProps }) {
  const app = initializeApp(firebaseConfig);
  return (
    <HydrationProvider>
      <SessionProvider>
        <FirebaseAppProvider firebaseApp={app}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </FirebaseAppProvider>
      </SessionProvider>
    </HydrationProvider>
  );
}
