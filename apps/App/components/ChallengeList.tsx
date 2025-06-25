import { ScrollView } from "react-native";
import ChallengeCard from "./ChallengeCard";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";

export type Challenge = {
  id: string;
  label: string;
  brand: string;
  amount: number;
  description: string;
  goal: number;
};

interface ChallengeListProps {
  challenges: Challenge[];
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <Box className="flex flex-col w-full h-full px-7 bg-white">
      <Heading className="text-2xl mb-4 mt-4 text-slate-900">
        My Challenge
      </Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        {challenges.map((challenge) => {
          return <ChallengeCard key={challenge.id} challenge={challenge} />;
        })}
      </ScrollView>
    </Box>
  );
}
