import { Link } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Challenge } from "@/types/types";
import api from "@/api/api";
import ChallengeProgress from "./ChallengeProgress";

interface ChallengeCardProps {
  challenge: Challenge;
  ongoing: boolean;
}

export default function ChallengeCard({
  challenge,
  ongoing = false,
}: ChallengeCardProps) {
  const { user } = useAuth0();

  //get participant id
  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  //get participation
  const { data: participationData } = useQuery({
    queryKey: ["progress", participant?.participantId, challenge.id],
    queryFn: () =>
      api.getChallengeProgress(participant?.participantId, challenge.id),
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

        <Text className="mb-2">by {challenge.brandName}</Text>

        {user && participationData?.isParticipating && ongoing && (
          <ChallengeProgress
            heading={false}
            amount={participationData.participation?.amount}
            goal={challenge.goal}
            productName={challenge.productName}
          />
        )}
      </Card>
    </Link>
  );
}
