import { Link, router, useLocalSearchParams } from "expo-router";
import { Text } from "./ui/text";
import { Button, ButtonText } from "./ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "./ui/image";
import { useAuth0 } from "react-native-auth0";
import api from "@/api/api";

export default function RewardSection() {
  const { id } = useLocalSearchParams();

  const { user } = useAuth0();

  const queryClient = useQueryClient();

  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  const { data: reward } = useQuery({
    queryKey: ["reward", id as string],
    queryFn: () => api.getRewardById(id as string),
  });

  const { data: eligibleReward } = useQuery({
    queryKey: ["eligibleReward", participant?.participantId, id],
    queryFn: () =>
      api.getEligibleReward(participant?.participantId, id as string),
  });

  const selectRewardMutation = useMutation({
    mutationFn: () =>
      api.selectReward(participant?.participantId, id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selectedRewards", participant?.participantId],
      });
    },
  });

  async function handlePressSelectReward() {
    selectRewardMutation.mutate();
    router.back();
  }

  if (!reward) return;

  return (
    <Box className="px-7 bg-white h-full">
      <Card className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center ">
        <Box className="flex flex-row justify-between w-full">
          <Link href="/">
            <Button
              className="w-10"
              variant="link"
              onPress={() => router.back()}
            >
              <AntDesign name="leftcircle" size={24} color="black" />
            </Button>
          </Link>
        </Box>

        <Box className="flex-1 bg-white px-6 pt-10 w-full">
          <Box className="flex gap-8 items-center">
            <Text className="text-2xl font-semibold text-gray-900 capitalize">
              {reward.label}
            </Text>
            <Text>Amount: {reward.amount}</Text>

            <Image
              source={{ uri: reward.imageUrl }}
              className="w-full h-48 rounded-xl"
              resizeMode="contain"
              alt={reward.label}
            />
            {eligibleReward && (
              <Button
                onPress={handlePressSelectReward}
                className="rounded-full"
              >
                <ButtonText>Select this reward</ButtonText>
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
