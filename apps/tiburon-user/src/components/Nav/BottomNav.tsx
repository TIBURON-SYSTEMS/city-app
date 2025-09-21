import { PageContent } from "@/types/nav";
import NavItem from "./NavItem";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white pt-3 pb-2 px-2">
      <div className="flex items-center justify-around">
        <NavItem type={PageContent.CHALLENGES} />
        <NavItem type={PageContent.CAMERA} />
        <NavItem type={PageContent.MAP} />
        <NavItem type={PageContent.PROFILE} />
      </div>
    </nav>
  );
}
