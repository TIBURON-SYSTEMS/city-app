import { ScrollView } from "react-native";
import ChallengeCard from "./ChallengeCard";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import { useAuth0 } from "react-native-auth0";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { Text } from "../ui/text";

export default function ChallengeList() {
  const { user } = useAuth0();

  //get participant id
  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  //get ongoing and available challenges
  const { data } = useQuery({
    queryKey: ["OnGoingAvailableChallenges", participant?.participantId],
    queryFn: () =>
      api.getOnGoingAvailableChallenges(participant?.participantId),
    enabled: !!participant,
  });

  //get all challenges
  const { data: challenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: api.getChallenges,
  });

  return (
    <Box className="flex flex-col w-full h-full px-7 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <>
            <Box>
              <Heading className="text-2xl mb-4 mt-4 text-slate-900">
                🚀 On Going Challenges
              </Heading>
              {data?.ongoingChallengesRes.map((challenge) => {
                return (
                  <ChallengeCard
                    ongoing={true}
                    key={challenge.id}
                    challenge={challenge}
                  />
                );
              })}
              {data?.ongoingChallengesRes.length === 0 && (
                <Box>
                  <Text>No on going challenges</Text>
                </Box>
              )}
            </Box>

            {data?.completedChallengesRes &&
              data?.completedChallengesRes.length > 0 && (
                <Box>
                  <Heading className="text-2xl mb-4 mt-4 text-slate-900">
                    ✅ Completed Challenges
                  </Heading>
                  {data?.completedChallengesRes.map((challenge) => {
                    return (
                      <ChallengeCard
                        ongoing={false}
                        key={challenge.id}
                        challenge={challenge}
                      />
                    );
                  })}
                </Box>
              )}

            <Box>
              <Heading className="text-2xl mb-4 mt-4 text-slate-900">
                🔥 Available Challenges
              </Heading>
              {data?.availableChallengesRes.map((challenge) => {
                return (
                  <ChallengeCard
                    ongoing={false}
                    key={challenge.id}
                    challenge={challenge}
                  />
                );
              })}
              {data?.availableChallengesRes.length === 0 && (
                <Box>
                  <Text>No challenges available for the moment</Text>
                </Box>
              )}
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
                  ongoing={false}
                  key={challenge.id}
                  challenge={challenge}
                />
              );
            })}
            {challenges?.length === 0 && (
              <Box>
                <Text>No challenges available for the moment</Text>
              </Box>
            )}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
