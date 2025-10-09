import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import ChallengeCard from "./ChallengeCard";
import LoadingBlock from "../Blocks/LoadingBlock";
import ErrorBlock from "../Blocks/ErrorBlock";
import EmptyBlock from "../Blocks/EmptyBlock";
import type { Challenge, OnGoingAvailableRes } from "@/types/types";

export default function ChallengesList() {
  const { user, isAuthenticated } = useAuth0();

  // 取 participant
  const {
    data: participant,
    isLoading: loadingParticipant,
    isError: errorParticipant,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => api.getUserByEmail(user?.email),
    // enabled: !!user, // 只有有 user 時才查
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  // 取進行中、已完成、可參與清單（登入後）
  const {
    data: onGoingAvailable,
    isLoading: loadingOAC,
    isError: errorOAC,
  } = useQuery<OnGoingAvailableRes>({
    queryKey: ["OnGoingAvailableChallenges", participant?.participantId],
    queryFn: () =>
      api.getOnGoingAvailableChallenges(participant?.participantId),
    enabled: !!participant, // 有 participant 才查
    staleTime: 30_000,
  });

  // 取所有挑戰（未登入時）
  const {
    data: allChallenges,
    isLoading: loadingAll,
    isError: errorAll,
  } = useQuery<Challenge[]>({
    queryKey: ["challenges"],
    queryFn: api.getChallenges,
    enabled: !isAuthenticated, // 未登入顯示全部挑戰
    staleTime: 30_000,
  });

  return (
    <div className="h-full flex flex-col gap-4">
      <main className="flex flex-col gap-6 flex-1 px-5 py-4">
        {isAuthenticated ? (
          <>
            {/* 進行中 */}
            <section>
              <h2 className="text-2xl mb-4 mt-2 text-slate-900">
                🚀 On Going Challenges
              </h2>

              {loadingParticipant || loadingOAC ? (
                <LoadingBlock title="" />
              ) : errorParticipant ? (
                <ErrorBlock text="Can not access to user data, please try it later." />
              ) : errorOAC ? (
                <ErrorBlock text="Loading ongoing challenges failed, please try it later." />
              ) : onGoingAvailable?.ongoingChallengesRes?.length ? (
                <div className="flex flex-col space-y-3 gap-2">
                  {onGoingAvailable.ongoingChallengesRes.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      ongoing
                    />
                  ))}
                </div>
              ) : (
                <EmptyBlock text="No ongoing challenges now." />
              )}
            </section>

            {/* 已完成 */}
            {(() => {
              if (loadingParticipant || loadingOAC) return null;
              const list = onGoingAvailable?.completedChallengesRes ?? [];
              if (!list.length) return null;
              return (
                <section>
                  <h2 className="text-2xl mb-4 mt-2 text-slate-900">
                    ✅ Completed Challenges
                  </h2>
                  <div className="flex flex-col space-y-3 gap-2">
                    {list.map((challenge) => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                </section>
              );
            })()}

            {/* 可參與 */}
            <section>
              <h2 className="text-2xl mb-4 mt-2 text-slate-900">
                🔥 Available Challenges
              </h2>
              {loadingParticipant || loadingOAC ? (
                <LoadingBlock title="" />
              ) : errorParticipant ? (
                <ErrorBlock text="Can not access to user data, please try it later." />
              ) : errorOAC ? (
                <ErrorBlock text="Loading available challenges failed, please try it later." />
              ) : onGoingAvailable?.availableChallengesRes?.length ? (
                <div className="flex flex-col space-y-3 gap-2">
                  {onGoingAvailable.availableChallengesRes.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              ) : (
                <EmptyBlock text="No available challenges now." />
              )}
            </section>
          </>
        ) : (
          // 未登入，顯示所有挑戰
          <section>
            {loadingAll ? (
              <LoadingBlock title="Loading..." />
            ) : errorAll ? (
              <ErrorBlock text="Loading challenges failed, please try it later." />
            ) : allChallenges?.length ? (
              <div className="flex flex-col space-y-3 gap-2">
                {allChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            ) : (
              <EmptyBlock text="No available challenges now." />
            )}
          </section>
        )}
      </main>
    </div>
  );
}
