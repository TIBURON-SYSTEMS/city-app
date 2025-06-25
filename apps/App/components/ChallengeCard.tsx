import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Progress, ProgressFilledTrack } from "./ui/progress";
import { Text } from "./ui/text";

type Challenge = {
  id: string;
  label: string;
  description: string;
  brand: string;
  amount: number;
  goal: number;
};
interface ChallengeCardProps {
  challenge: Challenge;
}
export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="flex flex-col py-[20pt] px-[16pt] w-full mb-4 border border-slate-300">
      <Heading className="uppercase text-slate-800">{challenge.label}</Heading>
      <Text className="mb-2">by {challenge.brand}</Text>
      <Text className="mb-2">
        {challenge.amount} of {challenge.goal} items sorted
      </Text>
      <Progress value={challenge.amount} size="md" orientation="horizontal">
        <ProgressFilledTrack />
      </Progress>
    </Card>
  );
}
