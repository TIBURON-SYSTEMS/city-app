import { PageContent } from "@/types/nav";
import ChallengesList from "./Challenges/ChallengesList";
import Map from "../components/Map/Map";
import CameraView from "./Camera/CameraView";
import Profile from "./Profile/Profile";

interface MainContentProps {
  status: PageContent;
}

export default function MainContent({ status }: MainContentProps) {
  return (
    <div>
      {status === PageContent.CHALLENGES && <ChallengesList />}
      {status === PageContent.CAMERA && <CameraView />}
      {status === PageContent.MAP && <Map />}
      {status === PageContent.PROFILE && <Profile />}
    </div>
  );
}
