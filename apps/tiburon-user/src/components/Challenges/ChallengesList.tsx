import { ChevronRight } from "lucide-react";
import { challenges } from "../../mocks/challenges";
import { Link } from "@tanstack/react-router";

export default function ChallengesList() {
  return (
    <div className="h-full bg-gray-50 flex flex-col gap-4">
      <main className="flex flex-col gap-4 flex-1 px-5 py-2 space-y-3">
        {challenges.map((challenge) => (
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
                  by {challenge.brand}
                </p>
                <div className="flex flex-wrap gap-2">
                  {challenge.rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200 tracking-wide"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
