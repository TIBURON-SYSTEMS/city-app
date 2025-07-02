import { Link } from "expo-router";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Progress, ProgressFilledTrack } from "./ui/progress";

import Challenge from "../types/types";
import { useAuth0 } from "react-native-auth0";
import { Box } from "./ui/box";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text } from "./ui/text";

interface ChallengeCardProps {
  challenge: Challenge;
  isOnGoing: boolean;
}
export default function ChallengeCard({
  challenge,
  isOnGoing,
}: ChallengeCardProps) {
  const { user } = useAuth0();

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

        {user && isOnGoing && (
          <>
            <Text className="mb-2">
              {challenge.amount} of {challenge.goal} items sorted
            </Text>
            <Progress
              value={challenge.amount}
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
