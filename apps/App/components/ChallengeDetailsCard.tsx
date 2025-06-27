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
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "react-native-auth0";

export default function ChallengeDetailsCard() {
  const { id } = useLocalSearchParams();

  const { authorize, clearSession, user } = useAuth0();

  const { data: challenge } = useQuery({
    queryKey: ["challenge", id],
    queryFn: getChallengeById,
  });

  async function getChallengeById(): Promise<Challenge | undefined> {
    const res = await fetch(`http://localhost:3000/api/challenge/${id}`);
    const data = await res.json();

    if (!data) return;

    return data.challenge;
  }

  if (!challenge) return;

  async function handlePress() {
    if (!user) {
      try {
        await authorize();
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }

  return (
    <Box className="px-7 bg-white h-full">
      <Card className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center">
        <Box className="flex gap-4">
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
            <Heading className="uppercase text-slate-900">
              {challenge.label}
            </Heading>
            <Text>by {challenge.brand}</Text>
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
        </Box>
        <Box className="mt-20">
          <Button onPress={handlePress} className="rounded-full">
            <ButtonText>Participate</ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
