import { SafeAreaView } from "react-native-safe-area-context";
import ChallengeList from "@/components/ChallengeList";

import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { useAuth0 } from "react-native-auth0";
import { Box } from "@/components/ui/box";

export default function Index() {
  const { user } = useAuth0();

  return (
    <SafeAreaView className="bg-white">
      {user && (
        <Box className="flex flex-row justify-end items-end gap-2 px-7">
          <Avatar size="md">
            <AvatarFallbackText>{user.email}</AvatarFallbackText>
          </Avatar>
          <LogoutButton />
        </Box>
      )}
      <ChallengeList />
    </SafeAreaView>
  );
}
