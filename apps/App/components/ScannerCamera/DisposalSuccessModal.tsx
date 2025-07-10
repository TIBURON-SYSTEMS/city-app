import { ScannerCameraStage } from "../../types/enums";
import { Box } from "../ui/box";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import { ScrollView } from "react-native";
import { AffectedChallengeWithAmount, aiResultInterface } from "@/types/types";
import DisposalResultsTable from "./DisposalResultsTable";
import AffectedChallengesList from "./AffectedChallengesList";

interface DisposalSuccessModalProps {
  actionStage: ScannerCameraStage;
  aiResult: aiResultInterface | undefined;
  handleRestart: () => void;
  affectedChallenges: AffectedChallengeWithAmount[] | undefined;
}

export default function DisposalSuccessModal({
  actionStage,
  aiResult,
  handleRestart,
  affectedChallenges,
}: DisposalSuccessModalProps) {
  if (!affectedChallenges) return;

  if (actionStage !== ScannerCameraStage.End || !aiResult) return;

  return (
    <>
      <Box className="absolute w-full h-screen bg-white flex p-4">
        <VStack space="lg" className="w-full max-w-4xl">
          <HStack className="justify-center items-center gap-3 mb-4">
            <Heading className="text-3xl">Great Job!</Heading>
            <AntDesign name="checkcircle" size={24} color="green" />
          </HStack>

          <DisposalResultsTable items={aiResult.detectedItems} />

          {affectedChallenges.length === 0 && (
            <VStack className="items-center gap-6">
              <Text className="text-center">
                ⚠️ Products that were discared did not match any ongoing
                challenges
              </Text>
              {/* <Button className="rounded-full" onPress={handleRestart}>
            <ButtonText>Scan More</ButtonText>
          </Button> */}
            </VStack>
          )}

          {affectedChallenges.length > 0 && (
            <AffectedChallengesList challenges={affectedChallenges} />
          )}
          <Box className="flex items-center mt-6">
            <Button className="rounded-full" onPress={handleRestart}>
              <ButtonText>Scan More</ButtonText>
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}
