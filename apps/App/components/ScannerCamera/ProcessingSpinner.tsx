import { ScannerCameraStage } from "../../types/enums";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface ProcessingSpinnerProps {
  actionStage: ScannerCameraStage;
}

export default function ProcessingSpinner({
  actionStage,
}: ProcessingSpinnerProps) {
  if (actionStage !== ScannerCameraStage.Submit) return;

  return (
    <VStack className="absolute top-1/2 bg-black/50 gap-2 p-4 rounded-md">
      <Spinner size="large" color="white" />
      <Text className="text-white">Processing...</Text>
    </VStack>
  );
}
