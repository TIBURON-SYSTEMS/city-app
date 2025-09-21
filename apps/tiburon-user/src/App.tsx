import BottomNav from "./components/Nav/BottomNav";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Logo from "./components/Logo";
import { useCurrentContent } from "./hooks/useCurrentContent";

function App() {
  const { currentContent } = useCurrentContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Logo />
      <Header status={currentContent} />
      <MainContent status={currentContent} />
      <BottomNav />
    </div>
  );
}

export default App;
