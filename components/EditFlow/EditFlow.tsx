import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Video } from "../../types";
import SignIn from "./EditSteps/SignIn/SignIn";

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
  const stepConfigs: Record<Steps, StepConfig> = {
    [Steps.SIGN_IN]: {
      content: <SignIn />,
    },
    [Steps.ENTER_LINK]: {
      content: <>This Would be an enter link page</>,
    },
    [Steps.VIDEO_CONFIRM]: {
      content: <>This Would be a video details confirmation page</>,
    },
    [Steps.TIMESTAMPS]: {
      content: <>This Would be a timestamps page</>,
    },
  };

  const handleVideoChange = async (video: Video) => {
    
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      setActiveStep(Steps.SIGN_IN);
    } else if (status === "authenticated") {
      !!videoId ? setActiveStep(Steps.TIMESTAMPS) : setActiveStep(Steps.ENTER_LINK)
    }
  }, [status, videoId]);

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
      <>{ status === 'loading' ? <>Loading...</> : activeStepConfig.content}</>
    </Box>
  );
};

export default EditFlow;
