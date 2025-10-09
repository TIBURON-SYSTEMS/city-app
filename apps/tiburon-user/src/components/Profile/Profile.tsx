// src/pages/Profile.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import LogoutButton from "../Buttons/LogoutButton";
import { Link } from "@tanstack/react-router";

export default function Profile() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // 获取 participant
  const { data: participant } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user?.email,
  });

  // 获取奖励清单
  const { data: challengesWithRewards } = useQuery({
    queryKey: ["challengesWithRewards", participant?.participantId],
    queryFn: () => api.getChallengesWithRewards(participant?.participantId),
    enabled: !!participant?.participantId,
  });

  // 获取已选择的奖励
  const { data: selectedRewards } = useQuery({
    queryKey: ["selectedRewards", participant?.participantId],
    queryFn: () => api.getSelectedRewards(participant?.participantId),
    enabled: !!participant?.participantId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-700">Please login or create an account</p>
        <button
          onClick={() => loginWithRedirect()}
          className="px-5 py-2 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-[.99]"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[70vh] px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 grid place-items-center text-sm font-semibold text-gray-700">
            {user.email?.[0]?.toUpperCase()}
          </div>
          <div className="text-lg font-semibold text-gray-800 truncate">
            {user.email}
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Rewards */}
      <section className="mt-8">
        <h2 className="text-2xl mb-4 text-slate-900">🎁 Your rewards</h2>

        {Array.isArray(challengesWithRewards) &&
          challengesWithRewards.length === 0 && (
            <p className="text-gray-700">
              You do not have reward now. Go complete some challenge 🏆
            </p>
          )}

        <div className="space-y-4">
          {challengesWithRewards?.map((item) => (
            <div
              key={item.challengeId}
              className="border border-slate-300 rounded-xl p-4"
            >
              <h3 className="uppercase text-slate-800 font-semibold mb-2">
                {item.challengeLabel}
              </h3>

              <div className="overflow-x-auto">
                <div className="flex items-center gap-4 pb-2">
                  {item.rewards?.map((reward) => (
                    <Link
                      to={`/reward/${reward.id}`}
                      key={reward.id}
                      className="shrink-0"
                      title={reward.label}
                    >
                      {reward.imageUrl && (
                        <img
                          src={reward.imageUrl}
                          alt={reward.label}
                          className="w-20 h-20 object-contain"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected rewards */}
      <section className="mt-10">
        <h2 className="text-2xl mb-4 text-slate-900">🥰 Selected Rewards</h2>

        {Array.isArray(selectedRewards) && selectedRewards.length === 0 && (
          <p className="text-gray-700">
            You have not selected any rewards now. Go select your reward in your
            completed challenges 🏆
          </p>
        )}

        {Array.isArray(selectedRewards) && selectedRewards.length > 0 && (
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4">
              {selectedRewards.map((selectedReward) => (
                <div
                  key={selectedReward.rewardId}
                  className="border border-slate-300 rounded-xl p-3"
                  title={selectedReward.reward?.label}
                >
                  {selectedReward.reward?.imageUrl && (
                    <img
                      src={selectedReward.reward.imageUrl}
                      alt={selectedReward.reward.label}
                      className="w-20 h-20 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
