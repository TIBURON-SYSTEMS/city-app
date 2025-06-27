import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  iconColor?: string;
  iconBgColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "positive",
  iconColor = "text-blue-400",
  iconBgColor = "bg-blue-500/10",
}: StatsCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBgColor)}>
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
          {change && (
            <Badge
              variant="secondary"
              className={cn(
                "text-xs px-2 py-1",
                changeType === "positive" && "text-green-400 bg-green-400/10",
                changeType === "negative" && "text-red-400 bg-red-400/10",
                changeType === "neutral" && "text-gray-400 bg-gray-400/10"
              )}
            >
              {change}
            </Badge>
          )}
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}