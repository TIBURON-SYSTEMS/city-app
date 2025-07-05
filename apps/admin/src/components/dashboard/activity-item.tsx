// import { LucideIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ActivityItemProps {
//   icon: LucideIcon;
//   title: string;
//   time: string;
//   iconColor?: string;
//   iconBgColor?: string;
// }

// export function ActivityItem({
//   icon: Icon,
//   title,
//   time,
//   iconColor = "text-green-400",
//   iconBgColor = "bg-green-500/10",
// }: ActivityItemProps) {
//   return (
//     <div className="flex items-center space-x-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
//       <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", iconBgColor)}>
//         <Icon className={cn("w-5 h-5", iconColor)} />
//       </div>
//       <div className="flex-1">
//         <p className="text-sm text-white">{title}</p>
//         <p className="text-xs text-gray-400">{time}</p>
//       </div>
//     </div>
//   );
// }