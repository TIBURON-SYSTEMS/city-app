import { cn } from "@/lib/utils";

interface LocationItemProps {
  name: string;
  items: string;
  change: string;
  changeType: "positive" | "negative";
  statusColor: string;
}

export function LocationItem({
  name,
  items,
  change,
  changeType,
  statusColor,
}: LocationItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={cn("w-2 h-2 rounded-full", statusColor)} />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-gray-400">{items}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn(
          "text-sm font-medium",
          changeType === "positive" ? "text-green-400" : "text-red-400"
        )}>
          {change}
        </p>
        <p className="text-xs text-gray-400">vs last month</p>
      </div>
    </div>
  );
}