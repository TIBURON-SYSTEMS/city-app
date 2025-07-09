import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Progress, ProgressFilledTrack } from "../ui/progress";
interface ChallengeProgressProps {
  amount: number | undefined;
  goal: number;
  productName: string;
  heading: boolean;
}
export default function ChallengeProgress({
  heading,
  amount,
  goal,
  productName,
}: ChallengeProgressProps) {
  if (!amount) return;

  return (
    <Box>
      {heading && (
        <Heading className="text-slate-900 text-base font-semibold">
          Current progress
        </Heading>
      )}
      <Text className="mb-2 lowercase">
        {amount} of {goal} {productName}s recycled
      </Text>
      <Progress
        value={(amount / goal) * 100}
        size="md"
        orientation="horizontal"
      >
        <ProgressFilledTrack />
      </Progress>
    </Box>
  );
}
