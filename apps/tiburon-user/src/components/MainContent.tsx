import { NavItemType } from "@/types/nav";
import ChallengesList from "./ChallengesList";

interface MainContentProps {
  status: NavItemType;
}

export default function MainContent({ status }: MainContentProps) {
  return <div>{status === NavItemType.CHALLENGES && <ChallengesList />}</div>;
}
