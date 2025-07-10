import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { useAuth0 } from "react-native-auth0";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const { user, authorize } = useAuth0();

  async function handleLoginPress() {
    if (!user) {
      try {
        await authorize({
          additionalParameters: {
            prompt: "select_account",
          },
        });
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }
  return (
    <SafeAreaView className="bg-white h-full">
      {user && (
        <Box className="flex gap-2 px-7">
          <Box>
            <HStack className=" justify-between items-center">
              <Avatar size="md">
                <AvatarFallbackText>{user.email}</AvatarFallbackText>
              </Avatar>
              <Text className="text-lg font-semibold">{user.email}</Text>
              <LogoutButton />
            </HStack>
          </Box>
        </Box>
      )}
      {!user && (
        <Box className="h-full flex justify-center gap-3 items-center">
          <Text>Please login or create an account</Text>
          <Button size="lg" onPress={handleLoginPress} className="rounded-full">
            <ButtonText>Login</ButtonText>
          </Button>
        </Box>
      )}
    </SafeAreaView>
  );
}
