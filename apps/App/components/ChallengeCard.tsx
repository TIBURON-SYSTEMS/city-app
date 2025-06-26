import { Link } from "expo-router";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Progress, ProgressFilledTrack } from "./ui/progress";
import { Text } from "./ui/text";
import { Challenge } from "@/app/types/types";

interface ChallengeCardProps {
  challenge: Challenge;
}
export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Link
      className="mb-4"
      href={{
        pathname: "/details/[id]",
        params: { id: challenge.id },
      }}
    >
      <Card className="flex flex-col py-[20pt] px-[16pt] w-full border border-slate-300">
        <Heading className="uppercase text-slate-800">
          {challenge.label}
        </Heading>
        <Text className="mb-2">by {challenge.brand}</Text>
        <Text className="mb-2">
          {challenge.amount} of {challenge.goal} items sorted
        </Text>
        <Progress value={challenge.amount} size="md" orientation="horizontal">
          <ProgressFilledTrack />
        </Progress>
      </Card>
    </Link>
  );
}
