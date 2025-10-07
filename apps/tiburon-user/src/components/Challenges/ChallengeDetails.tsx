import api from "@/api/api";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";
// import { challenges } from "@/mocks/challenges";

export default function ChallengeDetails() {
  // const { user, isAuthenticated } = useAuth0();
  const router = useRouter();
  const { challengeId } = useParams({ from: "/challenge/$challengeId" });
  // const queryClient = useQueryClient();
  // const currentChallenge = challenges.find(
  //   (challenge) => challenge.id === challengeId
  // );

  // const { data: participant } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => api.getUserByEmail(user?.email),
  //   enabled: isAuthenticated,
  // });

  const { data: currentChallenge } = useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => api.getChallengeById(challengeId as string),
  });

  // const { data: participationData } = useQuery({
  //   queryKey: ["progress", participant?.participantId, challengeId as string],
  //   queryFn: () =>
  //     api.getChallengeProgress(
  //       participant?.participantId,
  //       challengeId as string
  //     ),
  // });

  // const participationMutation = useMutation({
  //   mutationFn: () =>
  //     api.createParticipation(
  //       participant?.participantId,
  //       challengeId as string
  //     ),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["OnGoingAvailableChallenges", participant?.participantId],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [
  //         "progress",
  //         participant?.participantId,
  //         challengeId as string,
  //       ],
  //     });
  //   },
  // });

  // async function handleParticipatePress() {
  //   participationMutation.mutate();
  // }

  if (!currentChallenge) return;

  return (
    <div className="px-7 bg-white h-full">
      <div className="flex flex-col py-5 px-4 mt-4 mb-4 border border-slate-300 h-full items-center w-full rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-between w-full mb-4">
          <button
            onClick={() => router.history.back()}
            className="cursor-pointer hover:underline"
          >
            <CircleArrowLeft />
          </button>
        </div>

        <h2 className="uppercase text-slate-900 text-xl font-bold mb-2">
          {currentChallenge.label}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Link to="/brand/$brandId" params={{ id: currentChallenge.brandId }}>
            <span className="text-gray-400">
              by {currentChallenge.brandName}
            </span>
          </Link>
        </div>

        <div className="mb-4">
          <h3 className="text-slate-900 text-base font-semibold">
            Description
          </h3>
          <p className="text-slate-800">{currentChallenge.description}</p>
        </div>

        <div className="mb-4 w-full">
          <h3 className="text-slate-900 text-base font-semibold mb-1">
            Rewards
          </h3>
          <div className="flex gap-2">
            {currentChallenge.rewards.map((reward) => (
              <Link
                key={reward.id}
                to="/reward/$rewardId"
                params={{ id: reward.id.toString() }}
              >
                <span className="px-3 py-1 bg-slate-100 rounded-xl border border-slate-300 text-sm">
                  {reward.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
