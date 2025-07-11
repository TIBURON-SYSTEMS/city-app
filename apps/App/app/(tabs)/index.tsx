import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeList from "@/components/Challenge/ChallengeList";

export default function Tab() {
  return (
    <SafeAreaView className="bg-white">
      <ChallengeList />
    </SafeAreaView>
  );
}
