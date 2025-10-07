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
                <ErrorBlock text="無法取得使用者資料，請稍後再試。" />
              ) : errorOAC ? (
                <ErrorBlock text="載入進行中挑戰失敗，請稍後再試。" />
              ) : onGoingAvailable?.ongoingChallengesRes?.length ? (
                <div className="space-y-3">
                  {onGoingAvailable.ongoingChallengesRes.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      ongoing
                    />
                  ))}
                </div>
              ) : (
                <EmptyBlock text="目前沒有進行中的挑戰" />
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
                  <div className="space-y-3">
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
                <ErrorBlock text="無法取得使用者資料，請稍後再試。" />
              ) : errorOAC ? (
                <ErrorBlock text="載入可參與挑戰失敗，請稍後再試。" />
              ) : onGoingAvailable?.availableChallengesRes?.length ? (
                <div className="space-y-3">
                  {onGoingAvailable.availableChallengesRes.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              ) : (
                <EmptyBlock text="目前沒有可參與的挑戰" />
              )}
            </section>
          </>
        ) : (
          // 未登入，顯示所有挑戰
          <section>
            {loadingAll ? (
              <LoadingBlock title="" />
            ) : errorAll ? (
              <ErrorBlock text="Loading challenges failed, please try it later." />
            ) : allChallenges?.length ? (
              <div className="flex flex-col space-y-3 gap-2">
                {allChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            ) : (
              <EmptyBlock text="No challenges available now." />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

// import { ChevronRight } from "lucide-react";
// // import { challenges } from "../../mocks/challenges";
// import { Link } from "@tanstack/react-router";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/api/api";

// export default function ChallengesList() {
//   const { user, isAuthenticated } = useAuth0();

//   //get participant id
//   const { data: participant } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => api.getUserByEmail(user?.email),
//     enabled: !!user,
//   });

//   //get ongoing and available challenges
//   const { data: onGoingAvailableChallenges } = useQuery({
//     queryKey: ["OnGoingAvailableChallenges", participant?.participantId],
//     queryFn: () =>
//       api.getOnGoingAvailableChallenges(participant?.participantId),
//     enabled: !!participant,
//   });

//   //get all challenges
//   const { data: challenges } = useQuery({
//     queryKey: ["challenges"],
//     queryFn: api.getChallenges,
//   });

//   if (!challenges) return;

//   return (
//     <div className="h-full bg-gray-50 flex flex-col gap-4">
//       <main className="flex flex-col gap-4 flex-1 px-5 py-2 space-y-3">
//         {challenges.map((challenge) => (
//           <Link
//             to="/challenge/$challengeId"
//             params={{ challengeId: challenge.id.toString() }}
//             key={challenge.id}
//           >
//             <div className="border border-gray-200 rounded-xl p-5 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
//               <div className="flex-1">
//                 <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
//                   {challenge.label}
//                 </h2>
//                 <p className="text-gray-500 text-sm mb-3 font-medium">
//                   by {challenge.brandName}
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {challenge.rewards.map((reward, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200 tracking-wide"
//                     >
//                       {reward.label}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
//             </div>
//           </Link>
//         ))}
//       </main>
//     </div>
//   );
// }
