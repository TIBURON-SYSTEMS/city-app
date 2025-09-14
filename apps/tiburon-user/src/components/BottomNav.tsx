import { NavItemType } from "@/types/nav";
import NavItem from "./NavItem";

export default function BottomNav() {
  return (
    <nav className="border-t border-gray-200 bg-white p-2">
      <div className="flex items-center justify-around">
        <NavItem type={NavItemType.CHALLENGES} />
        <NavItem type={NavItemType.CAMERA} />
        <NavItem type={NavItemType.MAP} />
        <NavItem type={NavItemType.PROFILE} />
      </div>
    </nav>
  );
}
