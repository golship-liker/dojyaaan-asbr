import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Video } from "../../types";
import SignIn from "./EditSteps/SignIn/SignIn";
import YoutubeLinkEntryForm from "./EditSteps/YoutubeLinkEntryForm/YoutubeLinkEntryForm";

const stepLabels = ["Sign in", "Enter Youtube Link", "Confirm Video", "Timestamps"];

enum Steps {
  SIGN_IN,
  ENTER_LINK,
  VIDEO_CONFIRM,
  TIMESTAMPS,
}

export interface EditFlowProps {
  videoId?: string;
}

export type StepConfig = {
  content: JSX.Element;
  handleNextStep?: () => void;
};

const EditFlow = ({ videoId }: EditFlowProps) => {
  const [activeStep, setActiveStep] = useState(Steps.ENTER_LINK);
  const [currentVideo, setCurrentVideo] = useState(undefined);
  const { data, status } = useSession();
  const handleVideoChange = async (video: Video) => {
    setCurrentVideo(video);
  };
  const stepConfigs: Record<Steps, StepConfig> = {
    [Steps.SIGN_IN]: {
      content: <SignIn />,
    },
    [Steps.ENTER_LINK]: {
      content: <YoutubeLinkEntryForm onVideoChange={handleVideoChange} />,
    },
    [Steps.VIDEO_CONFIRM]: {
      content: <>This Would be a video details confirmation page</>,
    },
    [Steps.TIMESTAMPS]: {
      content: <>This Would be a timestamps page</>,
    },
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      setActiveStep(Steps.SIGN_IN);
    } else if (status === "authenticated") {
      if (!!videoId) {
        setActiveStep(Steps.TIMESTAMPS);
      } else if (currentVideo) {
        setActiveStep(Steps.VIDEO_CONFIRM);
      } else {
        setActiveStep(Steps.ENTER_LINK)
      }
    }
  }, [status, videoId, currentVideo]);

  const activeStepConfig = stepConfigs[activeStep];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {stepLabels.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>{status === "loading" ? <>Loading...</> : activeStepConfig.content}</>
    </Box>
  );
};

export default EditFlow;
