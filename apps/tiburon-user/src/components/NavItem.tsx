import { NavItemType } from "@/types/nav";
import { MapPin, Camera, Trophy, User } from "lucide-react";

interface NavItemProps {
  type: NavItemType;
}

export default function NavItem({ type }: NavItemProps) {
  return (
    <>
      {type === NavItemType.CHALLENGES && (
        <div className="flex flex-col items-center px-4 w-1/4">
          <Trophy className="w-6 h-6 text-gray-900" />
          <span className="text-xs font-semibold text-gray-900 tracking-wide">
            Challenges
          </span>
        </div>
      )}

      {type === NavItemType.CAMERA && (
        <div className="flex flex-col items-center px-4 w-1/4">
          <Camera className="w-6 h-6 text-gray-900" />
          <span className="text-xs font-semibold text-gray-900 tracking-wide">
            Camera
          </span>
        </div>
      )}

      {type === NavItemType.MAP && (
        <div className="flex flex-col items-center px-4 w-1/4">
          <MapPin className="w-6 h-6 text-gray-900" />
          <span className="text-xs font-semibold text-gray-900 tracking-wide">
            Map
          </span>
        </div>
      )}

      {type === NavItemType.PROFILE && (
        <div className="flex flex-col items-center px-4 w-1/4">
          <User className="w-6 h-6 text-gray-900" />
          <span className="text-xs font-semibold text-gray-900 tracking-wide">
            Profile
          </span>
        </div>
      )}
    </>
  );
}
