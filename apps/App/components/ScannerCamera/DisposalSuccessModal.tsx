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

  if (
    actionStage !== ScannerCameraStage.End ||
    !aiResult ||
    affectedChallenges.length === 0
  )
    return;

  return (
    <>
      <Box className="absolute w-full h-screen bg-white flex p-4">
        <VStack space="lg" className="w-full max-w-4xl">
          <HStack className="justify-center items-center gap-3 mb-4">
            <Heading className="text-3xl">Great Job!</Heading>
            <AntDesign name="checkcircle" size={24} color="green" />
          </HStack>

          <Heading className="text-2xl text-center mb-4">
            Disposal Results
          </Heading>

          <Box className="border-2 border-black rounded-lg overflow-hidden mb-4">
            <Box className="bg-black p-3">
              <HStack className="justify-between">
                <Box className="flex-1">
                  <Text className="text-white font-bold">Disposed Product</Text>
                </Box>
                <Box className="flex-1 ml-4">
                  <Text className="text-white font-bold">Brand</Text>
                </Box>
                <Box className="w-20">
                  <Text className="text-white font-bold text-right">
                    Quantity
                  </Text>
                </Box>
              </HStack>
            </Box>

            <ScrollView className="h-44">
              <VStack>
                {aiResult.detectedItems.map((item, index) => (
                  <Box
                    key={item.id}
                    className={`p-3 border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <HStack className="justify-between items-center">
                      <Box className="flex-1">
                        <Text className="font-medium">
                          {item.disposedProduct.label}
                        </Text>
                      </Box>
                      <Box className="flex-1 ml-4">
                        <Text className="text-gray-600">
                          {item.disposedProduct.brandName}
                        </Text>
                      </Box>
                      <Box className="w-20">
                        <Text className="text-right font-semibold">
                          {item.amount}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </ScrollView>
          </Box>
          <Box>
            <Heading className="text-2xl text-center mb-4">
              Affected Challenges
            </Heading>
            <Box className="border-2 border-black rounded-lg overflow-hidden">
              <Box className="bg-black p-3">
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
                  {affectedChallenges.map((affectedChallenge, index) => (
                    <Box
                      key={affectedChallenge.challengeId}
                      className={`p-3 border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <HStack className="justify-between items-center">
                        <Box className="flex-1">
                          <Text className="font-medium">
                            {affectedChallenge.challengeTitle}
                          </Text>
                        </Box>
                        <Box className="flex-1">
                          <Text className="font-medium text-right text-green-700">
                            +{affectedChallenge.amount}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </ScrollView>
            </Box>
          </Box>
        </VStack>
      </Box>
      <Button className="rounded-full" onPress={handleRestart}>
        <ButtonText>Scan More</ButtonText>
      </Button>
    </>
  );
}
