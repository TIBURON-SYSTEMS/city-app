import { useCurrentContent } from "@/hooks/useCurrentContent";
import { PageContent } from "@/types/nav";
import { MapPin, Camera, Trophy, User } from "lucide-react";

interface NavItemProps {
  type: PageContent;
}

export default function NavItem({ type }: NavItemProps) {
  const { currentContent, setCurrentContent } = useCurrentContent();

  const isActive = currentContent === type;

  function handleClick() {
    setCurrentContent(type);
  }

  return (
    <div
      className={`flex flex-col items-center px-4 w-1/4 py-2 rounded-md ${
        isActive && "border-2 border-black"
      }`}
      onClick={handleClick}
    >
      {type === PageContent.CHALLENGES && (
        <>
          <Trophy className="w-6 h-6" />
          <span className="text-xs font-semibold tracking-wide">
            Challenges
          </span>
        </>
      )}

      {type === PageContent.CAMERA && (
        <>
          <Camera className="w-6 h-6" />
          <span className="text-xs font-semibold tracking-wide">Camera</span>
        </>
      )}

      {type === PageContent.MAP && (
        <>
          <MapPin className="w-6 h-6" />
          <span className="text-xs font-semibold tracking-wide">Map</span>
        </>
      )}

      {type === PageContent.PROFILE && (
        <>
          <User className="w-6 h-6" />
          <span className="text-xs font-semibold tracking-wide">Profile</span>
        </>
      )}
    </div>
  );
}
