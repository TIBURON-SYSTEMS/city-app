import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { useAuth0 } from "react-native-auth0";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Link } from "expo-router";

export default function Tab() {
  const { user, authorize } = useAuth0();

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

  //get participant id
  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  //get rewards
  const { data: challengesWithRewards } = useQuery({
    queryKey: ["challengesWithRewards", participant?.participantId],
    queryFn: () => api.getChallengesWithRewards(participant?.participantId),
    enabled: !!participant?.participantId,
  });

  return (
    <SafeAreaView className="bg-white">
      <Box className="flex flex-col w-full h-full px-7 bg-white">
        {user && (
          <>
            <HStack className=" justify-between items-center">
              <Avatar size="md">
                <AvatarFallbackText>{user.email}</AvatarFallbackText>
              </Avatar>
              <Text className="text-lg font-semibold">{user.email}</Text>
              <LogoutButton />
            </HStack>
            <Heading className="text-2xl mb-4 mt-4 text-slate-900">
              🎁 Your rewards
            </Heading>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box>
                {challengesWithRewards?.map((item) => {
                  return (
                    <Card
                      key={item.challengeId}
                      className="flex flex-col py-[20pt] px-[16pt] w-full border border-slate-300 mb-4"
                    >
                      <Heading className="uppercase text-slate-800">
                        {item.challengeLabel}
                      </Heading>

                      <HStack>
                        <ScrollView horizontal={true}>
                          {item.rewards.map((reward) => (
                            <Link
                              className="mr-4"
                              href={`/reward/${reward.id}`}
                              key={reward.id}
                            >
                              {reward.imageUrl && (
                                <Image
                                  source={{ uri: reward.imageUrl }}
                                  className="size-20"
                                  resizeMode="contain"
                                  alt={reward.label}
                                />
                              )}
                            </Link>
                          ))}
                        </ScrollView>
                      </HStack>
                    </Card>
                  );
                })}
              </Box>
            </ScrollView>
          </>
        )}
        {!user && (
          <Box className="h-full flex justify-center gap-3 items-center">
            <Text>Please login or create an account</Text>
            <Button
              size="lg"
              onPress={handleLoginPress}
              className="rounded-full"
            >
              <ButtonText>Login</ButtonText>
            </Button>
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
}
