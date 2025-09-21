import { PageContent } from "@/types/nav";
import ChallengesList from "./Challenges/ChallengesList";
import Map from "../components/Map/Map";

interface MainContentProps {
  status: PageContent;
}

export default function MainContent({ status }: MainContentProps) {
  return (
    <div>
      {status === PageContent.CHALLENGES && <ChallengesList />}
      {status === PageContent.MAP && <Map />}
    </div>
  );
}
