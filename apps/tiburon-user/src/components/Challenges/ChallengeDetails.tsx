import { useParams, useRouter } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";
import { challenges } from "@/mocks/challenges";

export default function ChallengeDetails() {
  const router = useRouter();
  const { challengeId } = useParams({ from: "/challenge/$challengeId" });

  const currentChallenge = challenges.find(
    (challenge) => challenge.id === challengeId
  );

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
          {/* <Link
            to="/brandinfo/$id"
            params={{ id: currentChallenge.brandId.toString() }}
          > */}
          <span className="text-gray-400">by {currentChallenge.brand}</span>
          {/* </Link> */}
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
              //   <Link
              //     key={reward.id}
              //     to="/reward/$id"
              //     params={{ id: reward.id.toString() }}
              //   >
              <span className="px-3 py-1 bg-slate-100 rounded-xl border border-slate-300 text-sm">
                {reward}
              </span>
              //   </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
