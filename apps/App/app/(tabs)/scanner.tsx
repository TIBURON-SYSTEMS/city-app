import api from "@/api/api";
import ScannerCamera from "@/components/ScannerCamera/ScannerCamera";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "react-native-auth0";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const { user } = useAuth0();

  //get participant id
  const { data: participant } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserByEmail(user?.email),
    enabled: !!user,
  });

  return (
    <SafeAreaView className="bg-white">
      {participant?.participation && participant?.participation.length > 0 && (
        <ScannerCamera />
      )}
      {participant?.participation &&
        participant?.participation.length === 0 && (
          <Box className="h-full w-full flex justify-center items-center">
            <Text className="text-lg text-center">
              You are not participating to any challenges at the moment! Go to
              <Text className="font-bold"> 🏆 Challenges </Text>and select some!
            </Text>
          </Box>
        )}
    </SafeAreaView>
  );
}
