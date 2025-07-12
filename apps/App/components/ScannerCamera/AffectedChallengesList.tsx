import { AffectedChallengeWithAmount } from "@/types/types";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { Text } from "../ui/text";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { ScrollView } from "react-native";

interface AffectedChallengesListProps {
  challenges: AffectedChallengeWithAmount[];
}

export default function AffectedChallengesList({
  challenges,
}: AffectedChallengesListProps) {
  return (
    <Box>
      <Heading className="text-2xl text-center mb-4">
        Affected Challenges
      </Heading>
      <Box className="border border-black rounded-lg overflow-hidden">
        <Box className="bg-slate-800 p-3">
          <HStack className="justify-between">
            <Box className="flex-1">
              <Text className="text-white font-bold">Challenge Name</Text>
            </Box>
            <Box className="flex-1">
              <Text className="text-white font-bold text-right">
                Progression
              </Text>
            </Box>
          </HStack>
        </Box>

        <ScrollView className="h-44">
          <VStack>
            {challenges.map((affectedChallenge, index) => (
              <Box
                key={affectedChallenge.challengeId}
                className={`p-3 border-b border-gray-200  ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${affectedChallenge.completed && "bg-green-600"}`}
              >
                <HStack className="justify-between items-center">
                  <Box className="flex-1">
                    <Text
                      className={`font-medium ${affectedChallenge.completed && "text-slate-950"}`}
                    >
                      {affectedChallenge.challengeTitle}
                    </Text>
                  </Box>
                  <Box className="flex-1">
                    <Text
                      className={`font-medium text-right ${!affectedChallenge.completed && "text-green-700"} ${affectedChallenge.completed && "text-slate-950"}`}
                    >
                      {affectedChallenge.completed
                        ? "completed (check your rewards in profile page)"
                        : `+${affectedChallenge.amount}`}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}
