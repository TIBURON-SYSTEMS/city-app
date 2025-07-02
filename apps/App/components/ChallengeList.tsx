import { ScrollView } from "react-native";
import ChallengeCard from "./ChallengeCard";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import Challenge from "../types/types";
import { useAuth0 } from "react-native-auth0";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseUrl";

export default function ChallengeList() {
  const { user } = useAuth0();

  async function getAvailableChallenges(): Promise<Challenge[]> {
    if (!user) return [];
    const res = await fetch(
      `${BASE_URL}/api/challenges/${user.email}?condition=available`
    );
    const data = await res.json();

    if (!data) return [];

    return data.availableChallenges;
  }

  async function getOnGoingChallenges(): Promise<Challenge[]> {
    if (!user) return [];
    const res = await fetch(
      `${BASE_URL}/api/challenges/${user.email}?condition=ongoing`
    );
    const data = await res.json();

    if (!data) return [];

    return data.onGoingChallenges;
  }

  async function getChallenges(): Promise<Challenge[]> {
    if (user) return [];

    const res = await fetch(`${BASE_URL}/api/challenges`);
    const data = await res.json();

    if (!data) return [];

    return data.challenges;
  }

  const { data: onGoingChallenges } = useQuery({
    queryKey: ["ongoing-challenges", user],
    queryFn: getOnGoingChallenges,
  });

  const { data: availableChallenges } = useQuery({
    queryKey: ["available-challenges", user],
    queryFn: getAvailableChallenges,
  });

  const { data: challenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  return (
    <Box className="flex flex-col w-full h-full px-7 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <>
            <Box>
              <Heading className="text-2xl mb-4 mt-4 text-slate-900">
                On Going Challenges
              </Heading>
              {onGoingChallenges?.map((challenge) => {
                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    isOnGoing={true}
                  />
                );
              })}
            </Box>
            <Box>
              <Heading className="text-2xl mb-4 mt-4 text-slate-900">
                Available Challenges
              </Heading>
              {availableChallenges?.map((challenge) => {
                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    isOnGoing={false}
                  />
                );
              })}
            </Box>
          </>
        )}
        {!user && (
          <Box>
            <Heading className="text-2xl mb-4 mt-4 text-slate-900">
              All Challenges
            </Heading>
            {challenges?.map((challenge) => {
              return (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isOnGoing={false}
                />
              );
            })}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
