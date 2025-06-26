import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeList from "@/components/ChallengeList";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "./types/types";

export default function Index() {
  const { data } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  async function getChallenges(): Promise<Challenge[] | undefined> {
    const res = await fetch("http://localhost:3000/api/challenges");
    const data = await res.json();

    if (!data) return;

    return data.challenges;
  }

  return (
    <SafeAreaView className="bg-white">
      <ChallengeList challenges={data} />
    </SafeAreaView>
  );
}
