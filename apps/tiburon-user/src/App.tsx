import { useState } from "react";
import BottomNav from "./components/BottomNav";
import { NavItemType } from "./types/nav";
import MainContent from "./components/MainContent";

function App() {
  const [currentPage, setCurrentPage] = useState<NavItemType>(
    NavItemType.CHALLENGES
  );

  return (
    <div className="flex flex-col min-h-screen">
      <MainContent status={currentPage} />
      <BottomNav />
    </div>
  );
}

export default App;
