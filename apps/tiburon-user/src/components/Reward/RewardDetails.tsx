import api from "@/api/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "@tanstack/react-router";
import BackButton from "../Buttons/BackButton";

export default function RewardDetails() {
  const { rewardId } = useParams({ from: "/reward/$rewardId" });
  const router = useRouter();
  const { user } = useAuth0();

  const queryClient = useQueryClient();

  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  const { data: reward } = useQuery({
    queryKey: ["reward", rewardId as string],
    queryFn: () => api.getRewardById(rewardId as string),
  });

  const { data: eligibleReward } = useQuery({
    queryKey: ["eligibleReward", participant?.participantId, rewardId],
    queryFn: () =>
      api.getEligibleReward(participant?.participantId, rewardId as string),
  });

  const selectRewardMutation = useMutation({
    mutationFn: () =>
      api.selectReward(participant?.participantId, rewardId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selectedRewards", participant?.participantId],
      });
    },
  });

  async function handlePressSelectReward() {
    selectRewardMutation.mutate();
    router.history.back();
  }

  if (!reward) return;

  return (
    <div className="px-7 bg-white min-h-screen">
      <div className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 rounded-xl min-h-[60vh] items-center">
        <div className="flex flex-row justify-between w-full">
          <BackButton />
        </div>

        <div className="w-full bg-white px-6 pt-10">
          <div className="flex flex-col gap-6 items-center text-center">
            <h1 className="text-2xl font-semibold text-gray-900 capitalize">
              {reward.label}
            </h1>

            <p className="text-gray-700">Amount: {reward.amount}</p>

            <img
              src={reward.imageUrl}
              alt={reward.label}
              className="w-full h-48 object-contain rounded-xl"
            />

            {eligibleReward && (
              <button
                type="button"
                onClick={handlePressSelectReward}
                className="bg-black text-white px-5 py-2 rounded-full hover:bg-neutral-800 transition-colors"
              >
                Select this reward
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
