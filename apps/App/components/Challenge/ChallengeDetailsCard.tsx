import { Link, router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Challenge from "../../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "react-native-auth0";
import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { BASE_URL } from "../../utils/baseUrl";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Badge, BadgeText } from "../ui/badge";
import { Progress, ProgressFilledTrack } from "../ui/progress";

export default function ChallengeDetailsCard() {
  const [isParticipated, setIsParticipated] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { id } = useLocalSearchParams();

  const { authorize, user, isLoading } = useAuth0();

  useEffect(() => {
    getChallengeById();
  }, [isLoading, user]);

  const mutation = useMutation({
    mutationFn: () => addUserToChallenge(user?.email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ongoing-challenges"] });
      queryClient.invalidateQueries({ queryKey: ["available-challenges"] });
    },
  });

  const { data: challenge } = useQuery({
    queryKey: ["challenge", id],
    queryFn: getChallengeById,
  });

  async function getChallengeById(): Promise<Challenge | undefined> {
    const res = await fetch(`${BASE_URL}/api/challenge/${id}`);
    const data = await res.json();

    if (!data) return;

    if (
      data.challenge.users.some(
        (participatedUser: { id: string; email: string }) =>
          participatedUser.email === user?.email
      )
    ) {
      setIsParticipated(true);
    }

    return data.challenge;
  }

  async function addUserToChallenge(email: string | undefined) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const res = await fetch(`${BASE_URL}/api/challenge/${id}`, options);
    const data = await res.json();

    data.users.forEach((user: { id: string; email: string }) => {
      if (user.email === email) {
        setIsParticipated(true);
      }
    });
    return;
  }

  async function getChallengeProgress() {
    const res = await fetch(
      `${BASE_URL}/api/participation?userId=${user?.sub}&challengeId=${challenge?.id}`
    );

    const data = await res.json();

    if (!data) return;

    return data.participation;
  }

  const { data: participation } = useQuery({
    queryKey: ["progress", user?.sub, challenge?.id],
    queryFn: getChallengeProgress,
  });

  async function getRewardsByChallengeId() {
    const res = await fetch(`${BASE_URL}/api/rewards?challengeId=${id}`);
    const data = await res.json();

    if (!data) return;

    return data.rewards;
  }

  const { data: rewards } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewardsByChallengeId,
  });

  if (!challenge) return;
  //if user is alreary a participant Participate button is still rendered and it should be gone
  async function handlePress() {
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
    } else {
      mutation.mutate();
    }
  }

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
                {!isParticipated && (
                  <Button onPress={handlePress} className="rounded-full">
                    {!user && <ButtonText>Login</ButtonText>}
                    {user && <ButtonText>Participate</ButtonText>}
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
                  <Text>by {challenge.brand}</Text>
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
                {/* temporarily give a interface for reward */}
                {rewards.map((reward: { id: string; label: string }) => (
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
                      <BadgeText>{reward.label}</BadgeText>
                    </Badge>
                  </Link>
                ))}
              </HStack>
            </Box>

            {!isParticipated && (
              <Box>
                <Heading className="text-slate-900 text-base font-semibold">
                  Goal
                </Heading>
                <Text>{`Recycle ${challenge.goal} ${challenge.product}s`}</Text>
              </Box>
            )}

            {isParticipated && (
              <Box>
                <Heading className="text-slate-900 text-base font-semibold">
                  Current progress
                </Heading>
                <Text className="mb-2">
                  {participation.progressAmount} of {challenge.goal} items
                  sorted
                </Text>
                <Progress
                  value={participation.progressAmount}
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
