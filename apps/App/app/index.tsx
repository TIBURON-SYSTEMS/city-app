import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeList from "@/components/ChallengeList";
import { useQuery } from "@tanstack/react-query";

import LogoutButton from "@/components/LogoutButton";
import Challenge from "@/types/types";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { useAuth0 } from "react-native-auth0";
import { Box } from "@/components/ui/box";

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
  const { user } = useAuth0();

  return (
    <SafeAreaView className="bg-white">
      {user && (
        <Box className="flex flex-row justify-end items-end gap-2 px-7">
          <Avatar size="md">
            <AvatarFallbackText>{user.name}</AvatarFallbackText>
          </Avatar>
          <LogoutButton />
        </Box>
      )}
      <ChallengeList challenges={data} />
    </SafeAreaView>
  );
}
