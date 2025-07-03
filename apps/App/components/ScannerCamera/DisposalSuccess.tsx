import { ScannerCameraStage } from "../../types/enums";
import { Box } from "../ui/box";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";

type disposalResult = {
  id: string;
  label: string;
  amount: string;
  confidence: string;
};

interface aiResultInterface {
  detectedItems: disposalResult[];
  timestamp: string;
}

interface DisposalSuccessProps {
  actionStage: ScannerCameraStage;
  aiResult: aiResultInterface;
  handleRestart: () => void;
}

export default function DisposalSuccess({
  actionStage,
  aiResult,
  handleRestart,
}: DisposalSuccessProps) {
  if (actionStage !== ScannerCameraStage.End) return;

  return (
    <Box className="absolute w-full h-screen bg-white flex justify-around items-center gap-4">
      <Box className="flex gap-4">
        <Box className="flex flex-row justify-center items-center gap-2">
          <Heading className="text-3xl">Success</Heading>
          <AntDesign name="checkcircle" size={24} color="green" />
        </Box>
        <Heading className="self-center">Disposal Results</Heading>
        <Box className="mx-8 border-2 border-black rounded-md p-2 bg-black">
          {aiResult.detectedItems.map((item) => (
            <Box className="flex flex-row" key={item.id}>
              <Box className="w-7/12">
                <Text className="text-white">{`${item.label} * ${item.amount}`}</Text>
              </Box>
              <Box className="w-5/12">
                <Text className="text-white">{`AI Confidence: ${+item.confidence * 100}%`}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Button onPress={handleRestart}>
        <ButtonText>OK</ButtonText>
      </Button>
    </Box>
  );
}
