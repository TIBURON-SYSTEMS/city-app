import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { useAuth0 } from "react-native-auth0";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeList from "@/components/Challenge/ChallengeList";

export default function Tab() {
  const { user } = useAuth0();

  return (
    <SafeAreaView className="bg-white">
      <ChallengeList />
    </SafeAreaView>
  );
}
