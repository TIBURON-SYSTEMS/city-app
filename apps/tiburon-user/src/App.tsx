import BottomNav from "./components/BottomNav";
import ChallengesPage from "./components/ChallengesList";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <ChallengesPage />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
