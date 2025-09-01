import { MapPin, Trophy, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="border-t border-gray-200 bg-white px-2">
      <div className="flex items-center justify-around py-3">
        <div className="flex flex-col items-center space-y-1 px-4 py-2">
          <Trophy className="w-6 h-6 text-gray-900" />
          <span className="text-xs font-semibold text-gray-900 tracking-wide">
            Challenges
          </span>
        </div>
        <div className="flex flex-col items-center space-y-1 px-4 py-2">
          <MapPin className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400 tracking-wide">Map</span>
        </div>
        <div className="flex flex-col items-center space-y-1 px-4 py-2">
          <User className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400 tracking-wide">Profile</span>
        </div>
      </div>
    </nav>
  );
}
