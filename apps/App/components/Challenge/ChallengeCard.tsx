import { Link } from "expo-router";
import Challenge from "../../types/types";
import { useAuth0 } from "react-native-auth0";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseUrl";
import { Card } from "../ui/card";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Progress, ProgressFilledTrack } from "../ui/progress";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { user } = useAuth0();

  async function getChallengeProgress() {
    const res = await fetch(
      `${BASE_URL}/api/participation?userId=${user?.sub}&challengeId=${challenge.id}`
    );

    const data = await res.json();

    if (!data) return;

    return data.participation;
  }

  const { data: participation } = useQuery({
    queryKey: ["progress", user?.sub, challenge.id],
    queryFn: getChallengeProgress,
  });

  return (
    <Link
      className="mb-4"
      href={{
        pathname: "/details/[id]",
        params: { id: challenge.id },
      }}
    >
      <Card className="flex flex-col py-[20pt] px-[16pt] w-full border border-slate-300">
        <Box className="flex flex-row justify-between">
          <Heading className="uppercase text-slate-800">
            {challenge.label}
          </Heading>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </Box>

        <Text className="mb-2">by {challenge.brand}</Text>

        {user && participation && (
          <>
            <Text className="mb-2">
              {participation.progressAmount} of {challenge.goal} items sorted
            </Text>
            <Progress
              value={participation.progressAmount}
              size="md"
              orientation="horizontal"
            >
              <ProgressFilledTrack />
            </Progress>
          </>
        )}
      </Card>
    </Link>
  );
}
