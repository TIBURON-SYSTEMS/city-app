import { Link, router, useLocalSearchParams } from "expo-router";
import { Badge, BadgeText } from "./ui/badge";
import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import Challenge from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "react-native-auth0";
import { useState, useEffect } from "react";
import { Progress, ProgressFilledTrack } from "./ui/progress";
import { ScrollView, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

export default function ChallengeDetailsCard() {
  const [isParticipated, setIsParticipated] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { id } = useLocalSearchParams();

  const { authorize, user, isLoading } = useAuth0();

  useEffect(() => {
    getChallengeById();
  }, [isLoading, user]);

  const { data: challenge } = useQuery({
    queryKey: ["challenge", id],
    queryFn: getChallengeById,
  });

  const mutation = useMutation({
    mutationFn: () => addUserToChallenge(user?.email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ongoing-challenges"] });
      queryClient.invalidateQueries({ queryKey: ["available-challenges"] });
    },
  });

  async function getChallengeById(): Promise<Challenge | undefined> {
    const res = await fetch(`http://localhost:3000/api/challenge/${id}`);
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

    const res = await fetch(
      `http://localhost:3000/api/challenge/${id}`,
      options
    );
    const data = await res.json();

    data.users.forEach((user: { id: string; email: string }) => {
      if (user.email === email) {
        setIsParticipated(true);
      }
    });
    return;
  }

  if (!challenge) return;
  //if user is alreary a participant Participate button is still rendered and it should be gone
  async function handlePress() {
    if (!user) {
      try {
        await authorize();
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
                {challenge.rewards.map((reward) => {
                  return (
                    <Badge
                      variant="outline"
                      className="bg-slate-100/80 rounded-xl"
                      key={reward}
                    >
                      <BadgeText>{reward}</BadgeText>
                    </Badge>
                  );
                })}
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
                  {challenge.amount} of {challenge.goal} items sorted
                </Text>
                <Progress
                  value={challenge.amount}
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
