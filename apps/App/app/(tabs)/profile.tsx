import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import CameraActionStepper from "@/components/ScannerCamera/CameraActionStepper";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView className="bg-white">
      <View className="h-full">
        <Text>Profile</Text>
        <LoginButton />
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
}
