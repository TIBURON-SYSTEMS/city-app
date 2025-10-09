interface ChallengeProgressProps {
  amount?: number;
  goal: number;
  productName: string;
  heading?: boolean;
}

export default function ChallengeProgress({
  heading,
  amount,
  goal,
  productName,
}: ChallengeProgressProps) {
  if (typeof amount !== "number") return null;

  const percentage = Math.min((amount / goal) * 100, 100);

  return (
    <div className="w-full">
      {heading && (
        <h2 className="text-slate-900 text-base font-semibold mb-1">
          Current progress
        </h2>
      )}

      <p className="text-gray-700 mb-2 lowercase">
        {amount} of {goal} {productName}
        {goal > 1 ? "s" : ""} recycled
      </p>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-1 text-right">
        {percentage.toFixed(1)}%
      </p>
    </div>
  );
}
