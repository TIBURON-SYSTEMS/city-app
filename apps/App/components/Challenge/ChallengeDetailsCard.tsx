import { Link, router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "react-native-auth0";

import { ScrollView, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Badge, BadgeText } from "../ui/badge";
import { Progress, ProgressFilledTrack } from "../ui/progress";

import api from "@/api/api";

export default function ChallengeDetailsCard() {
  const { id } = useLocalSearchParams();
  const { authorize, user } = useAuth0();
  const queryClient = useQueryClient();

  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  const { data: challenge } = useQuery({
    queryKey: ["challenge", id],
    queryFn: () => api.getChallengeById(id as string),
  });

  const { data: participationData } = useQuery({
    queryKey: ["progress", participant?.participantId, id as string],
    queryFn: () =>
      api.getChallengeProgress(participant?.participantId, id as string),
  });

  const participationMutation = useMutation({
    mutationFn: () =>
      api.createParticipation(participant?.participantId, id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["OnGoingAvailableChallenges", participant?.participantId],
      });
    },
  });

  async function handleLoginPress() {
    if (!user) {
      try {
        await authorize({
          additionalParameters: {
            prompt: "select_account",
          },
        });
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }

  async function handleParticipatePress() {
    participationMutation.mutate();
  }

  if (!challenge) return;

  return (
    <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
      <Box className="px-7 bg-white h-full">
        <Card className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center">
          <Box className="flex gap-4">
            <Box className="flex flex-row justify-between">
              <Link href="/">
                <Button
                  className="w-10"
                  variant="link"
                  onPress={() => router.back()}
                >
                  <AntDesign name="leftcircle" size={24} color="black" />
                </Button>
              </Link>
              <Box>
                {!user && (
                  <Button onPress={handleLoginPress} className="rounded-full">
                    <ButtonText>Login</ButtonText>
                  </Button>
                )}
                {user && participant && !participationData?.isParticipating && (
                  <Button
                    onPress={handleParticipatePress}
                    className="rounded-full"
                  >
                    <ButtonText>Participate</ButtonText>
                  </Button>
                )}
              </Box>
            </Box>
            <Box>
              <Heading className="uppercase text-slate-900">
                {challenge.label}
              </Heading>
              <Link
                href={{
                  pathname: "/brandinfo/[id]",
                  params: { id: challenge.brandId },
                }}
              >
                <View className="flex flex-row justify-center items-center gap-2">
                  <Text>by {challenge.brandName}</Text>
                  <Octicons name="link-external" size={16} color="#6B7280" />
                </View>
              </Link>
            </Box>
            <Box>
              <Heading className="text-slate-900 text-base font-semibold">
                Description
              </Heading>
              <Text className="text-slate-800">{challenge.description}</Text>
            </Box>
            <Box>
              <Heading className="text-slate-900 text-base font-semibold mb-1">
                Rewards
              </Heading>
              <HStack className="gap-2 flex-wrap">
                {challenge.rewards.map((reward) => (
                  <Link
                    key={reward.id}
                    href={{
                      pathname: "/reward/[id]",
                      params: { id: reward.id },
                    }}
                  >
                    <Badge
                      variant="outline"
                      className="bg-slate-100/80 rounded-xl"
                    >
                      <BadgeText className="mr-1">{reward.amount}</BadgeText>
                      <BadgeText>{reward.label}</BadgeText>
                    </Badge>
                  </Link>
                ))}
              </HStack>
            </Box>
            <Box>
              <Heading className="text-slate-900 text-base font-semibold">
                Completion Goal
              </Heading>
              <Text>{`Recycle ${challenge.goal} ${challenge.product}s`}</Text>
            </Box>

            {participationData?.isParticipating && (
              <Box>
                <Heading className="text-slate-900 text-base font-semibold">
                  Current progress
                </Heading>
                <Text className="mb-2">
                  {participationData.participation?.amount} of {challenge.goal}{" "}
                  items sorted
                </Text>
                <Progress
                  value={participationData.participation?.amount}
                  size="md"
                  orientation="horizontal"
                >
                  <ProgressFilledTrack />
                </Progress>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </ScrollView>
  );
}
