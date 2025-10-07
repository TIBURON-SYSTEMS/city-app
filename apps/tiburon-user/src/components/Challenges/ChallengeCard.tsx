import type { Challenge } from "@/types/types";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export default function ChallengeCard({
  challenge,
  ongoing,
}: {
  challenge: Challenge;
  ongoing?: boolean;
}) {
  return (
    <Link
      to="/challenge/$challengeId"
      params={{ challengeId: challenge.id.toString() }}
      key={challenge.id}
    >
      <div className="border border-gray-200 rounded-xl p-5 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
            {challenge.label}
          </h2>

          <p className="text-gray-500 text-sm mb-3 font-medium">
            by {challenge.brandName}
            {ongoing && (
              <span className="ml-2 inline-block align-middle rounded-full bg-emerald-50 text-emerald-700 text-[11px] px-2 py-0.5 border border-emerald-200">
                Ongoing
              </span>
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            {challenge.rewards?.map((reward, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200 tracking-wide"
              >
                {reward.label}
              </span>
            ))}
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
      </div>
    </Link>
  );
}
